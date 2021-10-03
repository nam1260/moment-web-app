/**
 * Profile
 * @author wook
 * @since 2021/08/03
 * description
 */

import React, {useState, useEffect} from 'react'
import {Auth} from 'aws-amplify'
import {withAuthenticator, AmplifySignOut} from '@aws-amplify/ui-react'
import Container from './Container'

function Profile() {
    useEffect(() => {
        checkUser() // 랜더링 시 이 함수가 실행 1회 !
    }, []);

    const [user, setUser] = useState({});

    async function checkUser() {
        try {
            const data = await Auth.currentUserPoolUser()
            const userInfo = {username: data.username, ...data.attributes}
            setUser(userInfo);
        } catch (err) {
            console.log('error: ', err);
        }
    }

    return (
        <Container>
            <h1>Profile</h1>
            <h2>Username: {user.name}</h2>
            <h3>Phone: {user.phone_number}</h3>
            <AmplifySignOut />
        </Container>
    )
}

export default withAuthenticator(Profile)