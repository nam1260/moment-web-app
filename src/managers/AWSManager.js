/**
 * AWSAPIManager
 * @author wook
 * @since 2021/10/31
 * description
 * AWS 연동 API 명세
 */

import axios from "axios"

const SERVER_URL  =  "https://8wuahwyzk9.execute-api.ap-northeast-2.amazonaws.com/test";
const REQ_USERINFO  =  "/user/request-user-info";
const LOGIN_USER  =  "/login-user";
const API_KEYS = 'hFkmbKrQxO7G8EyATQbBQ8UP8qaS2Lru3ndYbHWL';
const headers = {
    'x-api-key' : API_KEYS,
}

const AWSManager = (function() {

    const getUrl = (url) => {
        return SERVER_URL + url;
    }

    const request = (url, params) => {
        return axios.post(url, params, {headers});
    };

    const reqUserInfo = async (params) => {
        if(!params) params = {};
        console.log("reqUserInfo = " + JSON.stringify(params));
        if(!params.userId)  params.userId = "testUserId";
        return await request(getUrl(REQ_USERINFO), params);
    };

    const loginUser = async (params) => {
        console.log("loginUser = " +JSON.stringify(params));
        return await request(getUrl(LOGIN_USER), params);
   };



    return {
        reqUserInfo,
        loginUser,
    }


}());

export default AWSManager