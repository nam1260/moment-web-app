import React from 'react';
import { useHistory } from 'react-router';
import '../../Common.css';
import './header.css';

const menuPath = '/assets/icons/icoMenu.png'
const searchPath = '/assets/icons/icoSearch.png'
const loginPath = '/assets/icons/ico-login.png'
const logoPath = '/assets/images/yhlee/logo.png'


function Header({ setIsMenuOpen }) {
    const history = useHistory();
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
                    <img alt="none" className={"top-icon"} src={searchPath} onClick={()=> { history.push('/search') }} />
                    <img alt="none" className={"top-icon"} src={loginPath} onClick={()=> { history.push('/modifyAccount') }}/>
                </div>
            </div>
        </div>
    )
}


export default Header;