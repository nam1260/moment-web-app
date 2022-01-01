
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
    const [isApplying, setIsApplying] = useState(true);
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
        var emailRule = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;//이메일 정규식
        if(!emailRule.test(e.target.value)) {
            console.log('email 규칙에 맞지 않음');
        } else {
            console.log('email 규칙에 맞음');
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
                if (!result.data.isDupl) alert("모먼트 가입 유저만 사용자만 스타 등록이 가능합니다.");
                else {
                    AWSManager.reqRgstStar({
                        userId: userInfo.userId,
                        kakoId: inputs.kakaoId,
                        youtubeChNm: inputs.youtubeChNm,
                        bankNm: inputs.bankNm,
                        accountNum: inputs.accountNum,
                        accountNm : inputs.accountNm
                    }).then((result)=>{
                        if(result && result.status === 200) {
                            alert("스타 등록 신청이 완료되었습니다");
                        }else {
                            alert("서버 에러 ");
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
                if(result.data.length> 0) {
                    let status = result.data[0];
                    if(status.starRegStatus === 2) {
                        //화면 노출 가능
                    }else {
                        isApplying = true;
                    }
                }
            }else {
               alert("error")
            }
            console.log("isApplying === "+isApplying)
            setIsApplying(isApplying);
        })
    }, []);

    return (

        !isLogined? <Redirect to="/login"/> :

        <main>

            <MypageHeader index={3}/>
            <section className="mypage-header">
                <div className="container">
                    <span>스타 등록 신청</span>
                    <br/>
                    <span className="subtitle">
                        입력된 개인 SNS 채널 및 계정을 
                        <br/>
                        통해 인증을 진행합니다
                    </span>
                </div>
            </section>

            {isApplying? "":
                <div>
                <section className="mypage-container">
                    <div>
                        <InputBox
                            text = "카카오톡 ID"
                            onChangeEvent={onChangeEmailFormat}
                            inputName ="kakaoId"
                            imgSrc ={editPath}
                        />
                        <InputBox
                            text = "인스타그램 ID (블루뱃지 인증 ID만 승인가능)"
                            onChangeEvent={onChange}
                            inputName ="instaId"
                            imgSrc ={editPath}
                        />
                        <InputBox
                            text = "Youtube 채널명"
                            onChangeEvent={onChange}
                            inputName ="youtubeChNm"
                            imgSrc ={editPath}
                        />
                        <InputBox
                            text = "수익금 지급 계좌"
                            phText="어디 은행인가요?"
                            onChangeEvent={onChange}
                            inputName ="bankNm"
                            imgSrc ={editPath}
                        />
                        <InputBox
                            phText="계좌번호를 입력해주세요"
                            onChangeEvent={onChangeOnlyNumber}
                            inputName ="accountNum"
                            imgSrc ={editPath}
                        />
                        <InputBox
                            phText="예금주 (실명과 일치하는 계좌만 가능)"
                            onChangeEvent={onChange}
                            inputName ="accountNm"
                            imgSrc ={editPath}
                        />
                    </div>
                </section>
                {/*<section className="check-options">*/}
                    {/*<div>*/}
                {/*<span>*/}
                {/*<img alt="none" src={isTerms ? checkOnPath : checkOffPath} onClick={() => {*/}
                    {/*toggleTerms();*/}
                {/*}}/>*/}
                {/*<span class="highlight">모먼트 스타 이용 약관</span>*/}
                {/*<span>에 동의합니다.(필수)</span>*/}
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
                        <button onClick={onClickApplyBtn}>
                            등록신청
                        </button>
                    </div>
                </section>
                <section className="mypage-options">
                    <div>
                    </div>
                </section>
            </div>}



        </main>
    );
} export default WrapLoginedComponent(StarRegister);
 