
import './App.css';

import Header from './layouts/header/Header.js'
import Home from './layouts/home/Home'
import User from './layouts/login/User'
import Momentor from './layouts/momentor/MomentorHome'
import Write from './layouts/write/Write'

import {BrowserRouter as Router, Route, Link} from 'react-router-dom'


function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="App-main layout">
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/User" component={User}/>
                    <Route exact path="/Momentor" component={Momentor}/>
                    <Route exact path="/Write" component={Write}/>
                </div>
            </div>
            
        </Router>

    );
}

export default App;
