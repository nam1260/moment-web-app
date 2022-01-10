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
const GET_SALT  =  "/user/get-salt";
const LOGIN_USER  =  "/user/login-user";
const LOGOUT_USER = "/user/logout-user";
const GET_USER_INFO = "/user/get-user-info";
const UPDATE_USER_INFO ="/user/update-user-info";
const SAVE_USER_IMAGE_URL ="/user/save-user-img-url";
const FIND_USER_ID = "/user/find-user-id";
const VERIFY_SMS_NUM = "/user/send-sms";

const GET_MSG_LIST = "/msg/get-msg-list";
const GET_SENT_MSG_LIST = "/msg/get-sent-msg-list";
const UPDATE_MSG_INFO = "/msg/update-msg-info";
const UPDATE_STAR_MSG_INFO = "/msg/update-star-msg-info";
const UPDATE_USER_MSG_INFO = "/msg/update-user-msg-info";
const DELETE_MSG_INFO = "/msg/delete-msg-info";
const GET_FAN_MSG_LIST = "/msg/get-fan-msg-list";
const UPDATE_FAN_MSG = "/msg/update-fan-msg";

const GET_STAR_LIST = "/star/get-star-list";

const GET_RGST_STAR_STATUS = "/star/get-rgst-star-status";
const UPDATE_RGST_STAR_STATUS = "/star/update-rgst-star-status";
const UPDATE_RGST_USER_COMMENT = "/star/update-rgst-user-comment";
const GET_STAR_INFO = "/star/get-star-detail-info";
const UPDATE_STAR_INFO = "/star/update-star-detail-info";
const REQ_RGST_STAR = "/star/req-rgst-star";
const CNCL_RGST_STAR = "/star/cncl-rgst-star";

const SEND_MSG_TO_STAR = "/msg/send-msg-to-star"


const API_KEYS_TEST = 'hFkmbKrQxO7G8EyATQbBQ8UP8qaS2Lru3ndYbHWL';
const API_KEYS = 'HjkKpsNqsI4iqOdZcFJck16xFuMUfCGa7LaYy9Ra'
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

    const getSalt = async (params) => {
        console.log("getSalt = " + JSON.stringify(params));
        return await requestPost(getUrl(GET_SALT), params);
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
    const saveUserImageUrl = async (params) => {
        console.log("saveUserImageUrl = " +JSON.stringify(params));
        return await requestPost(getUrl(SAVE_USER_IMAGE_URL), params);
    }
    const getMsgList = async (params) => {
        console.log("getMsgList = " +JSON.stringify(params));
        return await requestPost(getUrl(GET_MSG_LIST), params);
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
    const updateStarMsgInfo = async (params) => {
        console.log("updateStarMsgInfo = " +JSON.stringify(params));
        return await requestPost(getUrl(UPDATE_STAR_MSG_INFO), params);
    };
    const updateUserMsgInfo = async (params) => {
        console.log("updateUserMsgInfo = " +JSON.stringify(params));
        return await requestPost(getUrl(UPDATE_USER_MSG_INFO), params);
    };
    const deleteMsgInfo = async (params) => {
        console.log("deleteMsgInfo = " +JSON.stringify(params));
        return await requestPost(getUrl(DELETE_MSG_INFO), params);
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

    const getStarList = async (params) => {
        console.log("getStarList = " +JSON.stringify(params));
        return await requestPost(getUrl(GET_STAR_LIST), params);
    };

    const getRgstStarStatus = async (params) => {
        console.log("getRgstStarStatus");
        return await requestPost(getUrl(GET_RGST_STAR_STATUS), params);
    };

    const updateRgstStarStatus = async (params) => {
        console.log("updateRgstStarStatus = " + JSON.stringify(params));
        return await requestPost(getUrl(UPDATE_RGST_STAR_STATUS), params);
    };
    const updateRgstUserComment = async (params) => {
        console.log("updateRgstUserComment = " + JSON.stringify(params));
        return await requestPost(getUrl(UPDATE_RGST_USER_COMMENT), params);
    };

    const getStarInfo = async (params) => {
        console.log("getStarInfo = " + JSON.stringify(params));
        return await requestPost(getUrl(GET_STAR_INFO), params);
    };

    const updateStarInfo = async (params) => {
        console.log("updateStarInfo = " + JSON.stringify(params));
        return await requestPost(getUrl(UPDATE_STAR_INFO), params);
    };

    const reqRgstStar = async(params) => {
        console.log("reqRgstStar = " + JSON.stringify(params));
        return await requestPost(getUrl(REQ_RGST_STAR), params);
    }
    const cnclRgstStar = async(params) => {
        console.log("cnclRgstStar = " + JSON.stringify(params));
        return await requestPost(getUrl(CNCL_RGST_STAR), params);
    }

    const sendMessageToStar = async(params) => {
        console.log("sendMessageToStar =" + JSON.stringify(params));
        return await requestPost(getUrl(SEND_MSG_TO_STAR), params);
    }


    return {
        regUserInfo,
        checkDuplId,
        checkDuplNickNm,
        getSalt,
        checkPasswordVerification,
        loginUser,
        logoutUser,
        getUserInfo,
        updateUserInfo,
        saveUserImageUrl,
        findUserId,
        verifySMSNumber,
        getRgstStarStatus,
        updateRgstStarStatus,
        updateRgstUserComment,
        //사연관리
        getMsgList,
        getSentMsgList,
        updateMsgInfo,
        updateStarMsgInfo,
        updateUserMsgInfo,
        deleteMsgInfo,
        getFanMsgList,
        getStarList,
        sendMessageToStar,

        getStarInfo,
        updateStarInfo,
        reqRgstStar,
        cnclRgstStar

    }


}());

export default AWSManager