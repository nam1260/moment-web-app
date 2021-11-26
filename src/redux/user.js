import createAction from "redux-actions/lib/createAction";

const SAVE_USER = 'user/SAVE';
const REMOVE_USER = 'user/REMOVE';

export const saveUser = createAction(SAVE_USER, info => info);
export const removeUser = createAction(REMOVE_USER);

const initialState = {
    isLogined: false,
    userNickNm: '',
    userNm: '',
    userImgUrl: '',
    starYn: '',
    mrktAgreeYn: ''
};

export default function(state = initialState, action) {
    switch(action.type) {
        case SAVE_USER: {
            const userInfo = action.payload || {};
            return {
                ...state,
                ...userInfo,
                isLogined: true,
            }
        }
        case REMOVE_USER: {
            return {
                ...initialState,
            }
        }
        default: {
            return state
        }
    }
}