/**
 * Config
 * @author wook
 * @since 2021/11/05
 * description
 */

export const CONFIG = {};


Object.defineProperty(CONFIG, "STORAGE_KEY", {
    value: {
        "USER_INFO": "key.user_info",
        "SALT_KEY": "key.salt_key"
    },
    writable : true
});

Object.defineProperty(CONFIG, "STAR_CATEGORY",{
    value: {
        "INFLUENCER" : {
            catId: "1001",
            catNm: "influencer"
        },
        "ENTERTAINER" : {
            catId: "1002",
            catNm: "방송인"
        },
        "ARTIST" : {
            catId: "1003",
            catNm: "예술"
        },
        "EDUCATOR" : {
            catId: "1004",
            catNm: "교육자"
        },
        "ATHLETE" : {
            catId: "1005",
            catNm: "운동선수"
        },
        "CREATOR" : {
            catId: "1006",
            catNm: "크리에이터"
        },
        "ETC" : {
            catId: "1007",
            catNm: "올라운더"
        },
    },
    writable: false
})