
import "./mypage.css";
import React, { useState, useEffect, useRef, Component} from "react";
import { useHistory } from 'react-router';
import { Modal } from "../popup/ModalPopup";
import MypageHeader from './MypageHeader';
import AWSManager from '../../managers/AWSManager'
import { useSelector, useDispatch } from "react-redux";
import {WrapLoginedComponent} from "../../shared/component/common/WrapLoginedComponent";
import {Redirect} from 'react-router-dom'
import Styled from "styled-components"
import StorageManager from "../../managers/StorageManager";

const notFoundPath = "/assets/icons/icoFace3B.png"
const editPath = "assets/icons/list-ico-edit.png"
const downArrowPath = "/assets/icons/list-ico-open.png"
const checkOffPath = "assets/icons/check-off.svg"
const checkOnPath = "assets/icons/check-on.svg"




const StyledInputBox = Styled.div`

     & > span {
        margin-top: min(0.9vh, 60px);
        width: min(90vw, 239px);
        height: min(9vw, 53px);
        font-size: min(4vw, 26px);
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.26px;
        text-align: left;
        color: #8f8f8f;
     }
     
     & > div {
        border-bottom: 2px solid #f0f0f0;
        margin-bottom: min(2vw, 20px);
        
        & > input {
            width: min(70vw, 650px);
            height: min(10vw, 60px);
            font-size: min(4vw, 36px);
            font-weight: bold;
            font-stretch: normal;
            font-style: normal;
            line-height: normal;
            letter-spacing: -0.36px;
            text-align: left;
            color: #101010;
            border: none;
        
        }
        
        & > input::placeholder {
          color: rgba(16,16,16,0.25);
        }
        
        & > img {
            width: min(10vw, 44px);
            height: min(10vw, 44px);
            object-fit: contain;
            float: right;
        }
     }
     
    
`



const InputBox = ({text,subText,imgSrc,inputName,onChangeEvent,phText}) => {

    return (
        <StyledInputBox>
            <span>
                {text}<span>{subText}</span>
            </span>
            <div>
                <input
                    placeholder= {phText? phText : ""}
                    type="text"
                    name={inputName}
                    onChange={onChangeEvent}>
                </input>
                <img alt="none" src ={imgSrc}/>
            </div>
        </StyledInputBox>
    )

}

function StarRegister({isLogined}) {
    const userInfo = useSelector(state => state.user) || {};
    const history = useHistory();
    const [isApplying, setIsApplying] = useState(false);
    const [inputs, setInputs] = useState({
        kakaoId: "",
        instaId: "",
        youtubeChNm: "",
        bankNm: "",
        accountNum: "",
        accountNm: "",
    });

    const [isTerms, setToggleTerms] = useState(false);
    const toggleTerms = () => {
        setToggleTerms(isTerms => !isTerms);
    }

    const [isCommercial, setToggleCommercial] = useState(false); 
    const toggleCommercial = () => {
        setToggleCommercial(isCommercial => !isCommercial);
    }

    const onChangeEmailFormat = (e) => {
        var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;//????????? ?????????
        if(!emailRule.test(e.target.value)) {
            console.log('email ????????? ?????? ??????');
        } else {
            console.log('email ????????? ??????');
        }
        onChange(e);
    }
    const onChangeOnlyNumber = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        onChange(e);
    }

    const onChange = (e) => {
        const { name, value } = e.target
        console.log(name);
        console.log(value);
        const nextInputs = {
            ...inputs,  
            [name]: value,
        }
        setInputs(nextInputs);
    };

    const onClickApplyBtn = () => {
       // AWSManager.checkDuplId()
        AWSManager.checkDuplId({
            userId: userInfo.userId
        }).then((result)=>{
            if (result && result.status === 200) {
                if (!result.data.isDupl) alert("????????? ?????? ????????? ???????????? ?????? ????????? ???????????????.");
                else {
                    AWSManager.reqRgstStar({
                        userId: userInfo.userId,
                        kakaoId: inputs.kakaoId,
                        instaId: inputs.instaId,
                        youtubeChNm: inputs.youtubeChNm,
                        bankNm: inputs.bankNm,
                        accountNum: inputs.accountNum,
                        accountNm : inputs.accountNm
                    }).then((result)=>{
                        if(result && result.status === 200) {
                            alert("?????? ?????? ????????? ?????????????????????");
                        }else {
                            alert("?????? ?????? ");
                        }
                    });
                }
             //   StorageManager.saveSalt(salt);
             //   _returnToHome();
            }
        })
    }

    useEffect(() => {
        AWSManager.getRgstStarStatus({
            userId: userInfo.userId
        }).then((result)=>{
            let isApplying = false;
            if(result && result.status=== 200){
                console.log(result);
                if(result.data.length> 0) {
                    let response = result.data[0];
                    console.log(response.starRegStatus);
                    if(response.starRegStatus === "1") {
                    }else {
                        isApplying = true;
                    }
                }
            }else {
               alert("error")
            }
            console.log("isApplying === "+isApplying);
            setIsApplying(isApplying);
        })
    }, []);

    return (

        !isLogined? <Redirect to="/login"/> :

        <main>

            <MypageHeader index={3}/>
            <section className="mypage-header">
                <div className="container">
                    <span>?????? ?????? ??????</span>
                    <br/>
                    <span className="subtitle">
                        ????????? ?????? SNS ?????? ??? ????????? 
                        <br/>
                        ?????? ????????? ???????????????
                    </span>
                </div>
            </section>

            <div>
                <section className="mypage-container">
                    {!isApplying? 
                    <div>
                        <InputBox
                            text = "???????????? ID"
                            onChangeEvent={onChangeEmailFormat}
                            inputName ="kakaoId"
                            imgSrc ={editPath}
                        />
                        <InputBox
                            text = "??????????????? ID (???????????? ?????? ID??? ????????????)"
                            onChangeEvent={onChange}
                            inputName ="instaId"
                            imgSrc ={editPath}
                        />
                        <InputBox
                            text = "Youtube ?????????"
                            onChangeEvent={onChange}
                            inputName ="youtubeChNm"
                            imgSrc ={editPath}
                        />
                        <InputBox
                            text = "????????? ?????? ??????"
                            phText="?????? ????????????????"
                            onChangeEvent={onChange}
                            inputName ="bankNm"
                            imgSrc ={editPath}
                        />
                        <InputBox
                            phText="??????????????? ??????????????????"
                            onChangeEvent={onChangeOnlyNumber}
                            inputName ="accountNum"
                            imgSrc ={editPath}
                        />
                        <InputBox
                            phText="????????? (????????? ???????????? ????????? ??????)"
                            onChangeEvent={onChange}
                            inputName ="accountNm"
                            imgSrc ={editPath}
                        />
                    </div> :
                    <div className="messageList">
                        <div className="emptyMessage">
                            <img alt="none" src={notFoundPath} />
                            <p>?????? ?????? ?????????</p>
                            <p className="second">?????????????????? ??????????????????..</p>
                        </div>
                    </div>
                    }
                </section>
                {/*<section className="check-options">*/}
                    {/*<div>*/}
                {/*<span>*/}
                {/*<img alt="none" src={isTerms ? checkOnPath : checkOffPath} onClick={() => {*/}
                    {/*toggleTerms();*/}
                {/*}}/>*/}
                {/*<span class="highlight">????????? ?????? ?????? ??????</span>*/}
                {/*<span>??? ???????????????.(??????)</span>*/}
                {/*</span>*/}
                        {/*<br/>*/}
                        {/*<span>*/}
                {/*<img alt="none" src={isCommercial ? checkOnPath : checkOffPath} onClick={() => {*/}
                    {/*toggleCommercial();*/}
                {/*}}/>*/}
                {/*<span>  </span>*/}
                {/*</span>*/}
                    {/*</div>*/}
                {/*</section>*/}
                <section className="mypage-button">
                    <div>
                    {!isApplying? 
                        <button onClick={onClickApplyBtn}>
                            ????????????
                        </button> : 
                        <button className="detail-button" onClick={()=>{history.push('starRegisterHistory')}}>
                            ??????????????????
                        </button>
                    }
                    </div> 
                </section>
                <section className="mypage-options">
                    <div>
                    </div>
                </section>
            </div>
        </main>
    );
} export default WrapLoginedComponent(StarRegister);
 