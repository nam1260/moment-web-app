/**
 * StorageManager
 * @author sw.nam
 * @since 2021/10/31
 * description
 * session/local stroage 관리
 * 로그인 토큰 및 세션 관리용 매니저,
 */

import * as DEF from "../resources/Config"

const StorageManager = (function() {

    let localStorage;

    let CACHED_KEYS = [
        "key.user_info"
    ];

    let cachedStorage = [];
    const getLocalStorage = function() {

        if(!localStorage) {
            localStorage = window.localStorage;
        }

        return localStorage;
    };

    const load  = function(key) {

        let index = CACHED_KEYS.indexOf(key);
        let value;

        if (index !== -1) {
            value = cachedStorage[index];
        }

        if(!value) {
            value = getLocalStorage().getItem(key);
        }
        return value
    };

    const save = function (key, value) {

        let index = CACHED_KEYS.indexOf(key);

        try {
            getLocalStorage().setItem(key, value);

            //cached storage 저장
            index = CACHED_KEYS.indexOf(key);
            if (index !== -1) {
                cachedStorage[index] = value;
            }
        } catch (e) {
            console.log(e);
        }
    };

    const remove = function(key) {
            getLocalStorage().removeItem(key);
            //cached storage 삭제
        let index = CACHED_KEYS.indexOf(key);
        if (index !== -1) {
            cachedStorage[index] = null;
        }
    };

    return {
        load,
        save,
        remove,

        saveUserInfo : (userInfo)=> {
            save(DEF.CONFIG.STORAGE_KEY.USER_INFO,JSON.stringify(userInfo));
        },
        loadUserInfo : () => {
           return JSON.parse(load(DEF.CONFIG.STORAGE_KEY.USER_INFO));
        },
        removeUserInfo : () => {
            remove(DEF.CONFIG.STORAGE_KEY.USER_INFO);
        },
        checkUserIsLogined: () => {
            const userInfo = JSON.parse(load(DEF.CONFIG.STORAGE_KEY.USER_INFO));
            return !!(userInfo && userInfo?.token)
        },
        saveSalt : (salt)=> {
            save(DEF.CONFIG.STORAGE_KEY.SALT_KEY, salt);
        },
        loadSalt : () => {
           return load(DEF.CONFIG.STORAGE_KEY.SALT_KEY);
        },
        removeSalt : () => {
            remove(DEF.CONFIG.STORAGE_KEY.SALT_KEY);
        },
    }


}());


export default StorageManager;