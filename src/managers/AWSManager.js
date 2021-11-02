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
    'x-api-key' : 'hFkmbKrQxO7G8EyATQbBQ8UP8qaS2Lru3ndYbHWL'
}

const AWSManager = (function() {

     const reqUserInfo = async (props) => {

        const url = SERVER_URL + "/reg-user-info";

        return await axios.post(url,{

            params: {
                userId: props.userId,
                userNm: props.userNm,
                userNickNm: props.userNickNm,
                phoneNum: props.phoneNm,
            }

        },{headers})

    };


    return {
        reqUserInfo
    }


}());

export default AWSManager