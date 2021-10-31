
import "./mypage.css";
import "../popup/modalPopup.css";
import React, { useState, useRef, Component} from "react";
import { useHistory } from 'react-router'; 
import { Modal } from "../popup/ModalPopup";
import MypageHeader from './MypageHeader';

const failPath = '/assets/icons/ico-face-3-b.png'

export default function SendMessageHistory() {
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

    const messageList = [
        {
            id: 32520,
            title: "이건 못참지~",
            description: "안녕하세요 소왕님, 이번에 제가 사연을 보내게 되어 감사합니다.",
            sender : "소왕팬",
            receiver : "소왕",
            createDate : 1635499262507,
            receivedDate : 1635699262507,
            state : 0,
        },
        {
            id: 32414,
            title: "저 졸업해요. 축하해주세요!",
            description: "안녕하세요 소왕님, 이번에 제가 사연을 보내게 되어 감사합니다.",
            sender : "김인기 찐팬",
            receiver : "소왕",
            createDate : 1635498262507,
            receivedDate : 1635699962507,
            state : 1,
        },
        {
            id: 32212,
            title: "카페창업 영상 부탁해요~",
            description: "안녕하세요 소왕님, 이번에 제가 사연을 보내게 되어 감사합니다.",
            sender : "카페왕",
            receiver : "소왕",
            createDate : 1635498262507,
            receivedDate : 1635699962507,
            state : 2,
        },
        {
            id: 32176,
            title: "결혼 축사 부탁합니다.",
            description: "안녕하세요 소왕님, 이번에 제가 사연을 보내게 되어 감사합니다.",
            sender : "카페왕",
            receiver : "소왕",
            createDate : 1635498262507,
            receivedDate : 1635699962507,
            state : 3,
        },
    ];

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

    return (

        <main>
            <MypageHeader index={1}/>
            <section className="mypage-header">
                <div className="container">
                    <span>보낸 사연 관리</span>
                </div>
            </section>
            <section className="mypage-container">
                <div className="messageList">
                    {messageList.map(message => (
                        <div>
                            <div className="border">
                            </div>
                            <span className="id">
                                #{String(message.id).padStart(7, 0)}
                            </span>
                            <span className="title">
                                {message.title}
                            </span>
                            <span className="description">
                                {message.description}
                            </span>
                            <span className="info">
                                수신자
                                <b>{message.sender}</b>
                            </span>
                            <span className="info">
                                작성일
                                <b>{new Date(message.createDate).toLocaleDateString()}</b>
                            </span>
                            <span className="info">
                                희망배송일
                                <b>{new Date(message.receivedDate).toLocaleDateString()}</b>
                            </span>
                            <span className="info">
                                상태
                                <b className="highlight">{stateString[message.state][IDX_SENDDER]}</b>
                            </span>
                            <div className="messageButton">
                                {getButtons(message.state)}
                            </div>
                        </div>
                    ))}
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
 }
 