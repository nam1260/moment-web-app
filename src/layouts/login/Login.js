/**
 * Login.js
 * @author wook
 * @since 2021/09/06
 * description
 */

 import { useState, useRef, useLayoutEffect } from "react";

 import "./login.css";
 
 const editPath = "assets/icons/list-ico-edit.png"
 
 export default function SearchComponent() {
     const idInputElement = useRef(null);
     const pwInputElement = useRef(null);
     const userList = [
         {
             id: "test123@naver.com",
             pw: "test123",
             phone: "010-1234-5678",
             name: '트스테'
         },
     ];
 
     return (
        <main>
            <section className="login-header">
                <div className="container">
                    <span>모먼트 로그인</span>
                </div>
            </section>
            <section className="login-container">
                <div className="container">
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
                <div className="container">
                    <button>
                        로그인하기
                    </button>
                </div>
            </section>
            <section className="login-option">
                <div className="container">
                    <p>모먼트 회원이 아닌가요</p>
                    <p>계정을 찾고 계신가요</p>
                </div>
            </section>
        </main>
     );
 }
 