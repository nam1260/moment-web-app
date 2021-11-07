import MomentModal from "../common/modal";
import styled from 'styled-components';
import { NaverPaymentComponent, KaKaoPaymentComponent, NormalPaymentComponent } from './PaymentType';

const PaymentComponent = styled.div`
    margin: 40px;
    padding-top: 20px;
    & > div:first-child {
        font-size: 36px;
        letter-spacing: -0.36px;
        font-weight: 500;
        text-align: center;
        height: 40px;
        line-height: 40px;
        margin-bottom: 40px;

        @media (max-width: 750px) {
            font-size: min(5vw, 36px);
            margin-bottom: min(3vw, 40px);
        }
    }

    & + .footer > .confirm {
        background-color: #f0f0f0 !important;
        color: black !important;
    }

    @media (max-width: 750px) {
        margin: min(3vw, 40px);
        padding-top: min(1vw, 20px);
    }
`


export default function PaymentModal({ isModalOpen, setIsModalOpen  }) {


    return (
        <MomentModal
            isOpen={isModalOpen}
            confirmText={'취소'}
            contentComponent={
                <PaymentComponent>
                    <div>결제 방식을 선택해주세요</div>
                    <NaverPaymentComponent />
                    <KaKaoPaymentComponent />
                    <NormalPaymentComponent />
                </PaymentComponent>
            }
            onClickHandlerConfirm={() => setIsModalOpen(false)}
            width={650}
            height={760}
        />
    )
}