
import './App.css';

import Header from './layouts/header/Header.js'
import Home from './layouts/home/Home'
import Momentor from './layouts/momentor/MomentorHome'
import Write from './layouts/write/Write'

import Amplify from 'aws-amplify';
import aws_exports from './aws-exports';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
Amplify.configure(aws_exports);


function App() {
    return (
        <Router>
            <div className="App">
                <Header/>
                <div className="App-main layout">
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/Momentor" component={Momentor}/>
                    <Route exact path="/Write" component={Write}/>
                </div>
            </div>
        </Router>

    );
}

export default App;
