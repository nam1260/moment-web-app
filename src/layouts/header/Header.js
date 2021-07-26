import React, {useState} from 'react';

import '../../Common.css';
import './header.css';
import HeaderStyled from './StyledComponents';


const APP_LOGO_PATH = "assets/images/logo.svg";
const MENU_LOGO_PATH = "assets/images/icon_menu.png";

const {
    LeftArea,
    RightArea,
    IconWrapper,
    HeaderIcon,
} = HeaderStyled;


function Header() {
    return (
        <div className="App-Header layout">
            <div className="navigation-bar container">
                <LeftAreaComponent/>
                <RightAreaComponent/>
            </div>
        </div>
    )
}


const LeftAreaComponent = () => {

    return (
        <LeftArea className="component">
            <AppLogo/>
            <QuickMenu/>
        </LeftArea>
    )
};

const RightAreaComponent = () => {
    return (
        <RightArea className="component">
            <SearchIcon/>
        </RightArea>
    )
}

const SearchIcon = () =>
    (
        <IconWrapper>
            <img src={APP_LOGO_PATH} className="searchIcon" style={
                {position: 'relative', width: '5vh', height: '5vh', background: 'blue'}
            }
            />
        </IconWrapper>
    )


//component Elements
const AppLogo = () => {
    return (
        <IconWrapper>
            <HeaderIcon src={APP_LOGO_PATH} isAppLogo="true"
                        onClick={() => {
                            window.location.href = "/";
                        }}
            />
        </IconWrapper>
    )
};

const QuickMenu = () => {
    const [hovered, setHovered] = useState(false);
    const toggleHover = () => {
        setHovered(!hovered);
    }
    return (
        <IconWrapper>
            <HeaderIcon src={MENU_LOGO_PATH} className={hovered ? 'menu-icon hovered' : "menu-icon"}
                        onMouseOver={toggleHover}
                        onMouseLeave={toggleHover}
            />

        </IconWrapper>

    )
};


export default Header;