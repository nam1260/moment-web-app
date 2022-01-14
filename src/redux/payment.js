import createAction from "redux-actions/lib/createAction";
import AWSManager from "managers/AWSManager";
const {
    regPaymentInfo,
} = AWSManager;

const SET_PAYMENT_NO = 'payment/SET_PAYMENT_NO';
export const setPaymentNo = createAction(SET_PAYMENT_NO, data => data);

export const submitDepositData = (info) => async (dispatch) => {
    const { data, status } = await regPaymentInfo(info);
    if( status === 200 ) {
        dispatch(setPaymentNo(data));
    }
}

const initialState = {
    paymentNo: '',
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_PAYMENT_NO:
            return {
                ...state,
                paymentNo: action.payload,
            };
        default:
            return {
                ...state
            };
    }
}
