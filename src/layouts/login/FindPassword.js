/**
 * Login.js
 * @author wook
 * @since 2021/09/06
 * description
 */

 import "./login.css";
 import React, { useState, useRef} from "react";
 import { useHistory } from 'react-router';
 import CryptoJS from "crypto-js";
 import AWSManager from "../../managers/AWSManager.js";
//  import EncryptionManager from "../../managers/EncryptionManager.js";

 const editPath = "assets/icons/list-ico-edit.png"
 
 export default function LoginComponent() {
    const history = useHistory();
    const [inputs, setInputs] = useState({
        userId: '',
        phoneNumber: '',
        authNum: '',
        validNumber: '',
    });
    const { userId, phoneNumber, authNum, validNumber} = inputs;
    const [inputsAvalilables, setInputsAvalilables] = useState({
        isUserId: false,
        isPhone: false, // 핸드폰 번호 
        isCertNum: false, // 인증 번호  
    }); 
    const { isUserId, isPhone, isCertNum } = inputsAvalilables;

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

    const confirmCerttificatePhone = () => {
        console.log('authNum = ' + authNum + ', validNumber =' + validNumber + ', confirm ? ' + (validNumber == authNum));
        if(isAvailableFindPw) {
            if(validNumber == authNum) {
                // 새로운 비밀번호 입력 팝업 
                
            } else {
                alert("핸드폰 인증에 실패 했습니다.");
            }
        }
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
                        입력완료
                    </button>
                </div>
            </section>
            <section className="login-options">
                <div>
                </div>
            </section>
        </main>
     );
 }
 