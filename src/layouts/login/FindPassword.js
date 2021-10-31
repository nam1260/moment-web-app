/**
 * Login.js
 * @author wook
 * @since 2021/09/06
 * description
 */

 import "./login.css";
 import React, { useState, useRef} from "react";
 import { useHistory } from 'react-router'; 
 import { Modal } from "../popup/ModalPopup";

 const editPath = "assets/icons/list-ico-edit.png"
 
 var loginAction = ()=>{
    console.log('test');
}
 export default function LoginComponent() {
    const history = useHistory();
    const idInputElement = useRef(null);
    const pwInputElement = useRef(null);
    const userList = [
        {
            id: "test123@naver.com",
            pw: "test123",
        },
    ];

    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };
  
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
                                ref={idInputElement}
                                type="text"
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
                        <span>
                            휴대폰 번호 (숫자만)
                        </span>
                        <div>
                            <input
                                ref={pwInputElement}
                                type="text"
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
                        <span>
                            인증번호 확인 (03:00 남음)
                        </span>
                        <div>
                            <input
                                ref={pwInputElement}
                                type="text"
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
                    </span>
                </div>
            </section> 
            <section className="login-button">
                <div>
                    <button onClick={openModal}>
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
 