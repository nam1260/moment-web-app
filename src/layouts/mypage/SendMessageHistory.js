
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
const linkThumPath = "/assets/images/thum-link.png"
const listStatus = {
    INIT: 1,
    NOT_FOUND:2,
    FOUND:3
}
const MODAL_TYPE = {
    INIT: 0,
    BUTTON: 1,
    BUTTONS: 2,
    DETAIL:3,
    VIDEO1:4,
    VIDEO2:5,
}

function SendMessageHistory({isLogined}) {
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

    const MSG_STATE_BRFORE = "0";
    const MSG_STATE_ACCEPTED = "1";
    const MSG_STATE_CANCELED = "2";
    const MSG_STATE_COMPLETED = "3";
    const MSG_STATE_DELETED = "4";
    
    const [messageList, setMessageList] = useState([]);
    const [listhBodyStatus, setListBodyStatus] = useState(listStatus.INIT);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(MODAL_TYPE.INIT);
    const [selectedMessage, setSelectedMessage] = useState(null);

    const buttonModalComponent = () => {
        return (
            <div className="button_modal_short">
                <div className="info_container">
                    <br/>
                    <span className="title">사연 전달이</span>
                    <span className="title">취소되었습니다.</span>
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
    const buttonsModalComponent = () => {
        return (
            <div className="button_modal_short">
                <div className="info_container">
                    <br/>
                    <span className="title">사연 전달을</span>
                    <span className="title">취소하시겠습니까?</span>
                </div>
                <div className="button_container">
                    <button className="left_button" onClick={()=>{
                            setShowModal(false);
                        }}>
                        아니요
                    </button>
                    <button className="right_button" onClick={()=>{
                            deleteMessage();
                            setModalType(MODAL_TYPE.BUTTON);
                        }}>
                        예
                    </button>
                </div>
            </div>
        )
    };

    const getButtonsForDetails = (state)=> {

        let buttonExit = (
            <button className="left_button" onClick={()=>{
                setShowModal(false);
            }}>닫기</button>);
        let buttonDelete = (
            <button className="right_button" onClick={()=>{
                deleteMessage();
                setModalType(MODAL_TYPE.BUTTON);
            }}>전달취소</button>);
        let buttonLink = (
            <button className="right_button" onClick={()=>{
                setModalType(MODAL_TYPE.VIDEO1);
                setShowModal(true);
            }}>영상확인</button>);
        let buttons = [
            [buttonExit, buttonDelete], // 확인중 : 자세히 보기, 전달취소
            [], // 수락됨 : 자세히 보기
            [], // 거절됨 
            [buttonExit, buttonLink] // 배송완료 
        ]
        return (
            buttons[state].map(button => (
                button
            ))
        );
    };
    const detailModalComponent = () => {
        console.log('detailModalComponent selectedMessage = ' , selectedMessage);
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
                            수신자
                            <b>{selectedMessage.starId}</b>
                        </span>
                        <span className="info">
                            작성일
                            <b>{new Date(selectedMessage.regDate).toLocaleDateString()}</b>
                        </span>
                        <span className="info">
                            희망배송일
                            <b>{selectedMessage.deliveryDate.substring(0,4) + '. ' + selectedMessage.deliveryDate.substring(4, 6)  + '. ' + selectedMessage.deliveryDate.substring(6,8) + '.'}</b>
                        </span>
                    </div>
                </div>
                <div className="button_container">
                    {getButtonsForDetails(selectedMessage.msgStatus)}
                </div>
            </div>
        )
    };
    const videoLinkModalComponent = () => {
        console.log('detailModalComponent selectedMessage = ' , selectedMessage);
        const link = selectedMessage.mediaLinkUrl ? selectedMessage.mediaLinkUrl : 'https://youtu.be/0vvCe4EHtus';
        const comment = selectedMessage.msgComment ? selectedMessage.msgComment : '정말 축하드립니다!';
        return (
            <div className="button_modal_link">
                <div className="info_container">
                    <img alt="none" src={linkThumPath}/>
                    <br/>
                    <span className="title">{comment}</span>
                    <span className="guide">영상링크를 확인해 주세요</span>
                    <a href={link}>{link}</a>
                </div>
                <div className="button_container">
                    <button className="center_button" onClick={()=>{
                            setShowModal(false);
                        }}>
                        닫기
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
        }>자세히 보기</button>);
        let buttonDetailFull = (
        <button className="full" onClick={()=>{
                console.log('buttonDetailFull');
                setModalType(MODAL_TYPE.DETAIL);
                setSelectedMessage(message);
                setShowModal(true);
            }
        }>자세히 보기</button>);
        let buttonCancel = (
        <button className="normal" onClick={()=>{
                console.log('buttonCancel');
                setModalType(MODAL_TYPE.BUTTONS);
                setSelectedMessage(message);
                setShowModal(true);
            }
        }>전달취소</button>
        );
        let buttonViewVideo = (
        <button className="highlight" onClick={()=>{
                console.log('buttonViewVideo');
                setModalType(MODAL_TYPE.VIDEO1);
                setSelectedMessage(message);
                setShowModal(true);
            }
        }>영상확인</button>
        );
        let buttons = [
            [buttonDetail, buttonCancel], // 확인중 : 자세히 보기, 전달취소
            [buttonDetailFull], // 수락됨 : 자세히 보기
            [buttonDetailFull], // 거절됨 : 자세히 보기
            [buttonDetail, buttonViewVideo] // 배송완료 : 자세히 보기, 영상확인
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
                <p>작성된 사연이 없습니다.</p>
            </div>
        )
    };
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
                                    수신자
                                    <b>{message.userId}</b>
                                </span>
                                <span className="info">
                                    작성일
                                    <b>{new Date(message.regDate).toLocaleDateString()}</b>
                                </span>
                                <span className="info">
                                    희망배송일
                                    <b>{message.deliveryDate.substring(0,4) + '. ' + message.deliveryDate.substring(4, 6)  + '. ' + message.deliveryDate.substring(6,8) + '.'}</b>
                                </span>
                                <span className="info">
                                    상태
                                    <b className="highlight">{stateString[message.msgStatus][IDX_SENDDER]}</b>
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

    const deleteMessage =() => {
        console.log('deleteMessage selectedMessage = ' , selectedMessage);
        AWSManager.deleteMsgInfo({
            userId : selectedMessage.userId,
            msgId : selectedMessage.msgId,
        }).then((result)=>{
            selectedMessage.msgStatus = MSG_STATE_DELETED;
            console.log(result);
        });
    };

    useEffect(() =>{
        console.log("랜더링 시마다 호출");
        let userId = StorageManager.loadUserInfo() ? StorageManager.loadUserInfo().userId : "";
        AWSManager.getMsgList({
            userId: userId,
            type: "user",
        }).then((result) =>{
            console.log("getMsgList = " , result);
            if(result && result.status === 200 && result.data && result.data.length > 0) {
                setListBodyStatus(listStatus.FOUND);
                setMessageList(result.data);
            } else {
                setListBodyStatus(listStatus.NOT_FOUND);
            }
        });
    },[]);

    return (
        !isLogined ? <Redirect to="/login"/> :
        <main>
            <MypageHeader index={1}/>
            <section className="mypage-header">
                <div className="container">
                    <span>보낸 사연 관리</span>
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
                                [MODAL_TYPE.BUTTON] : buttonModalComponent(),
                                [MODAL_TYPE.BUTTONS] : buttonsModalComponent(),
                                [MODAL_TYPE.DETAIL] : detailModalComponent(),
                                [MODAL_TYPE.VIDEO1] : videoLinkModalComponent(),
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
 } export default WrapLoginedComponent(SendMessageHistory)
 