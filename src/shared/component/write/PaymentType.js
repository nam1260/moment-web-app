import React from 'react';
import styled from "styled-components"

const naverImage = "/assets/images/payIcoNaver.png"
const kakaoImage = "/assets/images/payIcoKakao.png"
const normalImage = "/assets/images/payIcoNormal.png"
const tossImage = "/assets/images/payIcoToss.png"

const PaymentBox = styled.div`
    height: 80px;
    border-radius: 4px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    & > img {
        height: 100%
    }
    @media (max-width: 750px) {
        width: 48%;
        margin-bottom: min(2vw, 20px);
    }
`

const NaverPaymentBox = styled(PaymentBox)`
    background-color:#00c73c;
    border: 2px solid #00c73c;
    @media (max-width: 750px) {
        height: min(14vw, 120px);
        
    }

`

const KaKaoPaymentBox = styled(PaymentBox)`
    background-color:#ffdf00;
    border: 2px solid #ffdf00;
    @media (max-width: 750px) {
        height: min(14vw, 120px);
    }
`

const TossPaymentBox = styled(PaymentBox)`
    border: 2px solid #0064ff;
    & > img {
        height: 100%;
    }
    @media (max-width: 750px) {
        height: min(14vw, 120px);
    }
    
    
      & > div:first-child {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: 600;
        letter-spacing: -0.31px;
        
        & > img {
            width: 36x;
            height: 24px;
            margin-right: 12px;
        }
    }

    & > div:nth-child(2) {
        font-size: 16px;
        line-height: 0.92;
        letter-spacing: -0.24px;
        color: #8f8f8f;
        margin-top: 5px;
    }
    
    @media (max-width: 750px) {
        height: min(14vw, 120px);

        & > div:first-child {
            font-size: min(3vw, 24px);
            line-height: min(4vw, 24px);
            & > img {
                width: min(6vw, 36px);
                height: min(4vw, 24px);
                margin-right: min(2vw, 12px);
            }
        }

        & > div:nth-child(2) {
            font-size: min(2vw, 16px);
        }
    }
    
`

const NormalPaymentBox = styled(PaymentBox)`
    flex-direction: column;
    background-color:#ffffff;
    border: 2px solid #ff723a;
    & > div:first-child {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: 600;
        letter-spacing: -0.31px;
        
        & > img {
            width: 36x;
            height: 24px;
            margin-right: 12px;
        }
    }

    & > div:nth-child(2) {
        font-size: 16px;
        line-height: 0.92;
        letter-spacing: -0.24px;
        color: #8f8f8f;
        margin-top: 5px;

        
    }

    @media (max-width: 750px) {
        height: min(14vw, 120px);

        & > div:first-child {
            font-size: min(3vw, 24px);
            line-height: min(4vw, 24px);
            & > img {
                width: min(6vw, 36px);
                height: min(4vw, 24px);
                margin-right: min(2vw, 12px);
            }
        }

        & > div:nth-child(2) {
            font-size: min(2vw, 16px);
        }
    }
    
`

const NaverPayment = ({onClick}) => {
    return (
        <NaverPaymentBox onClick={onClick}>
            <img src={naverImage} alt="none" />
        </NaverPaymentBox>
    )
}

const KaKaoPayment = ({onClick}) => {
    return (
        <KaKaoPaymentBox onClick={onClick}>
            <img src={kakaoImage} alt="none" />
        </KaKaoPaymentBox>
    )
}

const TossPayment = ({onClick}) => {
    return (
        <TossPaymentBox onClick={onClick}>
            <div>
                <img src={normalImage} alt="none" />
                카드 결제
            </div>
        </TossPaymentBox>
    )
}


const NormalPayment = ({onClick}) => {
    return (
        <NormalPaymentBox onClick={onClick}>
            <div>
                <img src={normalImage} alt="none" />
                일반 결제
            </div>
            <div>
                무통장입금, 계좌이체
            </div>
        </NormalPaymentBox>
    )
}


const PaymentComponent = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            return <WrappedComponent {...this.props} />
        }
    }
}

export const NaverPaymentComponent = React.memo(PaymentComponent(NaverPayment));
export const KaKaoPaymentComponent = React.memo(PaymentComponent(KaKaoPayment));
export const NormalPaymentComponent = React.memo(PaymentComponent(NormalPayment));
export const TossPaymentComponent = React.memo(PaymentComponent(TossPayment));