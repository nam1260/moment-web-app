
import "./mypage.css";
import "../popup/modalPopup.css";
import React, { useEffect,useState, useRef, Component} from "react";
import { useHistory } from 'react-router'; 
import { Modal } from "../popup/ModalPopup";
import MypageHeader from './MypageHeader';
import {WrapLoginedComponent} from "../../shared/component/common/WrapLoginedComponent";
import {Redirect} from 'react-router-dom'
import AWSManager from "../../managers/AWSManager.js";
import StorageManager from "../../managers/StorageManager";
const notFoundPath = "/assets/icons/icoFace3B.png"

const regBodyStatus = {
    INIT: 0,
    NOT_YET: 1,
    IN_PROGRESS:2,
}

const MODAL_TYPE = {
    INIT: 0,
    BUTTON: 1,
    INPUT:2,
    NOTI:3,
}

function StarRegisterHistory({isLogined}) {
    const history = useHistory();
    const [bodyStatus, setBodyStatus] = useState(regBodyStatus.INIT);
    const [starRegInfo, setStarRegInfo] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(MODAL_TYPE.INIT);
    const textareaElement = useRef();

    const NotFoundComponent = () => {
        console.log('NotFoundComponent');
        return (
            <div className="emptyMessage">
                <img alt="none" src={notFoundPath} />
                <p>아직 스타등록을 하지 않았습니다.</p>
            </div>
        )
    };
    const getButtons = (state)=> {
        let buttonCancel = (
            <button className="normal" onClick={()=>{
                    console.log('buttonCancel');
                    setModalType(MODAL_TYPE.BUTTON);
                    setShowModal(true);
                }
            }> 취소</button>);
        let buttonReply = (
            <button className="highlight"
                onClick={()=>{
                    console.log('buttonReply');
                    setModalType(MODAL_TYPE.INPUT);
                    setShowModal(true);
                }
            }> 답변입력</button>);
        let buttonReject = (
            <button className="full"
                onClick={()=>{
                    console.log('buttonReject');
                    setModalType(MODAL_TYPE.NOTI);
                    setShowModal(true);
                }
            }> 사유 확인</button>);
        let buttonAccept = (
            <button className="full"
                onClick={()=>{
                    console.log('buttonReject');
                    history.push('starProfile');
                }
            }> 스타 프로필 확인하기</button>);
        let buttons = [
            [buttonCancel, buttonReply], 
            [buttonReject], 
            [buttonAccept] 
        ]
        return (
            buttons[state].map(button => (
                button
            ))
        );

    };
    const stateString = [
        "요청 확인중",
        "거절",
        "등록 완료",
    ];
    const FoundComponent = () => {
        console.log('FoundComponent');
        return (
            <div className="message">
                {
                    <div>
                        <div className="border">
                        </div>
                        <span className="id">
                            #{String(starRegInfo.applyingNum).padStart(7, 0)}
                        </span>
                        <span className="title">
                            {StorageManager.loadUserInfo().userNickNm}
                        </span>
                        <span className="description">
                            {starRegInfo.userId}
                        </span>
                        <span className="info">
                            등록일
                            <b>{new Date(starRegInfo.regDate).toLocaleDateString()}</b>
                        </span>
                        <span className="info">
                            상태
                            <b className="highlight">{stateString[starRegInfo.starRegStatus]}</b>
                        </span>
                        <div className="messageButton">
                            {getButtons(starRegInfo.starRegStatus)}
                        </div>
                    </div>
                }
            </div>
        )
    };

    const buttomModalComponent = () => {
        console.log('buttomModalComponent');
        return (
            <div className="button_modal_short">
                <div className="info_container">
                    <br/>
                    <span className="title">스타 등록 신청을</span>
                    <span className="title">취소하시겠습니까?</span>
                </div>
                <div className="button_container">
                    <button className="left_button" onClick={()=>{
                            setShowModal(false);
                        }}>
                        아니요
                    </button>
                    <button className="right_button" onClick={()=>{
                            let userId = StorageManager.loadUserInfo() ? StorageManager.loadUserInfo().userId : "";
                            AWSManager.cnclRgstStar({
                                userId,
                            }).then((result) =>{
                                console.log("cnclRgstStar = " , result);
                            });
                            setShowModal(false);
                        }}>
                        예
                    </button>
                </div>
            </div>
        )
    };
    const inputModalComponent = () => {
        console.log('buttomModalComponent');
        return (
            <div className="button_modal_input">
                <div className="info_container">
                    <br/>
                    <span className="title">DM으로 받은 답변을 입력해주세요.</span>
                    <div className="write-wrapper">
                            <textarea 
                                onChange={(e) => {
                                    const { name, value } = e.target;
                                    const nextInputs = {
                                        ...starRegInfo,  
                                        [name]: value,
                                    };
                                    setStarRegInfo(nextInputs)}}
                                value={starRegInfo.userComment}
                                ref={textareaElement} 
                                name="userComment"
                            ></textarea>
                        </div>
                </div>
                <div className="button_container">
                    <button className="left_button" onClick={()=>{
                            setShowModal(false);
                        }}>
                        취소
                    </button>
                    <button className="right_button" onClick={()=>{
                            AWSManager.updateRgstStarStatus(starRegInfo).then((result) =>{
                                console.log("cnclRgstStar = " , result);
                            });
                            setShowModal(false);
                        }}>
                        보내기
                    </button>
                </div>
            </div>
        )
    };
    const notiModalComponent = () => {
        console.log('buttomModalComponent');
        return (
            <div className="button_modal_noti">
                <div className="info_container">
                    <br/>
                    <span className="title">거절 사유:</span>
                    <span className="title">{starRegInfo.adminComment}</span>
                    <span className="description">문의는 아래 이메일을 참조해 주세요.</span>
                    <span className="description">mtm.moment@gmail.com</span>
                </div>
                <div className="button_container">
                    <button className="center_button" onClick={()=>{
                            setShowModal(false);
                        }}>
                        확인
                    </button>
                </div>
            </div>
        )
    };

    useEffect(() =>{
        let userId = StorageManager.loadUserInfo() ? StorageManager.loadUserInfo().userId : "";
        AWSManager.getRgstStarStatus({
            userId: userId,
        }).then((result) =>{
            console.log("getRgstStarStatus = " , result);
            if(result && result.status === 200 && result.data && result.data.length > 0) {
                console.log("starRegStatus.IN_PROGRESS");
                setStarRegInfo(result.data[0]);
                setBodyStatus(regBodyStatus.IN_PROGRESS);
            } else {
                console.log("starRegStatus.NOT_YET");
                setBodyStatus(regBodyStatus.NOT_YET);
            }
        });
    },[]);
    return (
        !isLogined ? <Redirect to="/login"/> :
        <main>
            <MypageHeader index={4}/>
            <section className="mypage-header">
                <div className="container">
                    <span>스타 등록 현황</span>
                </div>
            </section>
            <section className="mypage-container">
                <div className="messageList">
                    {
                        {
                            [regBodyStatus.INIT] :   <></>,
                            [regBodyStatus.NOT_YET] : <NotFoundComponent />,
                            [regBodyStatus.IN_PROGRESS] : <FoundComponent />
                        }[bodyStatus]   
                    }
                    {showModal ?
                    <Modal setShowModal={setShowModal}>
                        {
                            {
                                [MODAL_TYPE.INIT] :   <></>,
                                [MODAL_TYPE.BUTTON] : buttomModalComponent(),
                                [MODAL_TYPE.INPUT] : inputModalComponent(),
                                [MODAL_TYPE.NOTI] : notiModalComponent(),
                            }[modalType]
                        }
                    </Modal> : null}
                </div>
                <div>
                    <span class="loadingGuide">
                        {/* 하단 목록 스크롤 시 자동 로딩 */}
                    </span>
                </div>
            </section>
            <section className="mypage-options">
                <div>
                </div>
            </section>
        </main>
     );
 } export default WrapLoginedComponent(StarRegisterHistory)
 