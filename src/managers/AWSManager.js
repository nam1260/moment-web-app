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
const VERIFY_SMS_NUM = "/user/send-sms";

const GET_SENT_MSG_LIST = "/msg/get-sent-msg-list";
const UPDATE_MSG_INFO = "/msg/update-msg-info";
const GET_FAN_MSG_LIST = "/msg/get-fan-msg-list";
const UPDATE_FAN_MSG = "/msg/update-fan-msg";


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
    /**
     * 스타에게 보낸 사연을 조회힌다.
     * @param params
     * @returns {Promise<*>}
     */
    const getSentMsgList = async (params) => {
        console.log("getSentMsgList = " +JSON.stringify(params));
        return await requestPost(getUrl(GET_SENT_MSG_LIST), params);
    }
    /**
     * 사연 정보를 업데이트한다.
     * @param params
     * @returns {Promise<*>}
     */
    const updateMsgInfo = async (params) => {
        console.log("updateMsgInfo = " +JSON.stringify(params));
        return await requestPost(getUrl(UPDATE_MSG_INFO), params);
    };
    /**
     * 팬으로부터 받은 사연을 조회힌다.
     * @param params
     * @returns {Promise<*>}
     */
    const getFanMsgList = async (params) => {
        console.log("getFanMsgList = " +JSON.stringify(params));
        return await requestPost(getUrl(GET_FAN_MSG_LIST), params);
    };

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
        verifySMSNumber,
        //사연관리
        getSentMsgList,
        updateMsgInfo,
        getFanMsgList

    }


}());

export default AWSManager