
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

function StarRegisterHistory({isLogined}) {
    const history = useHistory();
    const [bodyStatus, setBodyStatus] = useState(regBodyStatus.INIT);
    const [starRegInfo, setStarRegInfo] = useState({});

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
                    let userId = StorageManager.loadUserInfo() ? StorageManager.loadUserInfo().userId : "";
                    AWSManager.cnclRgstStar({
                        userId,
                    }).then((result) =>{
                        console.log("cnclRgstStar = " , result);
                    });
                }
            }> 취소</button>);
        let buttonReply = (
            <button className="highlight"
                onClick={()=>{
                    console.log('buttonReply');
                }
            }> 답변입력</button>);
        let buttonReject = (
            <button className="full"
                onClick={()=>{
                    console.log('buttonReject');
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
        return (
            <div className="message">
                {
                    <div>
                        <div className="border">
                        </div>
                        <span className="id">
                            {starRegInfo.applyingNum}
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
 