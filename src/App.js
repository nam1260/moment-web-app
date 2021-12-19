
import './App.css';
import { Provider } from 'react-redux';
import store from './redux-store';
import Header from './layouts/header/Header.js';
import Home from './layouts/home/Home';
import Momentor from './layouts/momentor/MomentorHome';
import Write from './layouts/write/Write';
import WriteSuccessComponent from './layouts/write/Success';
import Search from './layouts/search/Search';
import Login from './layouts/login/Login';
import AddAccount from './layouts/login/AddAccount';
import FindAccount from './layouts/login/FindAccount';
import FindPassword from './layouts/login/FindPassword';
import ConfirmPw from './layouts/mypage/ConfirmPw';
import ModifyAccount from './layouts/mypage/ModifyAccount';
import ReceiveMessageHistory from './layouts/mypage/ReceiveMessageHistory';
import SendMessageHistory from './layouts/mypage/SendMessageHistory';
import StarProfile from './layouts/mypage/StarProfile';
import StarRegister from './layouts/mypage/StarRegister';
import StarRegisterHistory from './layouts/mypage/StarRegisterHistory';
import SideMenu from './layouts/sidemenu/SideMenu';
import GuideComponent from './layouts/guide/Guide';
// import Amplify from 'aws-amplify';
// import aws_exports from './aws-exports';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import StarComponent from './layouts/star/star.component';
import StarCommentListComponent from './layouts/star/commentList.component';
import StorageManager from "./managers/StorageManager.js";
import DocComponent from './layouts/doc/Doc';

// Amplify.configure(aws_exports);


const ModalWrapper = styled.div`
    z-index:9998;
    position:fixed;
    top:0px;
    left:0px;
    width:100%;
    height:100%;
    background-color:#000;
    opacity:0.7;
    display:none;
`


function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                <div className="App">
                    <ModalWrapper className="modal-wrapper" />
                    <Header setIsMenuOpen={setIsMenuOpen} />
                    <Route exact path="/login" component={StorageManager.checkUserIsLogined() ? Home : Login} />
                    <Route exact path="/addAccount" component={AddAccount} />
                    <Route exact path="/findAccount" component={FindAccount} />
                    <Route exact path="/findPassword" component={FindPassword} />
                    <Route exact path="/confirmPw" component={ConfirmPw} />
                    <Route exact path="/modifyAccount" component={StorageManager.checkUserIsLogined() ? ModifyAccount : Login} />
                    <Route exact path="/receiveMessageHistory" component={StorageManager.checkUserIsLogined() ? ReceiveMessageHistory : Login} />
                    <Route exact path="/sendMessageHistory" component={StorageManager.checkUserIsLogined() ? SendMessageHistory : Login} />
                    <Route exact path="/starProfile" component={StorageManager.checkUserIsLogined() ? StarProfile : Login} />
                    <Route exact path="/starRegister" component={StorageManager.checkUserIsLogined() ? StarRegister : Login} />
                    <Route exact path="/starRegisterHistory" component={StorageManager.checkUserIsLogined() ? StarRegisterHistory : Login} />
                    <SideMenu isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                    <div className="App-main layout">
                        <Route exact path="/" component={Home}/>
                        <Route exact path="/Momentor" component={Momentor}/>
                        <Route exact path="/writesuccess" component={WriteSuccessComponent}/>
                        <Route exact path="/write/:id" component={Write}/>
                        <Route exact path="/star/:id" component={StarComponent}/>
                        <Route exact path="/star/:id/comment" component={StarCommentListComponent}/>
                        <Route exact path="/search" component={Search} />
                        <Route exact path="/guide">
                            <Redirect to="/guide/moment" />
                        </Route>
                        <Route path={["/guide/moment/:type", "/guide/moment"]} component={GuideComponent.IntroComponent}/>
                        <Route exact path="/guide/user" component={GuideComponent.UserComponent}/>
                        <Route path={["/doc/:type", "/doc"]} component={DocComponent} />
                    </div>
                    
                </div>
                </Switch>
                {isMenuOpen && <div className="wrapper" onClick={() => {setIsMenuOpen(false)}} />}
            </Router>
        </Provider>

    );
}

export default App;
