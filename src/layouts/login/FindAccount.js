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
import { Modal } from "../popup/ModalPopup";
import CryptoJS from "crypto-js";
import AWSManager from "../../managers/AWSManager.js";
 
const editPath = "assets/icons/list-ico-edit.png";
const closeIcon = "/assets/icons/ico-close.png";

const REG_USER_INPUT_PHONE = "휴대폰 번호 (숫자만)";
const REG_USER_CHECK_PHONE = "휴대폰 번호 인증이 완료되었습니다.";

const MODAL_TYPE = {
    INIT: 0,
    PHONE:1,
    NOTI:2,
}

export default function LoginComponent() {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(MODAL_TYPE.INIT);
    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };
 
    const [inputs, setInputs] = useState({
        name: '',
        phoneNumber: '',
        authNum: '',
        validNumber: '',
    });
    const [isValidPhoneNum, setIsValidPhoneNum] = useState( false ); 
    const { name, phoneNumber, authNum, validNumber} = inputs
    const onChange = (e) => {
        const { name, value } = e.target;
        const nextInputs = {
            ...inputs,  
            [name]: value,
        }
        setInputs(nextInputs);
    }
    const [inputsAvalilables, setInputsAvalilables] = useState({
        isName: false,
        isPhone: false, // 핸드폰 번호 인증 
    }); 
    const { isName, isPhone } = inputsAvalilables;

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
    const onChangeOnlyNumber = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        onChange(e);
        if(e.target.name == "phoneNumber") {
            if(e.target.value.length > 9) setIsValidPhoneNum(true);
            else setIsValidPhoneNum(false);
        }
    }
    
    const findAccount = ()=>{
        console.log('inputs =' + JSON.stringify(inputs));
        
        if(isAvailableFindAcount) {
            AWSManager.findUserId({
                userNm : name,
                phoneNum : phoneNumber
            }).then((result)=> {
                console.log(JSON.stringify(result));
                const nextInputs = {
                    ...inputs,  
                    'userId': result.data.userId,
                }
                setInputs(nextInputs);
                setModalType(MODAL_TYPE.NOTI);
                openModal();
            }).catch(e => {
                console.error(e.message);
            });
        } else {
            alert("이름 입력 및 휴대폰 인증을 완료해주세요.");
        }
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
                setModalType(MODAL_TYPE.PHONE);
                openModal();
            } else {
                console.error('certificatePhone result =' + JSON.stringify(result));
            }
        }).catch(e => {
            console.error(e.message);
        });
    } 

    const confirmCerttificatePhone = () => {
        console.log('authNum = ' + authNum + ', validNumber =' + validNumber + ', confirm ? ' + (validNumber == authNum));
        
        setInputsAvalilables({
            ...inputsAvalilables,  
            ['isPhone']: (validNumber == authNum),
        });
    };
    const PhoneInputComponent = () => {
        return (
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
        )
    };
    
    const IdNotiComponent = () => {
        return (
            <div className="button_modal_noti">
                <div className="info_container">
                    <br/>
                    <span className="title">아이디:</span>
                    <span className="title">{inputs.userId}</span>
                    <span className="description">문의는 아래 이메일을 참조해 주세요.</span>
                    <span className="description">mtm.moment@gmail.com</span>
                </div>
                <div className="button_container">
                    <button className="center_button" onClick={()=>{
                            setShowModal(false);
                        }}>
                        확인
                    </button>
                </div>
            </div>
        )
    };

    let isAvailableFindAcount = (isPhone && isName);
    return (
        <main>
            <section className="login-header">
                <div className="container">
                    <span>아이디 찾기</span>
                </div>
            </section>
            <section className="login-container">
                <div>
                    <span>
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
                            {isPhone ? REG_USER_CHECK_PHONE : REG_USER_INPUT_PHONE}
                        </span>
                        <div>
                            <input
                                type="text"
                                maxlength='11'
                                onChange={onChangeOnlyNumber}
                                name="phoneNumber"
                                value={phoneNumber}
                            ></input>
                            <span className={isValidPhoneNum? 'enable':'disable'} onClick={certificatePhone}>
                                인증요청
                            </span>
                        </div>
                    </span>
                </div>
            </section> 
            <section className="login-button">
                <div>
                    <button className = {isAvailableFindAcount ? "enale" : "disable"} onClick={findAccount}>
                        입력완료
                    </button>
                    {showModal ? 
                    <Modal setShowModal={setShowModal} blockClickBG={true}> 
                        {
                            {
                                [MODAL_TYPE.INIT] :   <></>,
                                [MODAL_TYPE.PHONE] : PhoneInputComponent(),
                                [MODAL_TYPE.NOTI] : IdNotiComponent(),
                            }[modalType]
                        }
                    </Modal> : null}
                </div>
            </section>
            <section className="login-options">
                <div>
                    <a onClick={()=> { history.push('/addAccount') }}>회원가입</a>
                    <a onClick={()=> { history.push('/findPassword') }}>비밀번호 찾기</a>
                </div>
            </section>
        </main>
    );
}
 