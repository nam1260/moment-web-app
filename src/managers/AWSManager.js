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
const CHECK_DUPL_NICK_NAME  =  "/user/check-dupl-nicknm";
const CHECK_PW_VERIFICATION  =  "/user/check-pw-verification";
const LOGIN_USER  =  "/user/login-user";
const LOGOUT_USER = "/user/logout-user";
const GET_USER_INFO = "/user/get-user-info";
const UPDATE_USER_INFO ="/user/update-user-info";
const FIND_USER_ID = "/user/find-user-id";
const VERIFY_SMS_NUM = "/verify-sms-number";


const API_KEYS = 'hFkmbKrQxO7G8EyATQbBQ8UP8qaS2Lru3ndYbHWL';
const headers = {
    'x-api-key' : API_KEYS,
}

const AWSManager = (function() {

    const getUrl = (url) => {
        return SERVER_URL + url;
    };

    const requestPost = (url, params) => {
        return axios.post(url, params, {headers});
    };

    const regUserInfo = async (params) => {
        console.log("regUserInfo = " + JSON.stringify(params));
        return await requestPost(getUrl(REG_USER_INFO), params);
    };

    const checkDuplId = async (params) => {
        console.log("checkDuplId = " + JSON.stringify(params));
        return await requestPost(getUrl(CHECK_DUPL_ID), params);
    };

    const checkDuplNickNm = async (params) => {
        console.log("checkDuplNickNm = " + JSON.stringify(params));
        return await requestPost(getUrl(CHECK_DUPL_NICK_NAME), params);
    };

    const checkPasswordVerification = async (params) => {
        console.log("checkPasswordVerification = " + JSON.stringify(params));
        return await requestPost(getUrl(CHECK_PW_VERIFICATION), params);
    }

    const loginUser = async (params) => {
        console.log("loginUser = " +JSON.stringify(params));
        return await requestPost(getUrl(LOGIN_USER), params);
   };

    const logoutUser = async (params) => {
        console.log("logoutUser = " +JSON.stringify(params));
        return await requestPost(getUrl(LOGOUT_USER), params);
    };

    const getUserInfo = async (params) => {
        console.log("getUserInfo = " +JSON.stringify(params));
        return await requestPost(getUrl(GET_USER_INFO), params);
    };

    const verifySMSNumber = async (params) => {
        console.log("verifySMSNumber = " +JSON.stringify(params));
        return await requestPost(getUrl(VERIFY_SMS_NUM), params);
    }

    const findUserId = async (params) => {
        console.log("findUserId = " +JSON.stringify(params));
        return await requestPost(getUrl(FIND_USER_ID), params);
    }
    const updateUserInfo = async (params) => {
        console.log("updateUserInfo = " +JSON.stringify(params));
        return await requestPost(getUrl(UPDATE_USER_INFO), params);
    }

    return {
        regUserInfo,
        checkDuplId,
        checkDuplNickNm,
        checkPasswordVerification,
        loginUser,
        logoutUser,
        getUserInfo,
        updateUserInfo,
        findUserId,
        verifySMSNumber
    }


}());

export default AWSManager