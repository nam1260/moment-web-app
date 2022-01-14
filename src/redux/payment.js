import createAction from "redux-actions/lib/createAction";
import AWSManager from "managers/AWSManager";
const {
    regPaymentInfo,
} = AWSManager;

const SET_PAYMENT_NO = 'payment/SET_PAYMENT_NO';
const SET_PAYMENT_FAIL = 'payment/SET_PAYMENT_FAIL';
const SET_PAYMENT_SUCCESS = 'payment/SET_PAYMENT_SUCCESS';
const SET_PAYMENT_RESET = 'payment/SET_PAYMENT_RESET';

export const setPaymentNo = createAction(SET_PAYMENT_NO, data => data);
export const setPaymentFail = createAction(SET_PAYMENT_FAIL);
export const setPaymentSuccess = createAction(SET_PAYMENT_SUCCESS);
export const setPaymentReset = createAction(SET_PAYMENT_RESET);

export const submitDepositData = (info) => async (dispatch) => {
    const { data, status } = await regPaymentInfo(info);
    if( status === 200 ) {
        dispatch(setPaymentNo(data.payNo));
        dispatch(setPaymentSuccess());
    } else {
        dispatch(setPaymentFail());
    }
}

const initialState = {
    paymentNo: '',
    isSuccess: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_PAYMENT_NO:
            return {
                ...state,
                paymentNo: action.payload,
            };
        case SET_PAYMENT_FAIL:
            return {
                ...state,
                isSuccess: false,
            }
        case SET_PAYMENT_SUCCESS:
            return {
                ...state,
                isSuccess: true,
            }
        case SET_PAYMENT_RESET:
            return {
                ...initialState
            }
        default:
            return {
                ...state
            };
    }
}
