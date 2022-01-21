/**
 * Login.js
 * @author wook
 * @since 2021/09/06
 * description
 */

 import "./login.css";
 import "../popup/modalPopup.css";
 import React, { useState, useRef} from "react";
 import { useHistory } from 'react-router';
 import CryptoJS from "crypto-js";
 import AWSManager from "../../managers/AWSManager.js";
 import { Modal } from "../popup/ModalPopup";
 import EncryptionManager from "../../managers/EncryptionManager.js";

 const editPath = "assets/icons/list-ico-edit.png"

 const REG_USER_INPUT_PW = "비빌번호 입력";
 const REG_USER_CHECK_PW_FAIL = "비밀번호 형식이 올바르지 않습니다.";
 const REG_USER_CHECK_PW_SUCCESS = "사용가능한 비밀번호입니다.";
 const REG_USER_INPUT_PW_CONFIRM = "비빌번호 확인";
 const REG_USER_CHECK_PW_CONFIRM_FAIL = "비밀번호가 일치 하지 않습니다.";
 const REG_USER_CHECK_PW_CONFIRM_SUCCESS = "비밀번호가 일치 합니다.";
 
const MODAL_TYPE = {
    INIT: 0,
    INPUT_PW: 1,
    PW_CONFIRM: 2,
}
 export default function LoginComponent() {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(MODAL_TYPE.INIT);
    const [inputs, setInputs] = useState({
        userId: '',
        phoneNumber: '',
        authNum: '',
        validNumber: '',
        pw: '',
        pwConfirm: '',
        name: '',
    });
    const { userId, phoneNumber, authNum, validNumber, pw, pwConfirm, name} = inputs;
    const [inputsAvalilables, setInputsAvalilables] = useState({
        isUserId: false,
        isPhone: false, // 핸드폰 번호 
        isCertNum: false, // 인증 번호  
        isPw: false,
        isPwConfirm: false,
        isName: false,
    }); 
    const { isUserId, isPhone, isCertNum, isPw, isPwConfirm, isName} = inputsAvalilables;

    const onChangeOnlyNumber = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        onChange(e);
        if(e.target.name == "phoneNumber") {
            if(e.target.value.length > 9) {
                setInputsAvalilables({
                    ...inputsAvalilables,  
                    'isPhone': true,
                });
            } else {
                setInputsAvalilables({
                    ...inputsAvalilables,  
                    'isPhone': false,
                });
            }
        }
    }
    const onChange = (e) => {
        const { name, value } = e.target;
        const nextInputs = {
            ...inputs,  
            [name]: value,
        }
        if(userId.length > 2) {
            setInputsAvalilables({
                ...inputsAvalilables,  
                'isUserId': true,
            });
        }
        if(validNumber.length > 2) {
            setInputsAvalilables({
                ...inputsAvalilables,  
                'isCertNum': true,
            });
        }
        setInputs(nextInputs);
        console.log(inputs);
        console.log(inputsAvalilables);
    }
  
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
        
        const nextInputs = {
            ...inputs,  
            ['authNum']: authNum,
        }
        setInputs(nextInputs);
        console.log('certificatePhone = ' + phoneNumber + ', authNum =' + authNum);
        AWSManager.verifySMSNumber(smsParam).then((result)=> {
            if(result.data && result.data.indexOf('202')){
                console.log('문자 전송 성공');
            } else {
                console.error('certificatePhone result =' + JSON.stringify(result));
            }
        }).catch(e => {
            console.error(e.message);
        });
    } 

    const onChangeNameFormat = (e) => {
        var nickNmRule = /[ㄱ-ㅎㅏ-ㅣ가-힣]/g;
        if(!nickNmRule.test(e.target.value)) {
            console.log('이름 규칙에 맞지 않음');
            setInputsAvalilables({
                ...inputsAvalilables,  
                'isName': false,
            });
        } else {
            console.log('이름 규칙에 맞음');
            setInputsAvalilables({
                ...inputsAvalilables,  
                'isName': true,
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
                'isPw': false,
            });
        } else {
            console.log('비밀번호 규칙에 맞음');
            setInputsAvalilables({
                ...inputsAvalilables,  
                'isPw': true,
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
                'isPwConfirm': false,
            });
        } else {
            console.log('입력한 비밀번호가 같음');
            setInputsAvalilables({
                ...inputsAvalilables,  
                'isPwConfirm': true,
            });
        }
        onChange(e);
    };
    const confirmCerttificatePhone = () => {
        console.log('authNum = ' + authNum + ', validNumber =' + validNumber + ', confirm ? ' + (validNumber == authNum));
        setModalType(MODAL_TYPE.INPUT_PW);
        setShowModal(true);
        if(isAvailableFindPw) {
            if(validNumber == authNum) {
                // 새로운 비밀번호 입력 팝업 
                    setModalType(MODAL_TYPE.INPUT_PW);
                    setShowModal(true);
            } else {
                alert("핸드폰 인증에 실패 했습니다.");
            }
        }
    };

    const inputModalComponent = () => {
        return (
            <div className="button_modal_input_pw">
                <div className="info_container">
                    <br/>
                    <span className="title">변결할 비밀 번호를 입력해주세요.</span>
                    <div className="input_pw">
                        <span>
                            {pw.length > 0 ? (isPw ? REG_USER_CHECK_PW_SUCCESS : REG_USER_CHECK_PW_FAIL) : REG_USER_INPUT_PW}
                        </span>
                        <input
                            placeholder={"8~20자 영문 대소문자/숫자/특수문자"}
                            type="password"
                            maxlength='20'
                            onChange={onChangePassword}
                            name="pw"
                        ></input>
                        <img alt="none" src={editPath} />
                    </div>
                    <div className="input_pw">
                        <span>
                            {pwConfirm.length > 0 ? (isPwConfirm ? REG_USER_CHECK_PW_CONFIRM_SUCCESS : REG_USER_CHECK_PW_CONFIRM_FAIL) : REG_USER_INPUT_PW_CONFIRM}
                        </span>
                        <input
                            placeholder={"비밀번호를 한번 더 입력해 주세요"}
                            type="password"
                            maxlength='20'
                            onChange={onChangePasswordConfirm}
                            name="pwConfirm"
                        ></input>
                        <img alt="none" src={editPath} />
                    </div>
                </div>
                <div className="button_container">
                    <button className={isPw && isPwConfirm ? "center_button" : "center_button_disable"} onClick={()=>{
                            if(isPw && isPwConfirm){
                                EncryptionManager.createPassword(inputs.pw).then((result)=>{
                                    let salt = result.salt;
                                    console.log("createPassword salt = " , salt);
                                    AWSManager.updateUserPw({
                                        userId: inputs.userId,
                                        phoneNum: inputs.phoneNumber,
                                        userNm : name,
                                        userPw: result.password,
                                        salt: salt
                                    }).then((result) =>{
                                        console.log("updateUserPw = " , result);
                                        if(result.data.isSuccess) {
                                            setModalType(MODAL_TYPE.PW_CONFIRM);
                                            setShowModal(true);
                                        } else {
                                            alert("비밀번호 변경에 실패했습니다. 입력한 정보를 다시 확인해주세요.");
                                        }
                                    }).catch(e => {
                                        console.error(e.message);
                                        alert("비밀번호 변경에 실패했습니다. 입력한 정보를 다시 확인해주세요.");
                                    });
                                });
                            }
                        }}>
                        확인
                    </button>
                </div>
            </div>
        )
    };
   
    const notiComponent = () => {
        return (
            <div className="button_modal_noti">
                <div className="info_container">
                    <br/>
                    <br/>
                    <span className="title">비밀번호 변경이 완료되었습니다.</span>
                    <br/>
                    <span className="description">변경된 비밀번호로 다시 로그인해주세요.</span>
                </div>
                <div className="button_container">
                    <button className="center_button" onClick={()=>{
                            setShowModal(false);
                            history.push('/');
                        }}>
                        확인
                    </button>
                </div>
            </div>
        )
    };

    let isAvailableFindPw = (isPhone && isUserId && isCertNum);
    return (
        <main>
            <section className="login-header">
                <div className="container">
                    <span>비밀번호 찾기</span>
                </div>
            </section>
            <section className="login-container">
                <div>
                    <span>
                        <span>
                            이메일 혹은 아이디
                        </span>
                        <div>
                            <input
                                type="text"
                                onChange={onChange}
                                name="userId"
                                value={userId}
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
                        <span>
                            이름 (닉네임)
                        </span>
                        <div>
                            <input
                                type="text"
                                onChange={onChangeNameFormat}
                                name="name"
                                value={name}
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
                        <span>
                            휴대폰 번호 (숫자만)
                        </span>
                        <div>
                            <input
                                type="text"
                                maxlength='11'
                                onChange={onChangeOnlyNumber}
                                name="phoneNumber"
                                value={phoneNumber}
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
                        <span>
                            인증번호 확인 
                        </span>
                        <div>
                            <input
                                type="text"
                                maxlength='6'
                                onChange={onChange}
                                name="validNumber"
                                value={validNumber}
                            ></input>
                            <span className={isPhone? 'enable':'disable'} onClick={certificatePhone}>
                                인증요청
                            </span>
                        </div>
                    </span>
                </div>
            </section> 
            <section className="login-button">
                <div>
                    <button className = {isAvailableFindPw ? "enale" : "disable"} onClick={confirmCerttificatePhone}>
                        비밀번호 변경
                    </button>
                    {showModal ?
                    <Modal setShowModal={setShowModal} blockClickBG={true}>
                        {
                            {
                                [MODAL_TYPE.INIT] :   <></>,
                                [MODAL_TYPE.INPUT_PW] : inputModalComponent(),
                                [MODAL_TYPE.PW_CONFIRM] : notiComponent(),
                            }[modalType]
                        }
                    </Modal> : null}
                </div>
            </section>
            <section className="login-options">
                <div>
                </div>
            </section>
        </main>
     );
 }
 