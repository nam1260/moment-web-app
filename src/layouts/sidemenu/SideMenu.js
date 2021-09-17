import { useEffect, useLayoutEffect, useRef } from "react";
import "./sidemenu.css";

const closeIcon = "/assets/icons/ico-close.png";
const nextIcon = "/assets/icons/icoNext.png";
const logoPath = 'assets/images/yhlee/menu-logo.png'

/* 
  * 사이드 메뉴 바
  - 로그인 전, 로그인 후 분기 (필)
  - 반응형 확인
  - 라우터 이벤트 적용
*/
export default function SideMenu({ isOpen, setIsMenuOpen }) {
    return (
        <div className={`side-menu ${isOpen && 'open'}`}>
            <div className="close-icon-box">
                <img src={closeIcon} onClick={() => setIsMenuOpen(false)} />
            </div>
            <div className="side-menu-title">
                <span>
                    모먼트는<br />처음이신가요?
                </span>
            </div>
            <span className="now-start-comment">지금 시작해 보세요 <img src={nextIcon} /> </span>
            <ul className="menu-list">
                <li>로그인하기</li>
                <li>모먼트 소개</li>
                <li>서비스 이용가이드</li>
                <li>자주 묻는 질문</li>
            </ul>
            <img className="side-menu-logo" src={logoPath} />
        </div>
    )
}

