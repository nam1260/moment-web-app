/**
 * AWSAPIManager
 * @author wook
 * @since 2021/10/31
 * description
 * AWS 연동 API 명세
 */

import axios from "axios"

const SERVER_URL  =  "https://8wuahwyzk9.execute-api.ap-northeast-2.amazonaws.com/test";
const API_KEYS = 'hFkmbKrQxO7G8EyATQbBQ8UP8qaS2Lru3ndYbHWL';
const headers = {
    // 'x-api-key' : 'hFkmbKrQxO7G8EyATQbBQ8UP8qaS2Lru3ndYbHWL',
    // //'Access-Control-Allow-Origin' : '*'
    // 'access-control-allow-origin' : '*'
}

const AWSManager = (function() {

     const reqUserInfo = async (params) => {

        const url = SERVER_URL + "/reqUserInfo";
  
        return await axios.post(url,{

            userId: params ? params.userId : "testUserId",
            userNm: params ? params.userNm : "testUserId",
            userNickNm: params ? params.userNickNm : "testUserId",
            phoneNum: params ? params.phoneNum : "testUserId",

        },{headers})

    };


    return {
        reqUserInfo
    }


}());

export default AWSManager