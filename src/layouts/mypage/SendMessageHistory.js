
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
    
    const [messageList, setMessageList] = useState([]);
    const [listhBodyStatus, setListBodyStatus] = useState(listStatus.INIT);
    const [showModal, setShowModal] = useState(false);

    const getButtons = (state)=> {
        let buttonDetail = (
        <button className="normal" onClick={()=>{
                console.log('buttonDetail');
            }
        }>자세히 보기</button>);
        let buttonDetailFull = (
        <button className="full" onClick={()=>{
                console.log('buttonDetailFull');
            }
        }>자세히 보기</button>);
        let buttonCancel = (
        <button className="normal" onClick={()=>{
                console.log('buttonCancel');
            }
        }>전달취소</button>
        );
        let buttonViewVideo = (
        <button className="highlight" onClick={()=>{
                console.log('buttonViewVideo');
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
                                    {message.title}
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
                                    {getButtons(message.msgStatus)}
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
 