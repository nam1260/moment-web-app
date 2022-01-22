import { PAYMENT_TYPE, PAYMENT_STATUS } from "consts/payment";

export function debounce(fn , duration = 1000) {
    if(typeof fn !== 'function') {
        throw Error('debounce needs function..');
    } else {
        let functionId = undefined;
        return (...args) => {
            if(functionId !== undefined) {
                clearTimeout(functionId)
            }
            
            functionId = setTimeout(() => {
                fn(...args);
                clearTimeout(functionId);
                functionId = undefined;
            }, duration);
        }
    }
}

export function getRegPaymentBaseParam(userId, starId, payType, payStatus, price){
    let param = {
        userId,
        starId,
        payType,
        payStatus,
        price,
        userBankNm: '',
        userAccountNm: '',
        userAccountNum: '',
        emPhoneNum: '',
        cardNm: '', 
        cardNum: '',
        aprvNum: '',
    }
    switch(payType) {
        case PAYMENT_TYPE.NORMAL:
            param.pgNm = 'normal'
            break;
        case PAYMENT_TYPE.TOSS:
            param.pgNm = 'tossPay'
            break;
    }
    return param;
}

export function getRndNumber(pad) {
    return Array(pad).fill('').map(() => Math.floor(Math.random()*10)).join('');
}