
import "./login.css";
import "../popup/modalPopup.css";
import "../header/header.css";
import React, { useState, useRef} from "react";
import { useHistory } from 'react-router'; 
import { Modal } from "../popup/ModalPopup";
import CryptoJS from "crypto-js";
import axios from "axios";
import AWSManager from "../../managers/AWSManager.js";
import StorageManager from "../../managers/StorageManager.js";

const editPath = "assets/icons/list-ico-edit.png"
const checkOffPath = "assets/icons/check-off.svg"
const checkOnPath = "assets/icons/check-on.svg"

const closeIcon = "/assets/icons/ico-close.png";
const logoPath = '/assets/images/logo.png'

const REG_USER_INPUT_EMAIL = "이메일 입력";
const REG_USER_CHECK_EMAIL_FAIL = "이메일 형식이 올바르지 않습니다.";
const REG_USER_CHECK_EMAIL_DUPLICATION_SUCCESS = "사용가능한 이메일입니다.";
const REG_USER_CHECK_EMAIL_DUPLICATION_FAIL = "사용할 수 없는 이메일입니다.";

const REG_USER_INPUT_NICKNM = "닉네임";
const REG_USER_CHECK_NICKNM_FAIL = "닉네임 형식이 올바르지 않습니다.";
const REG_USER_CHECK_NICKNM_DUPLICATION_SUCCESS = "사용가능한 닉네임입니다.";
const REG_USER_CHECK_NICKNM_DUPLICATION_FAIL = "사용할 수 없는 닉네임입니다.";

const REG_USER_INPUT_PW = "비빌번호 입력";
const REG_USER_CHECK_PW_FAIL = "비밀번호 형식이 올바르지 않습니다.";
const REG_USER_CHECK_PW_SUCCESS = "사용가능한 비밀번호입니다.";
const REG_USER_INPUT_PW_CONFIRM = "비빌번호 확인";
const REG_USER_CHECK_PW_CONFIRM_FAIL = "비밀번호가 일치 하지 않습니다.";
const REG_USER_CHECK_PW_CONFIRM_SUCCESS = "비밀번호가 일치 합니다.";

const CHECK_NOTYET = 0;
const CHECK_SUCCESS = 1;
const CHECK_FAIL = 2;

export default function AddAccountComponent() {
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };

    const [inputsAvalilables, setInputsAvalilables] = useState({
        isEmail: false,
        isName: false,
        isPw: false,
        isPwConfirm: false,
        isPhone: false,
        isNickNm: false,
    }); 
    const { isEmail, isName, isPw, isPwConfirm, isPhone, isNickNm } = inputsAvalilables;

    const [inputsDuplicate, setInputsDuplicate] = useState({
        isDuplicateEmail: CHECK_NOTYET,
        isDuplicateNickNm: CHECK_NOTYET,
    }); 
    const { isDuplicateEmail, isDuplicateNickNm } = inputsDuplicate;

    const [toggles, setToggle] = useState({
        terms: false,
        commercial: false,
    }); 
    const { terms, commercial } = toggles;
    const onToggle = (e) => {
        const { name } = e.target
        const nextInputs = {
            ...toggles,  
            [name]: !toggles[name],
        }
        setToggle(nextInputs);
    }

    const [inputs, setInputs] = useState({
        email: '',
        pw: '',
        pwConfirm: '',
        phoneNumber: '',
        nickname: '',
    });
    const { email, name,  pw, pwConfirm, phoneNumber, nickname } = inputs;
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
            setInputsAvalilables({
                ...inputsAvalilables,  
                isEmail: false,
            });
        } else {
            console.log('email 규칙에 맞음');
            setInputsAvalilables({
                ...inputsAvalilables,  
                isEmail: true,
            });
        }
        onChange(e);
    }
    const onChangeNickNmFormat = (e) => {
        var nickNmRule = /^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{5,13}$/;
        if(!nickNmRule.test(e.target.value)) {
            console.log('닉네임 규칙에 맞지 않음');
            setInputsAvalilables({
                ...inputsAvalilables,  
                isNickNm: false,
            });
        } else {
            console.log('닉네임 규칙에 맞음');
            setInputsAvalilables({
                ...inputsAvalilables,  
                isNickNm: true,
            });
        }
        onChange(e);
    }
    const onChangePassword = (e) => {
        var passRule = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/; // 특수문자 / 문자 / 숫자 포함 형태의 8~20자리 이내의 암호 정규식
        if(!passRule.test(e.target.value)) {
            console.log('비밀번호 규칙에 맞지 않음');
            setInputsAvalilables({
                ...inputsAvalilables,  
                isPw: false,
            });
        } else {
            console.log('비밀번호 규칙에 맞음');
            setInputsAvalilables({
                ...inputsAvalilables,  
                isPw: true,
            });
        }
        onChange(e);
    }
    const onChangePasswordConfirm = (e) => {
        var confirm = e.target.value;
        var pw = inputs['pw'];
        if(confirm != pw ) {
            console.log('입력한 비밀번호가 다름');
            setInputsAvalilables({
                ...inputsAvalilables,  
                isPwConfirm: false,
            });
        } else {
            console.log('입력한 비밀번호가 같음');
            setInputsAvalilables({
                ...inputsAvalilables,  
                isPwConfirm: true,
            });
        }
        onChange(e);
    }

    const addAccount = ()=>{
        // show term and condition 
        // openModal();
        let userinfo = {
            userId: inputs.email,
            userNm: inputs.name,
            userPw: inputs.pw,
            userNickNm: inputs.nickname,
            phoneNum: inputs.phoneNumber, 
            mrktAgreeYn: commercial? 'y': 'n',
        };
        AWSManager.regUserInfo(userinfo).then((result)=> {
            if(result && result.status == 200 && result.data.Authorization && result.data.Authorization.length > 20) {
                console.log('계정 생성 성공');
                StorageManager.saveUserInfo({
                    token : result.data.Authorization,
                    userNickNm : inputs.nickname,
                    userId: inputs.email,
                });
                history.push('/');
            } else {
                console.log('계정 생성 실패 result =' + JSON.stringify(result));
            }
        }).catch(e => {
            console.error(e.message);
        });
    } 

    const checkDuplecate = (type)=>{
        console.log('checkDuplecate type = ' + type);
        if(type == 'email') {
            if(isEmail) {
                AWSManager.checkDuplId({userId:inputs.email}).then((result)=> {
                    console.log('result =' + JSON.stringify(result));
                    if(result.data && result.data.isDupl) {
                        setInputsDuplicate({
                            ...inputsDuplicate,  
                            isDuplicateEmail: CHECK_FAIL,
                        });
                    } else {
                        setInputsDuplicate({
                            ...inputsDuplicate,  
                            isDuplicateEmail: CHECK_SUCCESS,
                        });
                    }
                }).catch(e => {
                    console.error(e.message);
                });
            }
        } else {
            if(isNickNm) {
                AWSManager.checkDuplNickNm({userNickNm:inputs.nickname}).then((result)=> {
                    console.log('result =' + JSON.stringify(result));
                    if(result.data && result.data.isDupl) {
                        setInputsDuplicate({
                            ...inputsDuplicate,  
                            isDuplicateNickNm: CHECK_FAIL,
                        });
                    } else {
                        setInputsDuplicate({
                            ...inputsDuplicate,  
                            isDuplicateNickNm: CHECK_SUCCESS,
                        });
                    }
                }).catch(e => {
                    console.error(e.message);
                });
            }
        }
    } 

    const showTermAndCondition = ()=>{
        console.log('showTermAndCondition');
        openModal();
    };

    const makeSMSKeys =() => {
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
            accessKey: accessKey, 
            date: date, 
            signature: signature, 
        };
        return options; 
    }

    const certificatePhone = ()=>{
        var phoneNumber = inputs['phoneNumber'];
        let authNum = '';
        let smsInfo = makeSMSKeys();
        for (let i = 0; i < 6; i++) {
            authNum += parseInt(Math.random() * 10);
        }
        let smsParam = {
            signature : smsInfo.signature,
            timestamp : smsInfo.date, 
            access : smsInfo.accessKey,
            receiverNum : phoneNumber,
            authNum : authNum,
        };
        
        console.log('certificatePhone = ' + phoneNumber + ', authNum =' + authNum);
        AWSManager.verifySMSNumber(smsParam).then((result)=> {
            if(result.data && result.data.indexOf('202')){
                console.log('문자 전송 성공');
                // 문자 입력 팝업 추가 
            } else {
                console.error('certificatePhone result =' + JSON.stringify(result));
            }
        }).catch(e => {
            console.error(e.message);
        });
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
                            { isDuplicateEmail == CHECK_NOTYET ? (email.length > 0 && !isEmail ? REG_USER_CHECK_EMAIL_FAIL : REG_USER_INPUT_EMAIL) 
                            : (isDuplicateEmail == CHECK_SUCCESS ? REG_USER_CHECK_EMAIL_DUPLICATION_SUCCESS : REG_USER_CHECK_EMAIL_DUPLICATION_FAIL)}
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
                            사용자 이름 입력
                        </span>
                        <div>
                            <input
                                type="text"
                                onChange={onChange}
                                name="name"
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
                        <span>
                            {pw.length > 0 ? (isPw ? REG_USER_CHECK_PW_SUCCESS : REG_USER_CHECK_PW_FAIL) : REG_USER_INPUT_PW}
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
                            {pwConfirm.length > 0 ? (isPwConfirm ? REG_USER_CHECK_PW_CONFIRM_SUCCESS : REG_USER_CHECK_PW_CONFIRM_FAIL) : REG_USER_INPUT_PW_CONFIRM}
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
                            { isDuplicateNickNm == CHECK_NOTYET ? (nickname.length > 0 && !isNickNm ? REG_USER_CHECK_NICKNM_FAIL : REG_USER_INPUT_NICKNM) 
                            : (isDuplicateNickNm == CHECK_SUCCESS ? REG_USER_CHECK_NICKNM_DUPLICATION_SUCCESS : REG_USER_CHECK_NICKNM_DUPLICATION_FAIL)}
                        </span>
                        <div>
                            <input
                                placeholder={"5~13자 (특수문자 제외)"}
                                type="text"
                                maxlength='13'
                                onChange={onChangeNickNmFormat}
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
                        <img alt="none" name="terms" src={terms ? checkOnPath : checkOffPath} onClick={onToggle}/>
                        <span class="highlight" onClick={showTermAndCondition}>개인정보처리방침 및 서비스이용약관</span>
                        <span>에 동의합니다.</span>
                    </span>
                    <br/>
                    <span>
                        <img alt="none" name="commercial" src={commercial ? checkOnPath : checkOffPath} onClick={onToggle}/>
                        <span class="highlight" onClick={showTermAndCondition}>제 3자 제공 및 마케팅</span>
                        <span> 수신 동의 (선택)</span>
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
