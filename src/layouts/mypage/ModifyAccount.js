
import "./mypage.css";
import React, { useState, useRef, Component} from "react";
import { useHistory } from 'react-router'; 

const editPath = "assets/icons/list-ico-edit.png"
const cameraPath = "assets/icons/ico-camera.svg"
const thumPath = "assets/images/hskim/thum-160-px-1.png"


export default function ModifyAccountComponent() {
    const history = useHistory();
    const userInfo = {
        id: "starkim@moment.com",
        pw: "test123",
        phone: "01012344567",
        nickname: "김스타",
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
        const { name, value } = e.target;
        const nextInputs = {
            ...inputs,  
            [name]: value,
        };
        setInputs(nextInputs);
    };
    const _reset = () => {
        const resetInputs = {
            id: '',
            pw: '',
        }
        setInputs(resetInputs)
    };
    const _complete = () => {
        const resetInputs = {
            id: '',
            pw: '',
        }
        setInputs(resetInputs)
    };
 
    return (

        <main>
            <section className="mypage-header">
                <div>
                    <span>회원 정보 수정</span>
                </div>
            </section>
            <section className="mypage-container">
                <div>
                    <span>
                        <span>
                            이메일
                        </span>
                        <div className="mypage-email">
                            <div>
                                <div>{userInfo.id}</div>
                            </div>
                            <div className="thumbnail"> 
                                <img className="thumbnail-img" alt="none" src={thumPath} />
                                <img className="thumbnail-icon" alt="none" src={cameraPath} />
                            </div>
                        </div>
                        <span>
                            이름
                        </span>
                        <div className="nickname">
                            <div>{userInfo.nickname}</div>
                        </div>
                        <span>
                            비밀번호
                        </span>
                        <div>
                            <input
                                type="password"
                                onChange={onChange}
                                value={pw}
                                name="pw"
                            ></input>
                        </div>
                        <span>
                            비밀번호 확인
                        </span>
                        <div>
                            <input
                                type="password"
                                onChange={onChange}
                                value={pwConfirm}
                                name="pwConfirm"
                            ></input>
                        </div>
                        <span>
                            이름(닉네임)
                        </span>
                        <div>
                            <input
                                placeholder={userInfo.nickname}
                                type="text"
                                onChange={onChange}
                                value={nickname}
                                name="nickname"
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
                        <span>
                            휴대폰 번호
                        </span>
                        <div>
                            <input
                                placeholder={userInfo.phone}
                                type="text"
                                onChange={onChange}
                                value={phoneNumber}
                                name="phoneNumber"
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
                    </span>
                </div>
            </section> 
            <section className="mypage-button">
                <div>
                    <button className="cancel-button" onClick={_reset}>
                        취소하기
                    </button>
                    <button onClick={_complete}>
                        수정완료
                    </button>
                </div>
            </section>
        </main>
     );
 }
 