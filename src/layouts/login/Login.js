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
                    <span>모먼트 로그인</span>
                </div>
            </section>
            <section className="login-container">
                <div>
                    <span>
                        <span>
                            이메일 혹은 아이디 입력
                        </span>
                        <div>
                            <input
                                ref={idInputElement}
                                type="text"
                            ></input>
                            <img src={editPath} />
                        </div>
                        <span>
                            비밀번호 입력
                        </span>
                        <div>
                            <input
                                ref={pwInputElement}
                                type="password"
                            ></input>
                            <img src={editPath} />
                        </div>
                    </span>
                </div>
            </section> 
            <section className="login-button">
                <div>
                    <button onClick={openModal}>
                        로그인하기
                    </button>
                    {showModal ? <Modal setShowModal={setShowModal} /> : null}
                </div>
            </section>
            <section className="login-options">
                <div>
                    <a onClick={()=> { history.push('/addAccount') }}>모먼트 회원이 아닌가요</a>
                    <a onClick={()=> { history.push('/findAccount') }}>계정을 찾고 계신가요</a>
                </div>
            </section>
        </main>
     );
 }
 