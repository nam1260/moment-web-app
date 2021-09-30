/**
 * Login.js
 * @author wook
 * @since 2021/09/06
 * description
 */

import "./login.css";
import React, { useState, useRef} from "react";
import { useHistory } from 'react-router'; 
import { Modal } from "./Modal";

const editPath = "assets/icons/list-ico-edit.png"
 
export default function LoginComponent() {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };
 
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

    const addAccount = ()=>{
        console.log('inputs =' + JSON.stringify(inputs));
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
                                onChange={onChange}
                                name="email"
                            ></input>
                            <span>
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
                                onChange={onChange}
                                name="pw"
                            ></input>
                            <img src={editPath} />
                        </div>
                        <span>
                            비밀번호 확인
                        </span>
                        <div>
                            <input
                                placeholder={"비밀번호를 한번 더 입력해 주세요"}
                                type="password"
                                maxlength='20'
                                onChange={onChange}
                                name="pwConfirm"
                            ></input>
                            <img src={editPath} />
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
                            <span>
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
                            <span>
                                중복확인
                            </span>
                        </div>
                    </span>
                </div>
            </section> 
            <section className="login-button">
                <div>
                    <button onClick={addAccount}>
                        회원가입
                    </button>
                    {showModal ? <Modal setShowModal={setShowModal} /> : null}
                </div>
            </section>
            <section className="login-options">
                <div>
                </div>
            </section>
        </main>
    );
}
