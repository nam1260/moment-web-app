import React from 'react';
import styled from "styled-components"


const naverImage = "/assets/images/yhlee/payIcoNaver.png"
const kakaoImage = "/assets/images/yhlee/payIcoKakao.png"
const normalImage = "/assets/images/yhlee/payIcoNormal.png"

const PaymentBox = styled.div`
    width: 570px;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    overflow: hidden;

    @media (max-width: 750px) {
        width: 100%;
        margin-bottom: min(2vw, 20px);
    }
    
`

const NaverPaymentBox = styled(PaymentBox)`
    height: 120px;
    background-color:#00c73c;
    border: 2px solid #00c73c;
    @media (max-width: 750px) {
        height: min(14vw, 120px);
        & > img {
            width: min(40vw, 300px)
        }
    }

`

const KaKaoPaymentBox = styled(PaymentBox)`
    height: 120px;
    background-color:#ffdf00;
    border: 2px solid #ffdf00;
    @media (max-width: 750px) {
        height: min(14vw, 120px);
        & > img {
            width: min(40vw, 300px)
        }
    }
`

const NormalPaymentBox = styled(PaymentBox)`
    flex-direction: column;
    height: 158px;
    background-color:#ffffff;
    border: 2px solid #ff723a;
    & > div:first-child {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 31px;
        font-weight: 600;
        letter-spacing: -0.31px;
        
        & > img {
            width: 36x;
            height: 24px;
            margin-right: 12px;
        }

      
    }

    & > div:nth-child(2) {
        font-size: 24px;
        line-height: 0.92;
        letter-spacing: -0.24px;
        color: #8f8f8f;
        margin-top: 5px;

        
    }

    @media (max-width: 750px) {
        height: min(16vw, 120px);

        & > div:first-child {
            font-size: min(5vw, 31px);
            line-height: min(5vw, 48px);
            & > img {
                width: min(6vw, 36px);
                height: min(4vw, 24px);
                margin-right: min(2vw, 12px);
            }
        }

        & > div:nth-child(2) {
            font-size: min(4vw, 24px);
        }
    }
    
`

const NaverPayment = () => {
    return (
        <NaverPaymentBox>
            <img src={naverImage} alt="none" />
        </NaverPaymentBox>
    )
}

const KaKaoPayment = () => {
    return (
        <KaKaoPaymentBox>
            <img src={kakaoImage} alt="none" />
        </KaKaoPaymentBox>
    )
}

const NormalPayment = () => {
    return (
        <NormalPaymentBox>
            <div>
                <img src={normalImage} alt="none" />
                일반 결제
            </div>
            <div>
                카드결제, 무통장입금, 계좌이체
            </div>
        </NormalPaymentBox>
    )
}


const PaymentComponent = (WrappedComponent) => {

    return class extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}

export const NaverPaymentComponent = PaymentComponent(NaverPayment)
export const KaKaoPaymentComponent = PaymentComponent(KaKaoPayment)
export const NormalPaymentComponent = PaymentComponent(NormalPayment)