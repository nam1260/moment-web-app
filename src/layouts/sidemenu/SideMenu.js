import "./sidemenu.css";
import { useHistory } from "react-router";
import StorageManager from "../../managers/StorageManager.js";
import { WrapLoginedComponent } from "../../shared/component/common/WrapLoginedComponent";
import { useDispatch } from "react-redux";
import { removeUser } from "../../redux/user";
const closeIcon = "/assets/icons/ico-close.png";
const nextIcon = "/assets/icons/icoNext.png";
const logoPath = '/assets/images/menu-logo.png'

/* 
  * 사이드 메뉴 바
  - 로그인 전, 로그인 후 분기 (필)
  - 반응형 확인
  - 라우터 이벤트 적용
*/
function SideMenu({ isOpen, setIsMenuOpen, isLogined, userId, userNickNm }) {
    const history = useHistory();
    const dispatch = useDispatch();

    const movePage = (path) => {
        setIsMenuOpen(false);
        history.push(path);
    }
    
    const signOutUser = () => {
        StorageManager.removeUserInfo();
        dispatch(removeUser());
        movePage('/login')
    }

    return (
        <div className={`side-menu ${isOpen && 'open'}`}>
            <div className="close-icon-box">
                <img alt="none" src={closeIcon} onClick={() => setIsMenuOpen(false)} />
            </div>
            <div className="side-menu-title">
                <span>
                    {
                        isLogined
                        ?  <>{userNickNm}님<br />안녕하세요</>
                        : <>모먼트는<br />처음이신가요? </>
                    }
                    
                </span>
            </div>
            {
                isLogined
                ? <span onClick={() => signOutUser()} className="now-start-comment">로그아웃 <img alt="none" src={nextIcon} /> </span>
                : <span className="now-start-comment">지금 시작해 보세요 <img alt="none" src={nextIcon} /> </span>
            }
            <ul className="menu-list">
                {
                    isLogined
                    ? [
                        <li onClick={() => movePage('/confirmPw')} >회원정보 수정</li>,
                        <li onClick={() => movePage('/sendMessageHistory')} >나의 사연 관리</li>  
                    ]
                    : <li onClick={() => movePage('/login')} >로그인하기</li>
                }
                
                <li onClick={() => movePage('/guide/moment/1')} >모먼트 소개</li>
                <li onClick={() => movePage('/guide/user')} >서비스 이용가이드</li>
                <li onClick={() => movePage('/guide/moment/2')} >자주 묻는 질문</li>
            </ul>
            <img alt="none" className="side-menu-logo" src={logoPath} />
        </div>
    )
}

export default WrapLoginedComponent(SideMenu);