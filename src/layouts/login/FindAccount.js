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
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };
 
    const [inputs, setInputs] = useState({
        nickname: '',
        phoneNumber: '',
    });
    const { nickname, phoneNumber } = inputs
    const onChange = (e) => {
        const { name, value } = e.target;
        const nextInputs = {
            ...inputs,  
            [name]: value,
        }
        setInputs(nextInputs);
    }
    const onChangeOnlyNumber = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');
        onChange(e);
    }
    
    const findAccount = ()=>{
        console.log('inputs =' + JSON.stringify(inputs));
    } 
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
                                onChange={onChange}
                                name="nickname"
                                value={nickname}
                            ></input>
                            <img src={editPath} />
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
                            <img src={editPath} />
                        </div>
                    </span>
                </div>
            </section> 
            <section className="login-button">
                <div>
                    <button onClick={findAccount}>
                        입력완료
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
 