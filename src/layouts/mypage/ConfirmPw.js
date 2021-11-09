
import "./mypage.css";
import React, { useState, useRef, Component} from "react";
import { useHistory } from 'react-router'; 
import AWSManager from "../../managers/AWSManager.js";
import StorageManager from "../../managers/StorageManager.js";

export default function ConfirmPwComponent() {
    const history = useHistory();
    const [inputs, setInputs] = useState({
        pw: '',
    });
    const {pw} = inputs
    const onChange = (e) => {
        const { name, value } = e.target;
        const nextInputs = {
            ...inputs,  
            [name]: value,
        };
        setInputs(nextInputs);
    };
    const confirmPw = () => {
        let userInfo = StorageManager.loadUserInfo();
        console.log('입력 비밀번호 = ' + inputs.pw + ', userId = ' + userInfo.userId);
        AWSManager.checkPasswordVerification({
            userId: userInfo.userId,
            userPw: inputs.pw,
        }).then((result)=> {
            if(result.status == 200 && result.data.isCorrectPw && result.data.isCorrectPw == 'True') {
                console.log('비밀번호 검증 완료');
                history.push('/modifyAccount');
            } else {
                console.log('경고 팝업');
            }
        }).catch(e => {
            console.error('fail = ' + e.message);
        });
    };
 
    return (
        <main>
            <section className="mypage-header">
                <div>
                    <span>회원 비밀번호 확인</span>
                </div>
            </section>
            <section className="mypage-container">
                <div>
                    <span>
                        <span>
                            비밀번호 입력
                        </span>
                        <div>
                            <input
                                type="password"
                                onChange={onChange}
                                value={pw}
                                name="pw"
                            ></input>
                        </div>
                    </span>
                </div>
            </section> 
            <section className="mypage-button">
                <div>
                    <button className="full-button" onClick={confirmPw}>
                        비밀번호 확인
                    </button>
                </div>
            </section>
        </main>
     );
 }
 