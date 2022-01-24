import createAction from "redux-actions/lib/createAction";
import AWSManager from "managers/AWSManager";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { Base64 } from "js-base64";
import axios from "axios";
import dotenv from "dotenv";
import { getRegPaymentBaseParam, getRndNumber } from "shared/func";
import { PAYMENT_STATUS, PAYMENT_TYPE } from "consts/payment";
dotenv.config();

const testClientKey = process.env.REACT_APP_TOSS_TCK;
const testClientSecretKey = process.env.REACT_APP_TOSS_TSK;

const { regPaymentInfo, sendMessageToStar, updatePaymentInfo } = AWSManager;

const SET_SEND_LOADING = "payment/SET_SEND_LOADING";
const SET_SEND_END = "payment/SET_SEND_END";
const SET_PAYNO = "payment/SET_PAYNO";
export const setSendLoading = createAction(SET_SEND_LOADING);
export const setSendEnd = createAction(SET_SEND_END);
export const setPayNo = createAction(SET_PAYNO, (payNo) => payNo);

export const openTossBankRequirement =
  (starId, userId, price, name, userNm) =>
  async (dispatch) => {
    const param = getRegPaymentBaseParam(
      userId,
      starId,
      PAYMENT_TYPE.TOSS,
      PAYMENT_STATUS.BEFORE,
      price
    );
    try {
      const { isSuccess, payNo } = await submitPaymentInfo(param);
      dispatch(setPayNo(payNo));
      if (isSuccess) {
        const tossPayments = await loadTossPayments(testClientKey);
        const location = window.location.href.match(/https?:\/\/[^/?]+/)[0];
        tossPayments.requestPayment("카드", {
          amount: price,
          orderId: `TOSSPAY${payNo}_${getRndNumber(8)}`,
          orderName: `나의 최애 ${name} 님의 영상 메시지`,
          customerName: userNm,
          successUrl: `${location}/write/${starId}?payNo=${payNo}`,
          failUrl: `${location}/write/${starId}?payNo=${payNo}`,
        });
      }
    } catch (error) {
        console.log(error)
    }
  };

export const sendMessage =
  (info, type = "", subParam = "") =>
  async (dispatch) => {
    dispatch(setSendLoading());
    try {
      await sendMessageToStar(info);
      switch (type) {
        case "toss":
          const { data } = await approveTossProcess(subParam);
          await updatePaymentInfo({
            payNo: info.payNo,
            userId: info.userId,
            payStatus: PAYMENT_STATUS.COMPLETE,
            orderId: subParam.orderId,
            aprvNum: data.card.approveNo,
            cardNm: data.card.company,
            cardNum: data.card.number,
          })
          break;
        default:
          break;
      }
    } catch (error) {
      return Promise.reject(error);
    }
    dispatch(setSendEnd());
  };

const approveTossProcess = async ({ paymentKey, orderId, amount }) => {
  const response = await axios
    .post(
      `https://api.tosspayments.com/v1/payments/${paymentKey}`,
      {
        orderId,
        amount,
      },
      {
        headers: {
          Authorization: `Basic ${Base64.encode(`${testClientSecretKey}:`)}`,
        },
      }
    )
    .catch((error) => {
      return Promise.reject(error);
    });
    return response;
};

export const submitPaymentInfo = async (info) => {
  const { data, status } = await regPaymentInfo(info);
  if (status === 200) {
    return data;
  } else {
    throw new Error("");
  }
};

const initialState = {
  isLoading: false,
  payNo: "",
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_SEND_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case SET_SEND_END:
      return {
        ...state,
        isLoading: false,
      };
    case SET_PAYNO:
      return {
        ...state,
        payNo: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
}

export default reducer;
