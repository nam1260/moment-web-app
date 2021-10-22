/**
 * Login.js
 * @author wook
 * @since 2021/09/06
 * description
 */

import "./login.css";
import React, { useState, useRef, Component} from "react";
import { useHistory } from 'react-router'; 
import { Modal } from "./Modal";

const editPath = "assets/icons/list-ico-edit.png"
const failIcon = "assets/icons/icoFace3@3x.png"
const successIcon = "assets/icons/icoFace1@3x.png"


export default function LoginComponent() {
    const history = useHistory();
    const userList = [
        {
            id: "test@naver.com",
            pw: "test123",
            phone: "01012345678",
            nickname: "test",
        },
    ];

    const [showModal, setShowModal] = useState(false);
    const openWrongLoginInformaionPopup = () => {
        setShowModal(true);
    };

    const [inputs, setInputs] = useState({
        id: '',
        pw: '',
    });
    const { id, pw } = inputs
    const onChange = (e) => {
        const { name, value } = e.target;
        const nextInputs = {
            ...inputs,  
            [name]: value,
        };
        setInputs(nextInputs);
    };
 
    const onReset = () => {
        const resetInputs = {
            id: '',
            pw: '',
        }
        setInputs(resetInputs)
    };

    const loginAction = ()=>{
        const userInfo = null;
        console.log('inputs =' + JSON.stringify(inputs));
        userList.some((info)=>{
            if(info.id == inputs.id && info.pw == inputs.pw) {
                userInfo = info;
                return true;
            }
        });

        if(userInfo) {
            console.log('로그인 성공');
        } else {
            openWrongLoginInformaionPopup();
        }
    } 

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
                                placeholder={"이메일 혹은 아이디를 입력해 주세요"}
                                type="text"
                                onChange={onChange}
                                value={id}
                                name="id"
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
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
                            <img alt="none" src={editPath} />
                        </div>
                    </span>
                </div>
            </section> 
            <section className="login-button">
                <div>
                    <button onClick={loginAction}>
                        로그인하기
                    </button>
                    {showModal ? 
                    <Modal setShowModal={setShowModal}> 
                        <div className="button_modal">
                            <div className="info_container">
                                <img alt="none" src={failIcon} />
                                <span className="title">일치하는 계정 정보가 없습니다.</span>
                                <br/>
                                <span className="description">입력하신 ID와 비밀번호가 올바른지 </span>
                                <br/>
                                <span className="description">다시 확인해 주세요.</span>
                            </div>
                            <div className="button_container">
                                <button className="left_button" onClick={()=>{
                                        console.log("retry");
                                        setShowModal(false);
                                        onReset();
                                    }}>
                                    다시입력
                                </button>
                                <button className="right_button" onClick={()=>{
                                        console.log("add account");
                                        setShowModal(false);
                                        history.push('/addAccount');
                                    }}>
                                    회원가입
                                </button>
                            </div>
                        </div>
                    </Modal> : null}
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
 