import MomentModal from "../common/modal";
import styled from 'styled-components';
import { NaverPaymentComponent, KaKaoPaymentComponent, NormalPaymentComponent, TossPaymentComponent } from './PaymentType';
import { useCallback } from "react";



const PaymentComponent = styled.div`
    display: flex;
    flex-direction: column;
    margin: 40px;
    padding-top: 20px;
    flex: 1;
    justify-content: flex-end;
    & + .footer > .confirm {
        background-color: #f0f0f0 !important;
        color: black !important;
    }

    @media (max-width: 750px) {
        margin: min(3vw, 40px);
        padding-top: min(1vw, 20px);
    }
`

const ModalTitle = styled.div`
    text-align: center;
    font-size: 36px;
    letter-spacing: -0.36px;
    font-weight: 700;
    margin-bottom : 20px;

    @media (max-width: 750px) {
        font-size: min(5vw, 36px);
    }
`

const PaymentInfoBox = styled.div`
    & > div {
        margin-bottom : 10px;
        @media (max-width: 750px) {
            margin-bottom : min(1vw, 10px);
        }
    }
    & > .payment-info-title {
        font-size: 34px;
        font-weight: 600;

        @media (max-width: 750px) {
            font-size: min(4vw, 34px);
        }
    }

    & > .payment-info-label {
        padding-left: 20px;
        font-size: 30px;
        font-weight: 600;
        & >span {
         color: #ff723a;
        }
        & >span#subText {
         font-size: 18px;
         color: gray;
        }
        @media (max-width: 750px) {
            font-size: min(4vw, 30px);
        }
    }

    & > .payment-info-money {
        font-size: 30px;
        font-weight: 600;
        text-align: right;
        color: #ff723a;
         & > span{
            font-size: 20px;
            color: #808080;
        }
        @media (max-width: 750px) {
            font-size: min(4vw, 30px);
              & > span { 
               font-size: min(2vw, 24px);
            }
        }
    }
`

const Divider = styled.div`
    width: 100%;
    border: 1px solid #ededed;
    margin: 10px;
    @media (max-width: 750px) {
        margin: min(1vw, 10px);
    }
`

const PaymentLabel = styled.div`
    font-size: 30px;
    letter-spacing: -0.36px;
    font-weight: 500;
    text-align: left;
    
    margin-bottom: 10px;
    @media (max-width: 750px) {
        font-size: min(4vw, 30px);
        margin-bottom: min(1vw, 10px);
    }
`

const PaymentRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 5px;
    margin-bottom: 5px;
    & > div {
        flex: 1;
    }
    cursor: pointer;
`


export default function PaymentModal({
    isModalOpen,
    setIsModalOpen,
    paymentNormalButtonClick,
    name,
    price,
    starId,
    userId,
    openTossBankRequirement,
    userNm
}) {


    return (
        <MomentModal
            isOpen={isModalOpen}
            confirmText={'??????'}
            contentComponent={
                <PaymentComponent>
                    <ModalTitle>?????? ?????? ??????</ModalTitle>
                    <PaymentInfoBox>
                        <div className='payment-info-title'>
                            ?????? ?????? ??????
                        </div>
                        <div className='payment-info-label'>
                            <span>?????? ??????</span> {name} ?????? ?????? ????????? <br/><span id="subText">(?????? ?????? : ?????? ??????, ?????? ??????)</span>
                        </div>
                        <div className='payment-info-money'>
                            {price.toLocaleString('ko-KR')}???   <span>????????? ?????? ??????</span>
                        </div>
                    </PaymentInfoBox>
                    <Divider />
                    <PaymentLabel>?????? ????????? ??????????????????</PaymentLabel>
                    <PaymentRow>
                        {/*<NaverPaymentComponent onClick={paymentButtonClick} />*/}
                        {/*<KaKaoPaymentComponent onClick={paymentButtonClick}/>*/}
                    </PaymentRow>
                    <PaymentRow>
                        <TossPaymentComponent onClick={() => openTossBankRequirement(starId, userId, price, name)}/>
                        <NormalPaymentComponent onClick={paymentNormalButtonClick}/>
                    </PaymentRow>
                </PaymentComponent>
            }
            onClickHandlerConfirm={() => setIsModalOpen(false)}
            width={650}
            height={730}
        />
    )
}