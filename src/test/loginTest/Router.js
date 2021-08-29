import React, {useState, useEffect} from 'react'
import {HashRouter, Switch, Route } from 'react-router-dom'


import Nav from './Nav'
import Public from './Public'
import Profile from './Profile'
import Protected from './Protected'

/*
const User = () => {

    const [current, setCurrent] = useState('home')
    useEffect(() => {
        setRoute()
        window.addEventListener('hashChange',setRoute)
        return () => window.removeEventListener('hashchange',setRoute)
    },[])

    function setRoute() {
        const location = window.location.href.split('/')
        const pathname = location[location.length-1]
        setCurrent(pathnname ? pathname : 'home')
    }
    return (
        <hashRouter>
            <Nav current = {current} />
            <Switch>
                <Route exact path = "/public" compoent={Public}/>
                <Route exact path = "/protected" compoent={Protected}/>
                <Route exact path = "/profile" compoent={Profile}/>
            </Switch>
        </hashRouter>
    )
}

export default User*/
