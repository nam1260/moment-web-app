
import './App.css';

import Header from './layouts/header/Header.js';
import Home from './layouts/home/Home';
import Momentor from './layouts/momentor/MomentorHome';
import Write from './layouts/write/Write';
import Search from './layouts/search/Search';
import Login from './layouts/login/Login';
import AddAccount from './layouts/login/AddAccount';
import FindAccount from './layouts/login/FindAccount';
import FindPassword from './layouts/login/FindPassword';
import SideMenu from './layouts/sidemenu/SideMenu';
import GuideComponent from './layouts/guide/Guide';
// import Amplify from 'aws-amplify';
// import aws_exports from './aws-exports';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import { useState } from 'react';
// Amplify.configure(aws_exports);


function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return (
        <Router>
            <div className="App">
                <Header setIsMenuOpen={setIsMenuOpen} />
                <Route exact path="/search" component={Search} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/addAccount" component={AddAccount} />
                <Route exact path="/findAccount" component={FindAccount} />
                <Route exact path="/findPassword" component={FindPassword} />
                <SideMenu isOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <div className="App-main layout">
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/Momentor" component={Momentor}/>
                    <Route exact path="/Write" component={Write}/>
                    <Route exact path="/guide">
                        <Redirect to="/guide/moment" />
                    </Route>
                    <Route exact path="/guide/moment" component={GuideComponent.IntroComponent}/>
                    <Route exact path="/guide/user" component={GuideComponent.UserComponent}/>
                </div>
                
            </div>
            {isMenuOpen && <div className="wrapper" />}
        </Router>

    );
}

export default App;
