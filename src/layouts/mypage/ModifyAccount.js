
import "./mypage.css";
import React, { useState, useEffect, useRef, Component} from "react";
import { useHistory } from 'react-router'; 
import MypageHeader from './MypageHeader';
import AWSManager from "../../managers/AWSManager.js";
import StorageManager from "../../managers/StorageManager";




const editPath = "assets/icons/list-ico-edit.png"
const cameraPath = "assets/icons/ico-camera.svg"
const thumPath = "assets/images/thum-160-px-1.png"
const checkOffPath = "assets/icons/check-off.svg"
const checkOnPath = "assets/icons/check-on.svg"


export default function ModifyAccountComponent() {
    const history = useHistory();
    const [inputs, setInputs] = useState({
        userId:'',
        userNm:'',
        pw: '',
        pwConfirm: '',
        phoneNum: '',
        userNickNm: '',
    });

    const { pw, pwConfirm, phoneNum, userNickNm } = inputs
    const onChange = (e) => {
        const { name, value } = e.target;
        const nextInputs = {
            ...inputs,
            [name]: value,
        };
        setInputs(nextInputs);
    };

    const [toggles, setToggle] = useState({
        commercial: false,
    });
    const {commercial } = toggles;
    const onToggle = (e) => {
        const { name } = e.target
        const nextInputs = {
            ...toggles,
            [name]: !toggles[name],
        }
        setToggle(nextInputs);
    };

    const _reset = () => {
        history.push("/");
    };
    const _complete = () => {
        AWSManager.updateUserInfo({

        })
    };

    useEffect(() =>{
        console.log("modifyAccount, 랜더링 될 떄마다 호출");
        let userId = StorageManager.loadUserInfo() ? StorageManager.loadUserInfo().userId : "";
        AWSManager.getUserInfo({
            userId
        }).then((result) =>{
            if(result && result.status === 200 && result.data) {
                setInputs(result.data);
            }
        });

    },[]);
 
    return (
        <main>
            <MypageHeader index={0}/>
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
                                <div>{inputs.userId}</div>
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
                            <div>{inputs.userNm}</div>
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
                                placeholder={inputs.userNickNm}
                                type="text"
                                onChange={onChange}
                                name="nickname"
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
                        <span>
                            휴대폰 번호
                        </span>
                        <div>
                            <input
                                placeholder={inputs.phoneNum}
                                type="text"
                                onChange={onChange}
                                name="phoneNumber"
                            ></input>
                            <img alt="none" src={editPath}/>
                        </div>
                          <br/>
                        <span>
                            <img alt="none" name="commercial" src={commercial ? checkOnPath : checkOffPath}
                                 onClick={onToggle}/>
                            <span class="highlight" onClick={() => {
                                history.push('/doc/1')
                            }}>제 3자 제공 및 마케팅</span>
                            <span> 수신 동의 (선택)</span>
                        </span>
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
 