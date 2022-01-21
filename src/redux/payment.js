import createAction from "redux-actions/lib/createAction";
import AWSManager from "managers/AWSManager";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { Base64 } from 'js-base64';
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();


const testClientKey = process.env.REACT_APP_TOSS_TCK;
const testClientSecretKey = process.env.REACT_APP_TOSS_TSK;

const {
    regPaymentInfo,
    sendMessageToStar,
} = AWSManager;


const SET_SEND_LOADING = 'payment/SET_SEND_LOADING';
const SET_SEND_END = 'payment/SET_SEND_END';

export const setSendLoading = createAction(SET_SEND_LOADING);
export const setSendEnd = createAction(SET_SEND_END);

export const openTossBankRequirement = async ({starId,name,price,userNm}) => {
    const tossPayments = await loadTossPayments(testClientKey);
    tossPayments.requestPayment('카드', {
        amount: price,
        orderId: "TEST"+Math.floor(Math.random()*9999999),
        orderName: `나의 최애 ${name} 님의 영상 메시지`,
        customerName: userNm,
        successUrl: `${process.env.REACT_APP_LOCATION}/write/${starId}`,
        failUrl: `${process.env.REACT_APP_LOCATION}/write/${starId}`,
    })
}

export const sendMessage = (info, type = '', subParam = '') => async (dispatch) => {
    dispatch(setSendLoading());
    try {
        await sendMessageToStar(info);
        console.log(type)
        switch(type) {
            case 'toss':
                await approveTossProcess(subParam);
                break;
            default:
                break;
        }
    } catch(error) {
        return Promise.reject(error);
    }
    dispatch(setSendEnd());
}

const approveTossProcess = async ({ paymentKey, orderId, amount }) => {
    axios.post(`https://api.tosspayments.com/v1/payments/${paymentKey}`, {
        orderId,
        amount
    }, {
        headers: {
            Authorization: `Basic ${Base64.encode(testClientSecretKey)}`
        }
    }).catch((error) => {
        return Promise.reject(error);
    })
}


export const submitPaymentInfo = async (info)  => {
    const { data, status } = await regPaymentInfo(info);
    if( status === 200 ) {
        return data
    } else {
        throw new Error('')
    }
}

const initialState = {
    isLoading: false,
}

function reducer(state = initialState, action) {
    switch(action.type) {
        case SET_SEND_LOADING:
            return {
                ...state,
                isLoading: true,
            }
        case SET_SEND_END:
            return {
                ...state,
                isLoading: false,
            }
        default:
            return {
                ...state
            };
    }
}

export default reducer;