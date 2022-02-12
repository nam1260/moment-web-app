import createAction from "redux-actions/lib/createAction";
import AWSManager from "managers/AWSManager";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { Base64 } from "js-base64";
import axios from "axios";
import dotenv from "dotenv";
import { getRegPaymentBaseParam, getRndNumber, isMobile } from "shared/func";
import { PAYMENT_STATUS, PAYMENT_TYPE } from "consts/payment";
import KaKaoPaymentService from 'shared/kakao.service';
import StorageManager from "managers/StorageManager";
import { message } from "antd";

dotenv.config();

const testClientKey = process.env.REACT_APP_TOSS_TCK;
const testClientSecretKey = process.env.REACT_APP_TOSS_TSK;
const testNaverClientKey = "np_qupzy880269";
const kakaoServerProxy = new KaKaoPaymentService();
const { regPaymentInfo, sendMessageToStar, updatePaymentInfo } = AWSManager;

const SET_SEND_LOADING = "payment/SET_SEND_LOADING";
const SET_SEND_END = "payment/SET_SEND_END";
const SET_PAYNO = "payment/SET_PAYNO";
export const setSendLoading = createAction(SET_SEND_LOADING);
export const setSendEnd = createAction(SET_SEND_END);
export const setPayNo = createAction(SET_PAYNO, (payNo) => payNo);

const oPay = window.Naver ? window.Naver.Pay.create({
  "mode": "production",
  "clientId": testNaverClientKey
}) : false;

export const openNaverBankRequirement = () => {
  if(!oPay) return false;
  
  oPay.open({
    "merchantUserKey": testNaverClientKey,
    "merchantPayKey": testNaverClientKey,
    "productName": "상품명을 입력하세요",
    "totalPayAmount": "1000",
    "taxScopeAmount": "1000",
    "taxExScopeAmount": "0",
    "returnUrl": "사용자 결제 완료 후 결제 결과를 받을 URL"
  });
}

export const openKaKaoRequirement = 
  (starId, userId, price, name) => 
  async (dispatch) => {
  
  const location = window.location.href.match(/https?:\/\/[^/?]+/)[0];
  const param = getRegPaymentBaseParam(
    userId,
    starId,
    PAYMENT_TYPE.KAKAO,
    PAYMENT_STATUS.BEFORE,
    price
  );
  try {
    const { isSuccess, payNo } = await submitPaymentInfo(param);
    dispatch(setPayNo(payNo));
    kakaoServerProxy.prepareApiParameter = {
      total_amount: price,
      partner_order_id: payNo,
      partner_user_id: userId,
      item_name: `나의 최애 ${name} 님의 영상 메시지`,
      item_code: `KAKAOPAY${payNo}_${getRndNumber(8)}`,
      tax_free_amount: 0,
      approval_url: `${location}/write/${starId}?payNo=${payNo}&isSuccess=true&payType=kakao`,
      cancel_url: `${location}/write/${starId}?payNo=${payNo}`,
      fail_url: `${location}/write/${starId}?payNo=${payNo}`,
    };
    const { status, data } = await kakaoServerProxy.prepare();
    if ( status === 200 ) {
      StorageManager.save("kakaoPayInfo", JSON.stringify({
        partner_order_id: payNo,
        partner_user_id: userId,
        tid: data.tid,
      }));
      if( isMobile() ) {
        window.location.replace(data.next_redirect_mobile_url)
      } else {
        window.location.replace(data.next_redirect_pc_url)
      }
    }
  } catch (error) {
    console.log(error);
  }
 
}

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
          successUrl: `${location}/write/${starId}?payNo=${payNo}&isSuccess=true&payType=toss`,
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
      switch (type) {
        case "toss": {
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
        }
        case "kakao": {
            const kakaoInfo = JSON.parse(StorageManager.load("kakaoPayInfo"))
            const { data, status } = await approveKaKaoProcess({...kakaoInfo, ...subParam});
            if (status !== 200) {
              dispatch(setSendEnd());
              message.error("카카오 결제에 실패하였습니다.");
              return;
            }
            
            await updatePaymentInfo({
              payNo: info.payNo,
              userId: info.userId,
              payStatus: PAYMENT_STATUS.COMPLETE,
              orderId: subParam.pgToken,
              aprvNum: data.payment_method_type === 'MONEY' ? '' : data.card_info.approved_id,
              cardNm: data.payment_method_type === 'MONEY' ? '' :data.card_info.issuer_corp,
              cardNum: data.payment_method_type === 'MONEY' ? '' :data.card_info.card_mid,
            })
        }
        default:
          break;
      }
      await sendMessageToStar(info);
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

const approveKaKaoProcess = async (props) => {
  StorageManager.remove('kakaoPayInfo')
  return await kakaoServerProxy.approve(props);
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
