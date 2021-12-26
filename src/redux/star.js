import createAction from "redux-actions/lib/createAction";
import AWSManager from "../managers/AWSManager";

const {
    getStarList,
} = AWSManager;

const GET_STAR_LIST = 'star/GET_LIST';

export const getStarListAction = createAction(GET_STAR_LIST, data => data);

export const getStarAsync = (prop) => async dispatch => {
    const { data, status } = await getStarList(null);
    if(status === 200) {
        dispatch(getStarListAction(data.slice(0, 6)))
    } else {
        dispatch(getStarListAction([]))
    }
    
}

const initialState = {
    starList: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_STAR_LIST: {
            return {
                ...state,
                starList: [...action.payload]
            }
        }
        default: {
            return state
        }
    }
}