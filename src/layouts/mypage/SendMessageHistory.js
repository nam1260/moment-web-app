
import "./mypage.css";
import "../popup/modalPopup.css";
import React, { useState, useEffect, useRef, Component, useCallback, useMemo} from "react";
import { useHistory } from 'react-router'; 
import { Modal } from "../popup/ModalPopup";
import MypageHeader from './MypageHeader';
import {WrapLoginedComponent} from "../../shared/component/common/WrapLoginedComponent";
import {Redirect} from 'react-router-dom'
import AWSManager from "../../managers/AWSManager.js";
import StorageManager from "../../managers/StorageManager";

const notFoundPath = "/assets/icons/icoFace3B.png"
const linkThumPath = "/assets/images/thumb-link.jpg"
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
    PAYMENT:6,
}

const MSG_STATE_BRFORE = "0";
const MSG_STATE_ACCEPTED = "1";
const MSG_STATE_REJECTED = "2";
const MSG_STATE_COMPLETED = "3";
const MSG_STATE_CANCELED = "4";

const MSG_STATE_PAYMENT_WAITING = "90";
const MSG_STATE_PAYMENT_COMPLETE = "91";
const MSG_STATE_PAYMENT_CANCEL = "92";

const MSG_STATE_VIDEO_CONFIRMING = "80";
const MSG_STATE_VIDEO_REJECT = "81";

const PAYMENT_INFO_TYPE_WITHOUTBANKBOOK = 0;
const PAYMENT_INFO_TYPE_TOSSPAY = 1;
const PAYMENT_INFO_TYPE_NAVERPAY = 2;
const PAYMENT_INFO_TYPE_KAKAOPAY = 3;

function SendMessageHistory({isLogined}) {
    const stateString = {
        [MSG_STATE_BRFORE] : ["스타 확인중", "수신대기"],
        [MSG_STATE_ACCEPTED] : ["수락됨", "수락함"],
        [MSG_STATE_REJECTED] : ["거절됨", "거절함"],
        [MSG_STATE_COMPLETED] : ["배송완료", "배송완료"],
        [MSG_STATE_CANCELED] : ["취소함", ""],

        [MSG_STATE_PAYMENT_WAITING] : ["결제대기", ""],
        [MSG_STATE_PAYMENT_COMPLETE] : ["결제완료(사연검증중)", ""],
        [MSG_STATE_PAYMENT_CANCEL] : ["결제취소", ""],

        [MSG_STATE_VIDEO_CONFIRMING] : ["수락됨", "영상검증중"],
        [MSG_STATE_VIDEO_REJECT] : ["수락됨", "영상부적절"],
    };
    const IDX_SENDDER = 0;
    const IDX_RECEIVER = 1;

    
    const [messageList, setMessageList] = useState([]);
    const [listhBodyStatus, setListBodyStatus] = useState(listStatus.INIT);
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState(MODAL_TYPE.INIT);
    const [selectedMessage, setSelectedMessage] = useState({});
    const [paymentInfo, setPaymentInfo] = useState({});
    const [buttonType, setButtonType] = useState(MSG_STATE_CANCELED);

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
                            updateMessage(MSG_STATE_CANCELED);
                            setModalType(MODAL_TYPE.BUTTON);
                        }}>
                        예
                    </button>
                </div>
            </div>
        )
    };

    const getButtonsForDetails = (state)=> {
        let buttonExitFull = (
            <button className="center_button" onClick={()=>{
                setShowModal(false);
            }}>닫기</button>);
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
        let buttons = {
            [MSG_STATE_BRFORE] : [buttonExit, buttonDelete], // 확인중 : 자세히 보기, 전달취소
            [MSG_STATE_ACCEPTED] : [buttonExitFull],
            [MSG_STATE_REJECTED] : [buttonExitFull],
            [MSG_STATE_COMPLETED] : [buttonExit, buttonLink], // 배송완료
            [MSG_STATE_CANCELED] : [buttonExitFull],

            [MSG_STATE_PAYMENT_WAITING] : [buttonExit, buttonDelete],
            [MSG_STATE_PAYMENT_COMPLETE] : [buttonExit, buttonDelete],
            [MSG_STATE_PAYMENT_CANCEL] : [buttonExitFull],

            [MSG_STATE_VIDEO_CONFIRMING] : [buttonExitFull],
            [MSG_STATE_VIDEO_REJECT] : [buttonExitFull],
        };
        return (
            buttons[state].map(button => (
                button
            ))
        );
    };
    const detailModalComponent = () => {
        console.log('detailModalComponent selectedMessage = ' , selectedMessage);
        return selectedMessage.msgId ? (
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
        ) : null
    };

    const paymentTypeInfo = ()=>{
        let cardName = (
            <span className="info">
            카드이름
            <b>{paymentInfo.cardNm}</b>
            </span>);
            
        let cardNumber = (
            <span className="info">
                카드번호
                <b>{paymentInfo.cardNum}</b>
            </span>);

        let aprvNum = (
            <span className="info">
                카드 승인 번호
                <b>{paymentInfo.aprvNum}</b>
            </span>);

        let userBankNm = (
            <span className="info">
            입금자명
            <b>{paymentInfo.userBankNm}</b>
            </span>);
        let userAccountNm = (
        <span className="info">
            입금계좌명
            <b>{paymentInfo.userAccountNm}</b>
            </span>);
        let userAccountNum = (
            <span className="info">
            계좌번호
            <b>{paymentInfo.userAccountNum}</b>
            </span>);
        let payType = paymentInfo.payType ? paymentInfo.payType : PAYMENT_INFO_TYPE_WITHOUTBANKBOOK;
        let infos = {
            [PAYMENT_INFO_TYPE_WITHOUTBANKBOOK] : [userBankNm, userAccountNm, userAccountNum], 
            [PAYMENT_INFO_TYPE_TOSSPAY] : [cardName, cardNumber,aprvNum],
            [PAYMENT_INFO_TYPE_NAVERPAY] : [cardName, cardNumber,aprvNum],
            [PAYMENT_INFO_TYPE_KAKAOPAY] : [cardName, cardNumber,aprvNum],
        };
        return (
            infos[payType].map(info => (
                info
            ))
        );

    };


    const convertPayType = useCallback((payType)=>{
        let result;
        switch (payType) {
            case "0":
                result = "무통장입금 / 계좌이체";
                break;
            case "1":
                result = "카드 결제(Toss PG)";
                break;
            case "2":
                result = "카카오페이";
                break;
            case "3":
                result = "네이버페이";
                break;
            default:
                break;

        }
        return result

    },[]);

    const convertPayStatus = useCallback((status)=>{
        let result;
        switch (status) {
            case "0":
                result = "결제 전(입금 전)";
                break;
            case "1":
                result = "결제 완료";
                break;
            case "2":
                result = "결제 취소";
                break;
            default:
                break;

        }
        return result

    },[]);

    const detailPaymentModalComponent = useCallback(() => {
        return (
            <div className="button_modal_detail">
                <div className="info_container">
                    <br/>
                    <div>
                        <span className="title_center">
                            결제 상세 내역
                        </span>
                        <div className="border">
                        </div>
                        <span className="info">
                            결제 일련 번호
                            <b>{paymentInfo.payNo}</b>
                        </span>
                        <span className="info">
                            보낸사람
                            <b>{paymentInfo.userId}</b>
                        </span>
                        <span className="info">
                            받는사람
                            <b>{paymentInfo.starId}</b>
                        </span>
                        <span className="info">
                            결제수단
                            <b>{convertPayType(paymentInfo.payType)}</b>
                        </span>
                        <span className="info">
                            결제금액
                            <b>{paymentInfo.price > 0 ? paymentInfo.price.toLocaleString('ko-KR') : 0}원</b>
                        </span>
                        <span className="info">
                            결제상태
                            <b>{convertPayStatus(paymentInfo.payStatus)}</b>
                        </span>
                        <span className="info">
                            주문번호
                            <b>{paymentInfo.orderId}</b>
                        </span>
                        {paymentTypeInfo()}
                        <span className="info">
                            연락 가능 번호
                            <b>{paymentInfo.emPhoneNum}</b>
                        </span>
                    </div>
                </div>
                <div className="button_container">
                    <button className="center_button" onClick={()=>{
                        setShowModal(false);
                    }}>닫기</button>);
                </div>
            </div>
        )
    },[paymentInfo]);
    const videoLinkModalComponent = () => {
        console.log('videoLinkModalComponent selectedMessage = ' , selectedMessage);
        const link = selectedMessage.mediaLinkUrl ? selectedMessage.mediaLinkUrl : 'https://youtu.be/0vvCe4EHtus';
        const comment = selectedMessage.msgComment ? selectedMessage.msgComment : '정말 축하드립니다!';
        return (
            <div className="button_modal_link">
                <div className="info_container">
                    <img alt="none" src={linkThumPath}/>
                    <br/>
                    <span className="title">{comment}</span>
                    <span className="guide">영상링크를 확인해 주세요</span>
                    <a href={link} target='_blank'>{link}</a>
                    <span className="subGuide">확인하신 영상이, 모먼트 이용약관 1조 2의 다 항에 해당하는 경우 고객센터(mtm.moment@gmail.com)</span>
                    <span className="subGuide">를 통해 환불 요청주시면 2영업일 이내에 검토 완료 후 회신드리겠습니다.</span>
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
        let buttons = {
            [MSG_STATE_BRFORE] : [buttonDetail, buttonCancel],
            [MSG_STATE_ACCEPTED] : [buttonDetailFull],
            [MSG_STATE_REJECTED] : [buttonDetailFull],
            [MSG_STATE_COMPLETED] : [buttonDetail, buttonViewVideo],
            [MSG_STATE_CANCELED] : [buttonDetailFull],

            [MSG_STATE_PAYMENT_WAITING] : [buttonDetail, buttonCancel],
            [MSG_STATE_PAYMENT_COMPLETE] : [buttonDetail, buttonCancel],
            [MSG_STATE_PAYMENT_CANCEL] : [buttonDetailFull],

            [MSG_STATE_VIDEO_CONFIRMING] : [buttonDetailFull],
            [MSG_STATE_VIDEO_REJECT] : [buttonDetailFull],
        };
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
                                <a className="payment" onClick={()=>{
                                        AWSManager.getPaymentList({
                                            key : "msgId",
                                            value : message.msgId.toString(),
                                        }).then((result)=>{
                                            console.log(result);
                                            setModalType(MODAL_TYPE.PAYMENT);
                                            setPaymentInfo(result.data[0]);
                                            setShowModal(true);
                                        }).catch((result)=>{
                                            alert("결제정보 조회에 실패했습니다.");
                                        });
                                    }}>
                                    결제정보
                                </a>
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

    const updateMessage =(state) => {
        if(state) {
            selectedMessage.msgStatus = state;
        }
        AWSManager.updateStarMsgInfo(
            selectedMessage
        ).then((result)=>{
            console.log(result);
        });
    };

    const deleteMessage =() => {
        console.log('deleteMessage selectedMessage = ' , selectedMessage);
        AWSManager.deleteMsgInfo({
            userId : selectedMessage.userId,
            msgId : selectedMessage.msgId,
        }).then((result)=>{
            selectedMessage.msgStatus = MSG_STATE_CANCELED;
            console.log(result);
        });
    };

    useEffect(() =>{
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
                                [MODAL_TYPE.PAYMENT] : detailPaymentModalComponent(),
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
 