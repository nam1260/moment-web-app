import "./sidemenu.css";
import { useHistory } from "react-router";
import StorageManager from "../../managers/StorageManager.js";

const closeIcon = "/assets/icons/ico-close.png";
const nextIcon = "/assets/icons/icoNext.png";
const logoPath = '/assets/images/menu-logo.png'

/* 
  * 사이드 메뉴 바
  - 로그인 전, 로그인 후 분기 (필)
  - 반응형 확인
  - 라우터 이벤트 적용
*/
export default function SideMenu({ isOpen, setIsMenuOpen }) {
    const history = useHistory();
    const movePage = (path) => {
        setIsMenuOpen(false);
        history.push(path);
    }
    return (
        <div className={`side-menu ${isOpen && 'open'}`}>
            <div className="close-icon-box">
                <img alt="none" src={closeIcon} onClick={() => setIsMenuOpen(false)} />
            </div>
            <div className="side-menu-title">
                <span>
                    모먼트는<br />처음이신가요?
                </span>
            </div>
            <span className="now-start-comment">지금 시작해 보세요 <img alt="none" src={nextIcon} /> </span>
            <ul className="menu-list">
                <li onClick={() => {
                    let userInfo = StorageManager.loadUserInfo();
                    if(userInfo && userInfo.token) {
                        StorageManager.removeUserInfo();
                        setIsMenuOpen(false);
                        movePage('/');
                    } else {
                        movePage('/login');
                    }
                }} >로그인하기</li>
                <li onClick={() => movePage('/guide/moment/1')} >모먼트 소개</li>
                <li onClick={() => movePage('/guide/user')} >서비스 이용가이드</li>
                <li onClick={() => movePage('/guide/moment/2')} >자주 묻는 질문</li>
            </ul>
            <img alt="none" className="side-menu-logo" src={logoPath} />
        </div>
    )
}

