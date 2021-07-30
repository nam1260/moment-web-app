import React, {useState} from 'react';

import '../../Common.css';
import './header.css';
import HeaderStyled from './StyledComponents';


const APP_LOGO_PATH = "assets/images/logo.svg";
const MENU_LOGO_PATH = "assets/images/icon_menu.png";
const SEARCH_ICON_PATH = "assets/images/test/test_icon_search.png";
const HOME_ICON_PATH = "assets/images/test/test_icon_home.png";
const USER_ICON_PATH = "assets/images/test/test_icon_user.png";


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
            <HomeIcon/>
            <SearchIcon/>
            <UserIcon/>
        </RightArea>
    )
}

const SearchIcon = () =>
    (
        <IconWrapper>
            <img src={SEARCH_ICON_PATH} className="searchIcon" style={
                {position: 'relative', width: '5vh', height: '5vh'}
            }
            />
        </IconWrapper>
    )

const HomeIcon = () => (
    <IconWrapper>
        <img src={HOME_ICON_PATH} className="searchIcon"
             style={
            {position: 'relative', width: '10vh', height: '10vh'}
        }
             onClick={() => {
                 window.location.href = "/";
             }}
        />
    </IconWrapper>
)

const UserIcon = () => (
    <IconWrapper>
        <img src={USER_ICON_PATH} className="searchIcon" style={
            {position: 'relative', width: '10vh', height: '10vh'}

        }
             onClick={() => {
                 window.location.href = "/User";
             }}
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