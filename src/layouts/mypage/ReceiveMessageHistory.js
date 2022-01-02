
import "./mypage.css";
import "../popup/modalPopup.css";
import React, { useState, useEffect, useRef, Component} from "react";
import { useHistory } from 'react-router'; 
import { Modal } from "../popup/ModalPopup";
import MypageHeader from './MypageHeader';
import {WrapLoginedComponent} from "../../shared/component/common/WrapLoginedComponent";
import {Redirect} from 'react-router-dom'
import AWSManager from "../../managers/AWSManager.js";
import StorageManager from "../../managers/StorageManager";

const notFoundPath = "/assets/icons/icoFace3B.png"
const listStatus = {
    INIT: 1,
    NOT_FOUND:2,
    FOUND:3
}
const MODAL_TYPE = {
    INIT: 0,
    DETAIL:3,
    UPLOAD1:4,
    UPLOAD2:5,
}


function ReceiveMessageHistory({isLogined}) {
    // message state 
    // 0 : 확인중 / 수신대기
    // 1 : 수락됨 / 수락함
    // 2 : 거절됨 / 거절함
    // 3 : 배송완료
    const stateString = [
        ["확인중", "수신대기"],
        ["수락됨", "수락함"],
        ["거절됨", "거절함"],
        ["배송완료", "배송완료"],
    ];
    const IDX_SENDDER = 0;
    const IDX_RECEIVER = 1;

    const [messageList, setMessageList] = useState([]);
    const [listhBodyStatus, setListBodyStatus] = useState(listStatus.INIT);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(MODAL_TYPE.INIT);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const detailModalComponent = () => {
        return (
            <div className="button_modal_detail">
                <div className="info_container">
                    <br/>
                    <div>
                        <span className="id">
                            #{String(selectedMessage.msgId).padStart(7, 0)}
                        </span>
                        <span className="title">
                            {selectedMessage.msgTitle}
                        </span>
                        <span className="description">
                            {selectedMessage.msgContents}
                        </span>
                        <div className="border">
                        </div>
                        <span className="info">
                            발신자
                            <b>{selectedMessage.userId}</b>
                        </span>
                        <span className="info">
                            작성일
                            <b>{new Date(selectedMessage.regDate).toLocaleDateString()}</b>
                        </span>
                        <span className="info">
                            수신일
                            <b>{selectedMessage.deliveryDate.substring(0,4) + '. ' + selectedMessage.deliveryDate.substring(4, 6)  + '. ' + selectedMessage.deliveryDate.substring(6,8) + '.'}</b>
                        </span>
                    </div>
                </div>
                <div className="button_container">
                    <button className="left_button" onClick={()=>{
                            setShowModal(false);
                        }}>
                        거절
                    </button>
                    <button className="right_button" onClick={()=>{
                            setShowModal(false);
                        }}>
                        수락
                    </button>
                </div>
            </div>
        )
    };
    const getButtons = (state, message)=> {
        let buttonDetail = (
        <button className="normal" onClick={()=>{
                console.log('buttonDetail');
                setModalType(MODAL_TYPE.DETAIL);
                setSelectedMessage(message);
                setShowModal(true);
            }
        }> 자세히 보기</button>);
        let buttonDetailFull = (
        <button className="full"
            onClick={()=>{
                console.log('buttonDetailFull');
                setModalType(MODAL_TYPE.DETAIL);
                setSelectedMessage(message);
                setShowModal(true);
            }
        }> 자세히 보기
        </button>);
        let buttonDetailThird = (
        <button className="third"
            onClick={()=>{
                console.log('buttonDetailThird');
                setModalType(MODAL_TYPE.DETAIL);
                setSelectedMessage(message);
                setShowModal(true);
            }
        }> 자세히 보기
        </button>);
        let buttonRefuseThird = (
        <button className="third"
            onClick={()=>{
                console.log('buttonRefuseThird');
                setSelectedMessage(message);
            }
        }> 거절
        </button>
        );
        let buttonAcceptThird = (
        <button className="fill third" onClick={()=>{
                console.log('buttonAcceptThird');
                setSelectedMessage(message);
            }
        }> 수락</button>);
        let buttonUploadVideo = (
        <button className="highlight"
            onClick={()=>{
                console.log('buttonUploadVideo');
                setModalType(MODAL_TYPE.UPLOAD1);
                setSelectedMessage(message);
                setShowModal(true);
            }
        }>영상 업로드</button>);
        let buttons = [
            [buttonDetailThird, buttonRefuseThird, buttonAcceptThird], // 수신대기  : 자세히 보기, 거절, 수락 
            [buttonDetail, buttonUploadVideo], // 수락함 : 자세히 보기, 영상 업로드 
            [buttonDetailFull], // 거절함 : 자세히 보기
            [buttonDetailFull] // 배송완료 : 자세히 보기
        ]
        return (
            buttons[state].map(button => (
                button
            ))
        );

    };

    const NotFoundComponent = () => {
        return (
            <div className="emptyMessage">
                <img alt="none" src={notFoundPath} />
                <p>받은 사연이 없습니다.</p>
            </div>
        )
    }
    const FoundComponent = () => {
        return (
            <div className="message">
                {
                    messageList.map((message) => {
                        return (
                            <div>
                                <div className="border">
                                </div>
                                <span className="id">
                                    #{String(message.msgId).padStart(7, 0)}
                                </span>
                                <span className="title">
                                    {message.msgTitle}
                                </span>
                                <span className="description">
                                    {message.msgContents}
                                </span>
                                <span className="info">
                                    발신자
                                    <b>{message.userId}</b>
                                </span>
                                <span className="info">
                                    작성일
                                    <b>{new Date(message.regDate).toLocaleDateString()}</b>
                                </span>
                                <span className="info">
                                    수신일
                                    <b>{message.deliveryDate.substring(0,4) + '. ' + message.deliveryDate.substring(4, 6)  + '. ' + message.deliveryDate.substring(6,8) + '.'}</b>
                                </span>
                                <span className="info">
                                    상태
                                    <b className="highlight">{stateString[message.msgStatus][IDX_RECEIVER]}</b>
                                </span>
                                <div className="messageButton">
                                    {getButtons(message.msgStatus, message)}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    };

    useEffect(() =>{
        console.log("랜더링 시마다 호출");
        let userId = StorageManager.loadUserInfo() ? StorageManager.loadUserInfo().userId : "";
        AWSManager.getMsgList({
            userId: userId,
            type: "star",
        }).then((result) =>{
            console.log("getMsgList = " , result);
            if(result && result.status === 200 && result.data && result.data.length > 0) {
                setListBodyStatus(listStatus.FOUND);
                result.data[1] = {
                    deliveryDate: "20211222",
                    msgContents: "떡상가즈아",
                    msgId: 3,
                    msgStatus: "0",
                    regDate: "2021-12-22 11:11:11",
                    starId: "222",
                    userId: "nam1260@gmail.com",
                    msgTitle: "test123"
                };
                console.log("getMsgList = " , result);
                setMessageList(result.data);
            } else {
                setListBodyStatus(listStatus.NOT_FOUND);
            }
        });
    },[]);

    return (
        !isLogined? <Redirect to="/login"/> :
        <main>
            <MypageHeader index={2}/>
            <section className="mypage-header">
                <div className="container">
                    <span>받은 사연 관리</span>
                </div>
            </section>
            <section className="mypage-container">
                <div className="messageList">
                    {
                        {
                            [listStatus.INIT] : <></>,
                            [listStatus.NOT_FOUND] : <NotFoundComponent />,
                            [listStatus.FOUND] : <FoundComponent />
                        }[listhBodyStatus]   
                    }
                    {showModal ?
                    <Modal setShowModal={setShowModal}>
                        {
                            {
                                [MODAL_TYPE.INIT] :   <></>,
                                [MODAL_TYPE.DETAIL] : detailModalComponent(),
                                [MODAL_TYPE.UPLOAD1] : detailModalComponent(),
                                [MODAL_TYPE.UPLOAD2] : detailModalComponent(),
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
 }export default WrapLoginedComponent(ReceiveMessageHistory);
 