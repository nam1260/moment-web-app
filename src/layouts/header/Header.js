import React, {useState, useMemo, useEffect} from 'react';
import { useHistory } from 'react-router';
import 'Common.css';
import './header.css';
import { WrapLoginedComponent } from 'shared/component/common/WrapLoginedComponent';
import StorageManager from "managers/StorageManager";

const menuPath = '/assets/icons/icoMenu.png'
const searchPath = '/assets/icons/icoSearch.png'

const logoPath = '/assets/images/logo.png'

const ICON_LOGIN = '/assets/icons/ico-login.png';
const ICON_USER_DEFAULT ='/assets/icons/ico-user-default.png'
const SERVEY_URL = "https://docs.google.com/forms/d/e/1FAIpQLScHxVABrNFNAU2y180xopkBvSvZIbre7GuIwzBtiqsbgEUJjg/viewform";



function Header({ setIsMenuOpen, isLogined, userNickNm, userId, userImgUrl }) {
    const history = useHistory();

    console.log("isLogined "+isLogined );
    console.log("userImgUrl "+userImgUrl );
    console.log("userNickNm "+userNickNm );
    console.log("userId "+userId );


    const onClickProfile = () => {
        if(isLogined) {
            history.push('/confirmPw');
        } else {
            history.push('/login');
        }
    }

    const [profileImgUrl,setProfileImgUrl] = useState("");

    useEffect(()=>{
        console.log("change header icon img url");
        setProfileImgUrl(isLogined ?  (StorageManager.loadUserInfo().userImgUrl || userImgUrl|| ICON_USER_DEFAULT) : ICON_LOGIN)
    },[isLogined,userImgUrl,StorageManager.loadUserInfo().userImgUrl]);



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
                    <img alt="none" className={"top-icon"} src={searchPath} onClick={()=>{window.open(SERVEY_URL, '_blank')}}/>
                    <img alt="none" className={"top-icon"} src={profileImgUrl} onClick={onClickProfile}/>
                </div>
            </div>
        </div>
    )
}


export default WrapLoginedComponent(Header);