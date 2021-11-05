/**
 * AWSAPIManager
 * @author wook
 * @since 2021/10/31
 * description
 * AWS 연동 API 명세
 */

import axios from "axios"

const SERVER_URL  =  "https://8wuahwyzk9.execute-api.ap-northeast-2.amazonaws.com/test";

// APIUrls
const REG_USER_INFO  =  "/user/reg-user-info";
const CHECK_DUPL_ID  =  "/user/check-dupl-id";
const LOGIN_USER  =  "/user/login-user";
const LOGOUT_USER = "/user/logout-user";
const GET_USER_INFO = "/user/get-user-info";
const VERIFY_SMS_NUM = "/verify-sms-number";
const API_KEYS = 'hFkmbKrQxO7G8EyATQbBQ8UP8qaS2Lru3ndYbHWL';
const headers = {
    'x-api-key' : API_KEYS,
}

const AWSManager = (function() {

    const getUrl = (url) => {
        return SERVER_URL + url;
    };

    const request = (url, params) => {
        return axios.post(url, params, {headers});
    };

    const regUserInfo = async (params) => {
        console.log("regUserInfo = " + JSON.stringify(params));
        return await request(getUrl(REG_USER_INFO), params);
    };

    const checkDuplId = async (params) => {
        console.log("checkDuplId = " + JSON.stringify(params));
        return await request(getUrl(CHECK_DUPL_ID), params);
    };

    const loginUser = async (params) => {
        console.log("loginUser = " +JSON.stringify(params));
        return await request(getUrl(LOGIN_USER), params);
   };

    const logoutUser = async (params) => {
        console.log("logoutUser = " +JSON.stringify(params));
        return await request(getUrl(LOGOUT_USER), params);
    };

    const getUserInfo = async (params) => {
        console.log("getUserInfo = " +JSON.stringify(params));
        return await request(getUrl(GET_USER_INFO), params);
    };

    const verifySMSNumber = async (params) => {
        console.log("verifySMSNumber = " +JSON.stringify(params));
        return await request(getUrl(VERIFY_SMS_NUM), params);
    }

    return {
        regUserInfo,
        checkDuplId,
        loginUser,
        logoutUser,
        getUserInfo,
        verifySMSNumber
    }


}());

export default AWSManager