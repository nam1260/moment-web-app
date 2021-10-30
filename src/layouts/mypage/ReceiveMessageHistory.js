
import "./mypage.css";
import "../popup/modalPopup.css";
import React, { useState, useRef, Component} from "react";
import { useHistory } from 'react-router'; 
import { Modal } from "../popup/ModalPopup";
import MypageHeader from './MypageHeader';

const failPath = '/assets/icons/ico-face-3-b.png'

export default function ReceiveMessageHistory() {
    // message state 
    // 0 : 확인중 / 수신대기
    // 1 : 수락됨 / 수락함
    // 2 : 거절됨 / 거절함
    // 3 : 배송완료
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
            id: 32414,
            title: "저 졸업해요. 축하해주세요!",
            description: "안녕하세요 소왕님, 이번에 제가 사연을 보내게 되어 감사합니다.",
            sender : "김인기 찐팬",
            receiver : "소왕",
            createDate : 1635498262507,
            receivedDate : 1635699962507,
            state : 1,
        },
    ];

    const [showModal, setShowModal] = useState(false);

    return (

        <main>
            <MypageHeader index={2}/>
            <section className="mypage-header">
                <div className="container">
                    <span>받은 사연 관리</span>
                </div>
            </section>
        </main>
     );
 }
 