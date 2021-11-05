/**
 * StorageManager
 * @author sw.nam
 * @since 2021/10/31
 * description
 * session/local stroage 관리
 * 로그인 토큰 및 세션 관리용 매니저,
 */

export const StorageManager = (function() {

    let localStorage;

    let CACHED_KEYS = [
        "key.user_token"
    ];

    let cachedStorage = [];
    const getLocalStorage = function() {

        if(!localStorage) {
            localStorage = window.localStorage;
        }

        return localStorage;
    };

    const _load  = function(key) {

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

    const _save = function (key, value) {

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

    const _remove = function(key) {
            getLocalStorage().removeItem(key);
            //cached storage 삭제
        let index = CACHED_KEYS.indexOf(key);
        if (index !== -1) {
            cachedStorage[index] = null;
        }
    };

    return {
        load: _load,
        save: _save,
        remove: _remove
    }


}());
