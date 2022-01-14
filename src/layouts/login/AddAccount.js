
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
import EncryptionManager from "../../managers/EncryptionManager.js";
import {WrapLoginedComponent} from "../../shared/component/common/WrapLoginedComponent";

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

const REG_USER_INPUT_PHONE = "휴대폰 번호 (숫자만)";
const REG_USER_CHECK_PHONE = "휴대폰 번호 인증이 완료되었습니다.";

const CHECK_NOTYET = 0;
const CHECK_SUCCESS = 1;
const CHECK_FAIL = 2;

function AddAccountComponent({isLoginded}) {
    const history = useHistory();

    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    const [inputsAvalilables, setInputsAvalilables] = useState({
        isEmail: false,
        isName: false,
        isPw: false,
        isPwConfirm: false,
        isPhone: false, // 핸드폰 번호 인증 
        isNickNm: false,
    }); 
    const { isEmail, isName, isPw, isPwConfirm, isPhone, isNickNm } = inputsAvalilables;

    const [inputsDuplicate, setInputsDuplicate] = useState({
        isDuplicateEmail: CHECK_NOTYET,
        isDuplicateNickNm: CHECK_NOTYET,
    }); 
    const { isDuplicateEmail, isDuplicateNickNm } = inputsDuplicate;
    
    const [isValidPhoneNum, setIsValidPhoneNum] = useState( false ); 

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
    };

    const [inputs, setInputs] = useState({
        email: '',
        pw: '',
        pwConfirm: '',
        phoneNumber: '',
        nickname: '',
        authNum:'',
        validNumber: '',
    });
    const { email, name,  pw, pwConfirm, phoneNumber, nickname, validNumber, authNum } = inputs;
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
        if(e.target.name == "phoneNumber") {
            if(e.target.value.length > 9) setIsValidPhoneNum(true);
            else setIsValidPhoneNum(false);
        }
    };
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
    };
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
    };
    const onChangeNameFormat = (e) => {
        var nickNmRule = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
        if(!nickNmRule.test(e.target.value)) {
            console.log('이름 규칙에 맞지 않음');
            setInputsAvalilables({
                ...inputsAvalilables,  
                isName: false,
            });
        } else {
            console.log('이름 규칙에 맞음');
            setInputsAvalilables({
                ...inputsAvalilables,  
                isName: true,
            });
        }
        onChange(e);
    };
    const onChangePassword = (e) => {
        var passRule = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^*()&+=]).*$/; // 특수문자 / 문자 / 숫자 포함 형태의 8~20자리 이내의 암호 정규식
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
    };
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
    };

    const addAccount = ()=>{
        // show term and condition 
        if(isAvailableAddCount) {
            EncryptionManager.createPassword(inputs.pw).then((result)=>{
                let salt = result.salt;
                let userinfo = {
                    userId: inputs.email,
                    userNm: inputs.name,
                    userPw: result.password,
                    userNickNm: inputs.nickname,
                    phoneNum: inputs.phoneNumber, 
                    mrktAgreeYn: commercial? 'y': 'n',
                    salt : salt,
                };
                AWSManager.regUserInfo(userinfo).then((result)=> {
                    if(result && result.status == 200 && result.data.Authorization && result.data.Authorization.length > 20) {
                        console.log('계정 생성 성공');
                        StorageManager.saveUserInfo({
                            token : result.data.Authorization,
                            userNickNm : inputs.nickname,
                            userId: inputs.email,
                            userImgUrl: '',
                        });
                        StorageManager.saveSalt(salt);
                        history.push('/');
                    } else {
                        console.log('계정 생성 실패 result =' + JSON.stringify(result));
                    }
                }).catch(e => {
                    console.error(e.message);
                });
            });

        }
    };

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
    };

    const makeSMSKeys =() => {
        const date = Date.now().toString(); 
        const uri = "ncp:sms:kr:278684825820:moment"; 
        const secretKey = "hsN26xRnxfh3UH3Uz2aEOclPT0w2CLmdcILGarg6"; 
        const accessKey = "S3EOF4dZC8qNCL3pE9jL"; 
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
    };

    const certificatePhone = ()=>{
        if(!isValidPhoneNum) return;
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
        const nextInputs = {
            ...inputs,  
            ['authNum']: authNum,
        }
        setInputs(nextInputs);

        console.log('certificatePhone = ' + phoneNumber + ', authNum =' + authNum);
        AWSManager.verifySMSNumber(smsParam).then((result)=> {
            if(result.data && result.data.indexOf('202')){
                console.log('문자 전송 성공');
                openModal();
            } else {
                console.error('certificatePhone result =' + JSON.stringify(result));
            }
        }).catch(e => {
            console.error(e.message);
        });
    };
    
    const confirmCerttificatePhone = () => {
        console.log('authNum = ' + authNum + ', validNumber =' + validNumber + ', confirm ? ' + (validNumber == authNum));
        
        const nextInputs = {
            ...inputsAvalilables,  
            ['isPhone']: (validNumber == authNum),
        }
        setInputsAvalilables(nextInputs)
    };
    
    const [smsTimerText, setSmsTimerText] = useState('00 : 00'); 
    

    let isAvailableAddCount = (terms && isDuplicateEmail == CHECK_SUCCESS && isDuplicateNickNm == CHECK_SUCCESS && isPw && isPwConfirm && isPhone && isName);
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
                                disabled={isDuplicateEmail == CHECK_SUCCESS}
                            ></input>
                            <span onClick={()=>{checkDuplecate('email');}}>
                                중복확인
                            </span>
                        </div>
                        <span>
                            사용자 이름 입력 (한글로 입력해주세요)
                        </span>
                        <div>
                            <input
                                type="text"
                                onChange={onChangeNameFormat}
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
                            {isPhone ? REG_USER_CHECK_PHONE : REG_USER_INPUT_PHONE}
                        </span>
                        <div>
                            <input
                                placeholder={"휴대폰 번호 10자리 또는 11자리 입력"}
                                type="text"
                                maxlength='11'
                                onChange={onChangeOnlyNumber}
                                name="phoneNumber"
                                value={phoneNumber}
                                disabled={isPhone == CHECK_SUCCESS}
                            ></input>
                            <span className={isValidPhoneNum? 'enable':'disable'} onClick={()=>{
                                certificatePhone();
                            }}>
                                인증요청
                            </span>
                            {showModal ? 
                            <Modal setShowModal={setShowModal} blockClickBG={true}> 
                                <div className="input_modal">
                                    <div className="info_container">
                                        <div className="title_container">
                                            <span className="title">인증번호</span>
                                        </div>
                                        <div className="input_container">
                                            <input
                                                type="text"
                                                maxlength='6'
                                                onChange={onChangeOnlyNumber}
                                                name="validNumber"
                                                value={validNumber}
                                                placeholder={"숫자 6 자리 입력"}
                                            ></input>
                                            {/* <span>{smsTimerText}</span> */}
                                        </div>
                                        <div className="button_container">
                                            <button className="left_button" onClick={()=>{
                                                console.log('인증번호 취소'); 
                                                closeModal();
                                            }}>취소</button>
                                            <button className="right_button" onClick={()=>{
                                                console.log('인증번호 입력');
                                                confirmCerttificatePhone();
                                                closeModal();
                                            }}>확인</button>
                                        </div>
                                    </div>
                                </div>
                            </Modal> : null}
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
                                disabled={isDuplicateNickNm == CHECK_SUCCESS}
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
                        <span class="highlight" onClick={()=>{history.push('/doc/3')}}>개인정보처리방침 및 서비스이용약관</span>
                        <span>에 동의합니다.</span>
                    </span>
                    <br/>
                    <span>
                        <img alt="none" name="commercial" src={commercial ? checkOnPath : checkOffPath} onClick={onToggle}/>
                        <span class="highlight" onClick={()=>{history.push('/doc/1')}}>제 3자 제공 및 마케팅</span>
                        <span> 수신 동의 (선택)</span>
                    </span>
                </div>
            </section>
            <section className="login-button">
                <div>
                    <button onClick={addAccount} 
                        className = {isAvailableAddCount ? "enale" : "disable"}>
                        회원가입
                    </button>
                </div>
            </section>
            <section className="login-options">
                <div>
                </div>
            </section>
        </main>
    );
} export default WrapLoginedComponent(AddAccountComponent);
