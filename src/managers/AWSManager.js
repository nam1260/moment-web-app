/**
 * AWSAPIManager
 * @author wook
 * @since 2021/10/31
 * description
 * AWS 연동 API 명세
 */

import axios from "axios"

const SERVER_URL  =  "https://8wuahwyzk9.execute-api.ap-northeast-2.amazonaws.com/test/user";
const API_KEYS = 'hFkmbKrQxO7G8EyATQbBQ8UP8qaS2Lru3ndYbHWL';
const headers = {
    'x-api-key' : API_KEYS,
}

const AWSManager = (function() {

     const reqUserInfo = async (params) => {

        const url = SERVER_URL + "/user/reg-user-info";
        let result;

        if(!params) params = {};

        console.log("reqUserInfo = " +JSON.stringify(params));

        if(!params.userId)  params.userId = "testUserId";

        result = await axios.post(url,params,{headers});

         //성공
         console.log(result);
         if(result && result.rspCode === "200") {
             return result;
         }else {
             return null;
         }

    };



    return {
        reqUserInfo
    }


}());

export default AWSManager