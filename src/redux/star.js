import createAction from "redux-actions/lib/createAction";
import AWSManager from "managers/AWSManager";
const {
    getStarList,
    getStarInfo,
} = AWSManager;

const GET_STAR_LIST = 'star/GET_LIST';
const GET_STAR_DETAIL_INFO = 'star/GET_STAR_DETAIL_INFO'
const SET_LOADING = 'star/SET_LOADING'

export const getStarListAction = createAction(GET_STAR_LIST, data => data);
export const getStarDetailAction = createAction(GET_STAR_DETAIL_INFO, data => data);
export const setLoadingAction = createAction(SET_LOADING, data => data);

export const getStarAsync = (prop) => async dispatch => {
    const { data, status } = await getStarList(null);
    if(status === 200) {
        //dispatch(getStarListAction(data.slice(0, 6)))
        dispatch(getStarListAction(data))
    } else {
        dispatch(getStarListAction([]))
    }
    
}

export const getStarDetailAsync = (id) => async dispatch => {
    dispatch(setLoadingAction(true))
    const { data, status } = await getStarInfo({starId: id})
    if(status === 200) {
        dispatch(getStarDetailAction(data))
    } else {
        dispatch(getStarDetailAction({}))
    }
    dispatch(setLoadingAction(false))
}

const initialState = {
    starList: [],
    starDetail: {},
    isLoading: false,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_STAR_LIST: {
            return {
                ...state,
                starList: [...action.payload]
            }
        }
        case GET_STAR_DETAIL_INFO: {
            return {
                ...state,
                starDetail: action.payload,
            }
        }
        case SET_LOADING: {
            return {
                ...state,
                isLoading: action.payload
            }
        }
        default: {
            return state
        }
    }
}