import React, {useState} from 'react';

import '../../Common.css';
import './header.css';

const menuPath = 'assets/icons/icoMenu.png'
const searchPath = 'assets/icons/icoSearch.png'
const loginPath = 'assets/icons/ico-login.png'
const logoPath = 'assets/images/yhlee/menu-logo.png'


function Header() {
    return (
        <div className="App-Header layout">
            <div className="navigation-bar container">
                <div>
                    <img className={"top-icon"} src={menuPath} />
                </div>
                <div>
                    <img className={'top-logo'} src={logoPath} />
                </div>
                <div>
                    <img className={"top-icon"} src={searchPath} />
                    <img className={"top-icon"} src={loginPath} />
                </div>
            </div>
        </div>
    )
}


export default Header;