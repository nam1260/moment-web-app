import MomentModal from "../common/modal";
import styled from 'styled-components';
import InputWithLabel from "./InputWithLabel";
import { BankOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { message } from "antd";

const DepositComponent = styled.div`
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

    @media (max-width: 750px) {
        font-size: min(5vw, 36px);
    }
`

const DepositInfoBox = styled.div`
    font-size: 20px;
    text-align: center;
    color: #ff723a;
    @media (max-width: 750px) {
        font-size: min(3vw, 20px);
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

const DepositLabel = styled.div`
    font-size: 20px;
    color: #2032b3;
    line-height: 1;
    margin-bottom: 10px;
    @media (max-width: 750px) {
        font-size: min(3vw, 20px);
        margin-bottom: min(1vw, 10px);
    }
`

const DepositRow = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;
    margin-bottom: 5px;
    & > div {
        flex: 1;
    }
    cursor: pointer;
`

const RegisterButton = styled.button`
    border: 0px;
    border-radius: 5px;
    background-color: #ff723a;
    color: white;
    font-size: 20px;
    cursor: pointer;
    height: 40px;
`


export default function DepositWithoutPassbookModal({ isModalOpen, setIsModalOpen, onSuccess, ...rest  }) {
    const { starDetail: { starId }, user: { userId }, price, register, reset, payment } = rest;
    
    const [depositInfo, setDepositInfo] = useState({
        'bankNm': '',
        'accountNumber': '',
        'accountHolder': '',
        'phoneNumber': '',
    });

    useEffect(() => {
        reset();
    }, [])

    useEffect(() => {
        if(payment.isSuccess && payment.paymentNo !== '') {
            setIsModalOpen(false);
            onSuccess().then(() => {
                reset();
            })
        }
    }, [payment])

    const handleChange = (e) => {
        let { name, value } = e.target;
        if(name === 'accountNumber' || name === 'phoneNumber') {
            value = value.replace(/[^0-9]/g, '');
        }
        setDepositInfo((deposit) => ({
            ...deposit,
            [name]: value,
        }))
    }

    const checkIsBlank = (value) => {
        if(String(value).trim() === '') {
            throw {
                type: 'isBlank',
                error: new Error(),
            }
        }
    }

    const checkIsOnlyNumber = (value) => {
        if((/[^0-9]/g).test(String(value))) {
            throw {
                type: 'isNotNumber',
                error: new Error(),
            }
        }
    }

    const checkPhoneNumberisValid = (phoneNumber) => {
        if( String(phoneNumber).length < 10 || 11 < String(phoneNumber).length ) {
            throw {
                type: 'phoneInvalid',
                error: new Error(),
            }
        }
    }

    const submitDepositData = () => {
        let targetKey = ''
        try {
            for(const key in depositInfo) {
                targetKey = key;
                const value = depositInfo[key];
                checkIsBlank(value);
                if(key === 'accountNumber' || key === 'phoneNumber') {
                    checkIsOnlyNumber(value);
                }
                if(key === 'phoneNumber') {
                    checkPhoneNumberisValid(value);
                }
            }
        } catch(error) {
            document.querySelector(`input[name=${targetKey}]`).focus();
            switch(error.type) {
                case 'isBlank':
                    message.warn('모든 정보를 입력해주세요.');
                    break;
                case 'isNotNumber':
                    message.warn('숫자만 입력해주세요.');
                    break;
                case 'phoneInvalid':
                    message.warn('휴대폰 번호는 10-11자리로 입력해주세요.');
                    break;
                default:
                    break;
            }
            return;
        }

        const param = {
            userId: userId,
            starId: starId,
            payType: 0, /* 우선 0 고정 */
            price: price,
            payStatus: 0,
            pgNm: 'normal',
            userBankNm: depositInfo['accountHolder'],
            userAccountNm: depositInfo['bankNm'],
            userAccountNum: depositInfo['accountNumber'],
            cardNm: '', 
            cardNum: '',
            aprvNum: '',
        }
        try {
            register(param);
        } catch(error) {
            console.log(error);
        }
        
    }

    return (
        <MomentModal
            isOpen={isModalOpen}
            confirmText={'취소'}
            contentComponent={
                <DepositComponent>
                    <ModalTitle>계좌 이체 안내</ModalTitle>
                    <DepositInfoBox>
                        현재는 계좌이체만 가능합니다.<br />
                        곧 연결 될 간편결제 서비스를 기대 해 주세요!
                    </DepositInfoBox>
                    <Divider />
                    <DepositLabel>
                        입금 하실 계좌 정보<br />
                        신한은행 110535500698<br />
                        예금주 : 박재영(모먼트)<br />
                        (미입금 상태 24시간 경과 시 사연 전송이 취소됩니다)
                    </DepositLabel>
                    <DepositRow>
                        <InputWithLabel inputValue={depositInfo} onChange={handleChange} name={'bankNm'} prefix={<BankOutlined />} label='입금 은행 명' />
                        <InputWithLabel inputValue={depositInfo} onChange={handleChange} name={'accountNumber'} prefix={<BankOutlined />} label='입금 계좌번호(환불시 받을 계좌 동일)' />
                        <InputWithLabel inputValue={depositInfo} onChange={handleChange} name={'accountHolder'} prefix={<UserOutlined />} label='입금자 명(실명과 일치해야 합니다)' />
                        <InputWithLabel inputValue={depositInfo} onChange={handleChange} name={'phoneNumber'} prefix={<PhoneOutlined />} label='연락처' />
                        <RegisterButton onClick={submitDepositData}>사연 등록 하기</RegisterButton>
                    </DepositRow>
                </DepositComponent>
            }
            onClickHandlerConfirm={() => setIsModalOpen(false)}
            width={650}
            height={730}
        />
    )
}