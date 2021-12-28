
import "./mypage.css";
import React, { useState, useRef, Component} from "react";
import { useHistory } from 'react-router'; 
import AWSManager from "../../managers/AWSManager.js";
import StorageManager from "../../managers/StorageManager.js";
import { Modal } from "../popup/ModalPopup";
import EncryptionManager from "../../managers/EncryptionManager.js";
import {WrapLoginedComponent} from "../../shared/component/common/WrapLoginedComponent";
import {Redirect} from 'react-router-dom'

const failIcon = "assets/icons/icoFace3@3x.png"

function ConfirmPwComponent({ setIsMenuOpen, isLogined}) {


    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [inputs, setInputs] = useState({
        pw: '',
    });
    const {pw} = inputs
    const [isEnableButton, setIsEnableButton] = useState(false);


    const onChange = (e) => {
        const { name, value } = e.target;
        const nextInputs = {
            ...inputs,  
            [name]: value,
        };
        setInputs(nextInputs);
        if(pw.length > 1) setIsEnableButton(true);
        else setIsEnableButton(false);
    };
    const confirmPw = () => {
        let userInfo = StorageManager.loadUserInfo();
        let salt = StorageManager.loadSalt();
        console.log('userId = ' + userInfo.userId);
        EncryptionManager.makePassword(inputs.pw, salt).then((hashedPassword)=>{
            AWSManager.checkPasswordVerification({
                userId: userInfo.userId,
                userPw: hashedPassword,
            }).then((result)=> {
                if(result.status == 200 && result.data.isCorrectPw) {
                    console.log('비밀번호 검증 완료');
                    history.push('/modifyAccount');
                } else {
                    console.log('경고 팝업');
                    setShowModal(true);
                }
            }).catch(e => {
                console.error('fail = ' + e.message);
            });
        });
    };
 
    const onReset = () => {
        const resetInputs = {
            pw: '',
        }
        setInputs(resetInputs)
    };

    return (
        !isLogined? <Redirect to="/login"/> :
        <main>
            <section className="mypage-header">
                <div>
                    <span>회원 비밀번호 확인</span>
                </div>
            </section>
            <section className="mypage-container">
                <div>
                    <span>
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
                        </div>
                    </span>
                </div>
            </section> 
            <section className="mypage-button" >
                <div>
                    <button className="full-button" onClick={isEnableButton ? confirmPw : ()=>{console.log('입력값이 없음')}} className= {isEnableButton ? "enable" : "disable"}>
                        비밀번호 확인
                    </button>
                    {showModal ? 
                    <Modal setShowModal={setShowModal}> 
                        <div className="button_modal">
                            <div className="info_container">
                                <img alt="none" src={failIcon} />
                                <span className="title">일치하는 비밀번호가 틀립니다.</span>
                                <br/>
                                <span className="description">입력하신 비밀번호가 올바른지 </span>
                                <br/>
                                <span className="description">다시 확인해 주세요.</span>
                            </div>
                            <div className="button_container">
                                <button className="center_button" onClick={()=>{
                                        console.log("retry");
                                        setShowModal(false);
                                        onReset();
                                    }}>
                                    다시입력
                                </button>
                            </div>
                        </div>
                    </Modal> : null}
                </div>
            </section>
        </main>
     );
 }
export default WrapLoginedComponent(ConfirmPwComponent);