/*
import React from 'react';
import '../../App.css';
import '../../Common.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';

function Usera() {
    return (
        <div className="App-login container">
            <div className="component">
                <AmplifySignOut />
                My App
            </div>

        </div>
    )
}

export default withAuthenticator(Usera);*/

import React, {useState, useEffect} from 'react'
import {HashRouter, Switch, Route } from 'react-router-dom'


import Nav from './Nav'
import Public from './Public'
import Profile from './Profile'
import Protected from './Protected'

const User = () => {

    const [current, setCurrent] = useState('home')
    useEffect(() => {
        setRoute()
        window.addEventListener('hashChange',setRoute)
        return () => window.removeEventListener('hashchange',setRoute)
    },[])

    function setRoute() {
        console.log("setRoute:!!!!!")
        const location = window.location.href.split('/')
        const pathname = location[location.length-1]
        setCurrent(pathname ? pathname : 'home')
    }
    return (
        <HashRouter>
            <Nav current = {current} />
            <Switch>
                <Route exact path = "/Public" component={Public}/>
                <Route exact path = "/Protected" component={Protected}/>
                <Route exact path = "/Profile" component={Profile}/>
            </Switch>
        </HashRouter>
    )
}

export default User
