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
import EncryptionManager from "../../managers/EncryptionManager.js";
import {WrapLoginedComponent} from "../../shared/component/common/WrapLoginedComponent";
import {Redirect} from 'react-router-dom'
import ADSManager from '../../managers/ADSManager';

const editPath = "assets/icons/list-ico-edit.png"
const failIcon = "assets/icons/icoFace3@3x.png"
const successIcon = "assets/icons/icoFace1@3x.png"




function LoginComponent({isLogined}) {
    console.log("loginComponent "+isLogined);
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

    const loginAction = (e)=>{

        if(e && e.key && e.key !== "Enter") {
            return ;
        }
        if(isEnableLogin) {
            AWSManager.getSalt({userId: inputs.id}).then((result)=>{
                console.log('getSalt = ' + result.data.salt);
                let salt = result.data.salt;
                EncryptionManager.makePassword(inputs.pw, salt).then((hashedPassword)=>{
                    console.log('getHashedPassword = ' + hashedPassword);
                    AWSManager.loginUser({
                        userId: inputs.id,
                        userPw: hashedPassword,
                    }).then((result)=> {
                        if(result.status == 200 && result.data.Authorization) {
                            console.log('????????? ??????' , result);
                            StorageManager.saveUserInfo({
                                token : result.data.Authorization,
                                userNickNm : result.data.userNickNm,
                                userId: result.data.userId,
                                userImgUrl: result.data.userImgUrl,
                            });
                            StorageManager.saveSalt(salt);
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
                        openWrongLoginInformaionPopup();
                    });
                });
            }).catch(e => {
                console.error('fail = ' + e.message);
                openWrongLoginInformaionPopup();
            });
        } else {
            console.log('id / pw ?????? ??????');
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
        isLogined? <Redirect to="/"/> :
        <main>
            <section className="login-header">
                <div className="container">
                    <span>????????? ?????????</span>
                </div>
            </section>
            <section className="login-container">
                <div>
                    <span>
                        <span>
                            ????????? ?????? ????????? ??????
                        </span>
                        <div>
                            <input
                                placeholder={"????????? ?????? ???????????? ????????? ?????????"}
                                type="text"
                                onChange={onChange}
                                onKeyPress={loginAction}
                                value={id}
                                name="id"
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
                        <span>
                            ???????????? ??????
                        </span>
                        <div>
                            <input
                                type="password"
                                onChange={onChange}
                                onKeyPress={loginAction}
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
                        ???????????????
                    </button>
                    {showModal ?
                    <Modal setShowModal={setShowModal}>
                        <div className="button_modal">
                            <div className="info_container">
                                <img alt="none" src={failIcon} />
                                <span className="title">???????????? ?????? ????????? ????????????.</span>
                                <br/>
                                <span className="description">???????????? ID??? ??????????????? ???????????? </span>
                                <br/>
                                <span className="description">?????? ????????? ?????????.</span>
                            </div>
                            <div className="button_container">
                                <button className="left_button" onClick={()=>{
                                        console.log("retry");
                                        setShowModal(false);
                                        onReset();
                                    }}>
                                    ????????????
                                </button>
                                <button className="right_button" onClick={()=>{
                                        console.log("add account");
                                        setShowModal(false);
                                        history.push('/addAccount');
                                    }}>
                                    ????????????
                                </button>
                            </div>
                        </div>
                    </Modal> : null}
                </div>
            </section>
            <section className="login-options">
                <div>
                    {<a onClick={()=> {
                        ADSManager.collectClickedAddAcount();
                        history.push('/addAccount');
                    }}>????????? ????????? ????????????</a>}
                    <a onClick={()=> { history.push('/findAccount') }}>????????? ?????? ????????????</a>
                </div>
            </section>
        </main>
     );
 } export default WrapLoginedComponent(LoginComponent);
