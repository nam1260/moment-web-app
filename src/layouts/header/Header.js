import React from 'react';
import { useHistory } from 'react-router';
import '../../Common.css';
import './header.css';
import { WrapLoginedComponent } from '../../shared/component/common/WrapLoginedComponent';
import { message } from "antd";
import StorageManager from "../../managers/StorageManager";

const menuPath = '/assets/icons/icoMenu.png'
const searchPath = '/assets/icons/icoSearch.png'

const logoPath = '/assets/images/logo.png'

const ICON_USER_DEFAULT ='/assets/icons/ico-user-default.png'




function Header({ setIsMenuOpen, isLogined, userNickNm, userId }) {
    const history = useHistory();


    let loginPath = isLogined ? (StorageManager.loadUserInfo().userImgUrl ? StorageManager.loadUserInfo().userImgUrl : ICON_USER_DEFAULT) : '/assets/icons/ico-login.png'

    const onClickProfile = () => {
        if(isLogined) {
            history.push('/confirmPw');
        } else {
            history.push('/login');
        }
    }


    return (
        <div className="App-Header layout">
            <div className="navigation-bar">
                <div onClick={() => setIsMenuOpen(true)}>
                    <img alt="none" className={"top-icon"} src={menuPath} />
                </div>
                <div>
                    <img alt="none" onClick={() => history.push('/')} className={'top-logo'} src={logoPath} />
                </div>
                <div>
                    <img alt="none" className={"top-icon"} src={searchPath} onClick={()=> {
                        message.warn("서비스 준비중입니다",1); return ;history.push('/search')
                    }} />
                    <img alt="none" className={"top-icon"} src={loginPath} onClick={onClickProfile}/>
                </div>
            </div>
        </div>
    )
}


export default WrapLoginedComponent(Header);