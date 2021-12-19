
import "./mypage.css";
import React, { useState, useEffect, useRef, Component} from "react";
import { useHistory } from 'react-router';
import { Modal } from "../popup/ModalPopup";
import MypageHeader from './MypageHeader';
import AWSManager from '../../managers/AWSManager'
import { useSelector, useDispatch } from "react-redux";


const editPath = "assets/icons/list-ico-edit.png"
const downArrowPath = "/assets/icons/list-ico-open.png"
const checkOffPath = "assets/icons/check-off.svg"
const checkOnPath = "assets/icons/check-on.svg"

export default function StarRegister() {
    const userInfo = useSelector(state => state.user) || {};
    const history = useHistory();
    const userList = [
        {
            kakaoId: "",
            instagramId: "",
            youtubeName: "",
            bankAccountName: "",
            bankAccountNumber: "",
            bankAccountOwner: "",
        },
    ];

    const [isApplying, setIsApplying] = useState(true);
    const [inputs, setInputs] = useState({
        kakaoId: "",
        instagramId: "",
        youtubeName: "",
        bankAccountName: "",
        bankAccountNumber: "",
        bankAccountOwner: "",
    });


    const { kakaoId, instagramId, youtubeName, bankAccountName, bankAccountNumber, bankAccountOwner } = inputs

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
        const nextInputs = {
            ...inputs,  
            [name]: value,
        }
        setInputs(nextInputs);
    };

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

            {isApplying? "": <div>
                <section className="mypage-container">
                    <div>
                    <span>
                        <span>
                            카카오톡 ID
                        </span>
                        <div>
                            <input
                                type="text"
                                name="kakaoId"
                                onChange={onChangeEmailFormat}
                            ></input>
                            <img alt="none" src={editPath}/>
                        </div>
                        <span>
                            인스타그램 ID (블루뱃지 인증 ID만 승인가능)
                        </span>
                        <div>
                            <input
                                type="text"
                                name="instagramId"
                                onChange={onChange}
                            ></input>
                            <img alt="none" src={editPath}/>
                        </div>
                        <span>
                            Youtube 채널명
                        </span>
                        <div>
                            <input
                                type="text"
                                name="youtubeName"
                                onChange={onChange}
                            ></input>
                            <img alt="none" src={editPath}/>
                        </div>
                        <span>
                            수익금 지급 계좌
                        </span>
                        <div>
                            {/* combobox ui 추가 필요  */}
                            <input
                                placeholder={"은행을 선택해주세요"}
                                type="text"
                                name="bankAccountName"
                                value={bankAccountName}
                                onChange={onChange}
                            ></input>
                            <img alt="none" src={downArrowPath}/>
                        </div>
                        <div>
                            <input
                                placeholder={"계좌번호를 입력해주세요"}
                                type="text"
                                name="bankAccountNumber"
                                onChange={onChangeOnlyNumber}
                            ></input>
                            <img alt="none" src={editPath}/>
                        </div>
                        <div>
                            <input
                                placeholder={"예금주 (본인과 일치하는 계좌만 가능)"}
                                type="text"
                                name="bankAccountOwner"
                                onChange={onChange}
                            ></input>
                            <img alt="none" src={editPath}/>
                        </div>
                    </span>
                    </div>
                </section>
                <section className="check-options">
                    <div>
                <span>
                <img alt="none" src={isTerms ? checkOnPath : checkOffPath} onClick={() => {
                    toggleTerms();
                }}/>
                <span class="highlight">모먼트 스타 이용 약관</span>
                <span>에 동의합니다.(필수)</span>
                </span>
                        <br/>
                        <span>
                <img alt="none" src={isCommercial ? checkOnPath : checkOffPath} onClick={() => {
                    toggleCommercial();
                }}/>
                <span>  </span>
                </span>
                    </div>
                </section>
                <section className="mypage-button">
                    <div>
                        <button onClick={() => {
                            console.log('스타 등록신청');
                        }}>
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
}
 