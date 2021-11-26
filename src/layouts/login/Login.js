/**
 * Login.js
 * @author wook
 * @since 2021/09/06
 * description
 */

import "./login.css";
import "../popup/modalPopup.css";
import React, { useState } from "react";
import { useHistory } from 'react-router'; 
import { Modal } from "../popup/ModalPopup";
import AWSManager from "../../managers/AWSManager.js";
import StorageManager from "../../managers/StorageManager.js";
import { useDispatch } from "react-redux";
import { saveUser } from '../../redux/user';


const editPath = "assets/icons/list-ico-edit.png"
const failIcon = "assets/icons/icoFace3@3x.png"
const successIcon = "assets/icons/icoFace1@3x.png"




export default function LoginComponent() {
    const history = useHistory();
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const openWrongLoginInformaionPopup = () => {
        setShowModal(true);
    };
    
    const [isEnableLogin, setIsEnableLogin] = useState(false);

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
        if(id.length > 1 && pw.length > 1) setIsEnableLogin(true);
        else setIsEnableLogin(false);
    };
 
    const onReset = () => {
        const resetInputs = {
            id: '',
            pw: '',
        }
        setInputs(resetInputs)
    };

    const loginAction = ()=>{
        if(isEnableLogin) {
            AWSManager.loginUser({
                userId: inputs.id,
                userPw: inputs.pw,
            }).then((result)=> {
                if(result.status == 200 && result.data.Authorization) {
                    console.log('로그인 성공' , result);
                    StorageManager.saveUserInfo({
                        token : result.data.Authorization,
                        userNickNm : result.data.userNickNm,
                        userId: result.data.userId,
                    });
                    dispatch(saveUser({
                        userNickNm: result.data.userNickNm,
                        userId: result.data.userId
                    }))
                    const pathName = checkHaveBackPath();
                    history.push(pathName || '/');
                } else {
                    openWrongLoginInformaionPopup();
                }
            }).catch(e => {
                console.error('fail = ' + e.message);
            });
        } else {
            console.log('id / pw 입력 필요');
        }
    } 

    const checkHaveBackPath = () => {
        const {
            state
        } = history.location;

        if(state !== undefined) {
            if(state?.hasGoBack) {
                return state?.backPathName
            } else {
                return false;
            }
        }
        return false;
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
                    <button onClick={loginAction} className= {isEnableLogin ? "enable" : "disable"}>
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
 