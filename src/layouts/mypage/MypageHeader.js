
import "./mypageHeader.css";
import React from 'react';
import { useHistory } from 'react-router';
import '../../Common.css';

function MypageHeader( { index } ) {
    const history = useHistory();
    return (
        
        <div className="mypage-Header show">
        {/* <div className={`mypage-Header ${isOpen ? 'show' : 'hide'}`}> */}
            <div className="navigation-bar">
                <div className={`${index==0 ? 'selected' : 'unselected'}`} onClick={() => history.push('confirmPw')}>
                    회원 정보 수정
                </div>
                <div className={`${index==1 ? 'selected' : 'unselected'}`}onClick={() => history.push('sendMessageHistory')}>
                    보낸 사연 관리
                </div>
                <div className={`${index==2 ? 'selected' : 'unselected'}`}onClick={() => history.push('receiveMessageHistory')}>
                    받은 사연 관리
                </div>
                <div className={`${index==3 ? 'selected' : 'unselected'}`}onClick={() => history.push('starRegister')}>
                    스타 등록 신청
                </div>
                <div className={`${index==4 ? 'selected' : 'unselected'}`} onClick={() => history.push('starRegisterHistory')}>
                    스타 등록현황
                </div>
                <div className={`${index==5 ? 'selected' : 'unselected'}`} onClick={() => history.push('starProfile')}>
                    스타 프로필 관리 
                </div>
                
            </div>
        </div>
    )
}


export default MypageHeader;