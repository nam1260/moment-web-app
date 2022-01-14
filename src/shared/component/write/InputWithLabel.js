import { Input, InputNumber } from 'antd';
import React from 'react';
import styled from "styled-components"

const Item = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:flex-star;
    white-space:pre-wrap;

    & > span {
        font-size: 20px;
        color: #8f8f8f;
        letter-spacing: -0.26px;
        cursor: default;
    }

    & > div {
        border-bottom: 2px solid #ddd;
        font-size: 20px;
        font-weight: bold;
        & > span, & > .ant-input-number {
            border: 0px;
            font-size: 16px;
        }
    }
    
    @media (max-width: 750px) {
        & > span {
            font-size: min(3vw, 20px);
        }
    
        & > div {
            font-size: min(5vw, 20px);
            color: #ff723a;
        }
    }
`

function InputWithLabel({ label = "", prefix = "", name="", onChange, inputValue, isNum = false }) {
    return (
        <Item>
            <span>
                {label}
            </span>
            <div>
                <Input placeholder={isNum ? '-를 제외한 숫자만 입력해주세요' : ''} name={name} value={inputValue[name]} type={`${isNum ? 'number' : 'text'}`} onChange={onChange} prefix={prefix}/>
            </div>
        </Item>
    )
}

export default React.memo(InputWithLabel);
