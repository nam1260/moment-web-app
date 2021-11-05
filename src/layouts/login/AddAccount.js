
import "./login.css";
import "../popup/modalPopup.css";
import "../header/header.css";
import React, { useState, useRef} from "react";
import { useHistory } from 'react-router'; 
import { Modal } from "../popup/ModalPopup";
import CryptoJS from "crypto-js";
import axios from "axios";
import AWSManager from "../../managers/AWSManager.js";

const editPath = "assets/icons/list-ico-edit.png"
const checkOffPath = "assets/icons/check-off.svg"
const checkOnPath = "assets/icons/check-on.svg"

const closeIcon = "/assets/icons/ico-close.png";
const logoPath = '/assets/images/yhlee/logo.png'
 
export default function AddAccountComponent() {
    const history = useHistory();
    const userList = [
        {
            id: "test@naver.com",
            pw: "test123",
            phone: "01012345678",
            nickname: "test",
        },
    ];

    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };

    const [isTerms, setToggleTerms] = useState(false);
    const toggleTerms = () => {
        setToggleTerms(isTerms => !isTerms);
    }

    const [isCommercial, setToggleCommercial] = useState(false); 
    const toggleCommercial = () => {
        setToggleCommercial(isCommercial => !isCommercial);
    }

    const [inputs, setInputs] = useState({
        email: '',
        pw: '',
        pwConfirm: '',
        phoneNumber: '',
        nickname: '',
    });
    const { email, pw, pwConfirm, phoneNumber, nickname } = inputs
    const onChange = (e) => {
        const { name, value } = e.target
        const nextInputs = {
            ...inputs,  
            [name]: value,
        }
        setInputs(nextInputs);
    };
    const onChangeOnlyNumber = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        onChange(e);
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
    const onChangePassword = (e) => {
        var passRule = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; // 특수문자 / 문자 / 숫자 포함 형태의 8~20자리 이내의 암호 정규식
        if(!passRule.test(e.target.value)) {
            console.log('비밀번호 규칙에 맞지 않음');
        } else {
            console.log('비밀번호 규칙에 맞음');
        }
        onChange(e);
    }
    const onChangePasswordConfirm = (e) => {
        var confirm = e.target.value;
        var pw = inputs['pw'];
        if(confirm != pw ) {
            console.log('입력한 비밀번호가 다름');
        } else {
            console.log('입력한 비밀번호가 같음');
        }
        onChange(e);
    }

    const addAccount = ()=>{
        // show term and condition 
        // openModal();
        let userinfo = {
            userId: inputs.email,
            userNm: '', // inputs.nickname,
            userPw: inputs.pw,
            userNickNm: inputs.nickname,
            phoneNum: inputs.phoneNumber, 
            mrktAgreeYn: isCommercial? 'y': 'n',
        };
        console.log('userinfo =' + JSON.stringify(userinfo));
        AWSManager.regUserInfo(userinfo).then((result)=> {
            console.log('result =' + JSON.stringify(result));
        }).catch(e => {
            console.error(e.message);
        });
    } 

    const checkDuplecate = (type)=>{
        console.log('checkDuplecate type = ' + type);
        var isDuplicate = userList.some((info)=>{
            return info[type] == inputs[type];
        });

        if(isDuplicate) {
            console.log('duplicate');
            // openModal();
        } else {
        }
    } 

    const showTermAndCondition = ()=>{
        console.log('showTermAndCondition');
        openModal();
    };

    const send_message =(phone, authNumber) => {
        var user_phone_number = phone; 
        var user_auth_number = authNumber;
        var resultCode = 404; 
        const date = Date.now().toString(); 
        const uri = "ncp:sms:kr:273557210863:moment"; 
        const secretKey = "myNuDZbXE2U9PoV0CCRDvhfoW7sTwS91VFlIeWwJ"; 
        const accessKey = "OSZkDUqDvR4n6ESrsX0v"; 
        const method = "POST"; 
        const space = " "; 
        const newLine = "\n"; 
        const url = "https://sens.apigw.ntruss.com/sms/v2/services/"+uri+"/messages"; 
        const url2 = "/sms/v2/services/"+uri+"/messages"; 
        const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey); 
        hmac.update(method); 
        hmac.update(space); 
        hmac.update(url2); 
        hmac.update(newLine); 
        hmac.update(date); 
        hmac.update(newLine); 
        hmac.update(accessKey); 
        const hash = hmac.finalize(); 
        const signature = hash.toString(CryptoJS.enc.Base64); 
        
        var options = {
            headers: { 
                "Content-type": "application/json; charset=utf-8", 
                "x-ncp-iam-access-key": accessKey, 
                "x-ncp-apigw-timestamp": date, 
                "x-ncp-apigw-signature-v2": signature, 
            }
        };
        var data = { 
            type: "SMS", 
            countryCode: "82", 
            from: "01023403907", 
            content: "인증번호 "+ user_auth_number + " 입니다.", 
            messages: [ 
                { 
                    to: user_phone_number 
                } 
            ]
        };
        axios.post(url, data, options)
            .then(response => {
                console.log(response.status);
                resultCode = 200; 
            })
            .catch((response) => {
                console.log('Error! = ' + response)
            });
        return resultCode; 
    }

    const certificatePhone = ()=>{
        var phoneNumber = inputs['phoneNumber'];
        var authNum = '';
        for (let i = 0; i < 6; i++) {
            authNum += parseInt(Math.random() * 10);
        }
        var result = send_message(phoneNumber, authNum);
        console.log('certificatePhone = ' + phoneNumber + ', authNum =' + authNum + ', resultCode = ' + result);
        
    } 

    return (
        <main>
            <section className="login-header">
                <div className="container">
                    <span>지금, 모먼트에서 당신의 </span>
                    <br />
                    <span>최고의 순간을 함께하세요</span>
                </div>
            </section>
            <section className="login-container">
                <div>
                    <span>
                        <span>
                            이메일 입력
                        </span>
                        <div>
                            <input
                                type="text"
                                onChange={onChangeEmailFormat}
                                name="email"
                            ></input>
                            <span onClick={()=>{checkDuplecate('email');}}>
                                중복확인
                            </span>
                        </div>
                        <span>
                            비밀번호 입력
                        </span>
                        <div>
                            <input
                                placeholder={"8~20자 영문 대소문자/숫자/특수문자"}
                                type="password"
                                maxlength='20'
                                onChange={onChangePassword}
                                name="pw"
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
                        <span>
                            비밀번호 확인
                        </span>
                        <div>
                            <input
                                placeholder={"비밀번호를 한번 더 입력해 주세요"}
                                type="password"
                                maxlength='20'
                                onChange={onChangePasswordConfirm}
                                name="pwConfirm"
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
                        <span>
                            휴대폰 번호 (숫자만)
                        </span>
                        <div>
                            <input
                                placeholder={"휴대폰 번호 10자리 또는 11자리 입력"}
                                type="text"
                                maxlength='11'
                                onChange={onChangeOnlyNumber}
                                name="phoneNumber"
                                value={phoneNumber}
                            ></input>
                            <span onClick={certificatePhone}>
                                인증요청
                            </span>
                        </div>
                        <span>
                            닉네임
                        </span>
                        <div>
                            <input
                                placeholder={"5~13자 (특수문자 제외)"}
                                type="text"
                                maxlength='13'
                                onChange={onChange}
                                name="nickname"
                            ></input>
                            <span onClick={()=>{checkDuplecate('nickname');}}>
                                중복확인
                            </span>
                        </div>
                    </span>
                </div>
            </section> 
            <section className="check-options">
                <div>
                    <span>
                        <img alt="none" src={isTerms ? checkOnPath : checkOffPath} onClick={()=>{
                            console.log('개인정보');
                            toggleTerms();
                        }}/>
                        <span class="highlight" onClick={showTermAndCondition}>개인정보처리방침 및 서비스이용약관</span>
                        <span>에 동의합니다.</span>
                    </span>
                    <br/>
                    <span>
                        <img alt="none" src={isCommercial ? checkOnPath : checkOffPath} onClick={()=>{
                            console.log('마케팅');
                            toggleCommercial();
                        }}/>
                        <span>제 3자 제공 및 마케팅 수신 동의 (선택)</span>
                    </span>
                </div>
            </section>
            <section className="login-button">
                <div>
                    <button onClick={addAccount}>
                        회원가입
                    </button>
                    {showModal ? 
                        <Modal setShowModal={setShowModal}> 
                            <div className="fullSize_modal">
                                <div className="App-Header layout">
                                    <div className="navigation-bar">
                                        <div onClick={() => {setShowModal(false);}}>
                                            <img alt="none" className={"top-icon"} src={closeIcon} />
                                        </div>
                                        <div>
                                            <img alt="none" onClick={() => history.push('/')} className={'top-logo'} src={logoPath} />
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                </div>
                                <section className="login-header">
                                    <div className="container">
                                        <span>서비스 이용약관</span>
                                    </div>
                                </section>
                                <section className="description">
                                    <div className="container">
                                        <span>
                                            총칙
                                            <br/>
                                            제 1 조(목적)
                                            <br/>
                                            이 약관은 모멘트(박재영) (이하 ”사업자”) 운영
                                            인터넷사이트 모멘트(이하 “모멘트”)에서 제공하는
                                            서비스 (이하 “서비스”) 이용에 있어 모멘트와
                                            회원의 권리·의무 및 책임사항을 규정함을
                                            목적으로 합니다.
                                            <br/>
                                            <br/>
                                            <br/>
                                            제 2 조(정의)
                                            <br/>
                                            사업자가 운영하는 사이트는 아래와 같습니다.
                                            <br/>
                                            moment.com
                                        </span>
                                    </div>
                                </section> 
                            </div>
                        </Modal> : null
                    }
                </div>
            </section>
            <section className="login-options">
                <div>
                </div>
            </section>
        </main>
    );
}
