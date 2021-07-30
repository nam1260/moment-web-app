/**
 *  Copyright (c) 2021 Moment Corp.
 *  All rights reserved. http://www.youronlymoment.com/
 *
 *  This software is the confidential and proprietary information of
 *  Moment Corp. ("Confidential Information"). You shall not
 *  disclose such Confidential Information and shall use it only in
 *  accordance with the terms of the license agreement you entered into
 *  with Moment.
 */

/**
 * AWSAuthManager
 * @author wook
 * @since 2021/07/26
 * description
 * AWS cognito method 제공 매니저
 */


import { Auth } from 'aws-amplify';

/**
 * 회원 가입 처리 시 호출한다.
 * @returns {Promise<void>}
 */

async function signUp() {
    try {
        const { user } = await Auth.signUp({
            username,
            password,
            attributes: {
                email,          // optional
                phone_number,   // optional - E.164 number convention
                // other custom attributes
            }
        });
        console.log(user);
    } catch (error) {
        console.log('error signing up:', error);
    }
}

/**
 * 회원가입 확인코드 전송
 * @returns {Promise<void>}
 */
async function confirmSignUp() {
    try {
        await Auth.confirmSignUp(username, code);
    } catch (error) {
        console.log('error confirming sign up', error);
    }
}

/**
 * 회원가입 확인코드 재전송
 * @returns {Promise<void>}
 */
async function resendConfirmationCode() {
    try {
        await Auth.resendSignUp(username);
        console.log('code resent successfully');
    } catch (err) {
        console.log('error resending code: ', err);
    }
}

/**
 * 로그인 시 호
 * @returns {Promise<void>}
 */
async function signIn() {
    try {
        const user = await Auth.signIn(username, password);
    } catch (error) {
        console.log('error signing in', error);
    }
}

/**
 * 로그아웃 시 호출
 * @returns {Promise<void>}
 */
async function signOut() {
    try {
        await Auth.signOut({ global: true });
    } catch (error) {
        console.log('error signing out: ', error);
    }
}


