import React from 'react';
import styled from "styled-components"

const Item = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    white-space:pre-wrap;
    
    &:not(:first-child) {
        margin-top:60px;
    }

    & > span {
        font-size: 26px;
        color: #8f8f8f;
        letter-spacing: -0.26px;
    }

    & > div {
        border-bottom: 2px solid #ddd;
        font-size: 36px;
        font-weight: bold;
        letter-spacing: -0.36px;
        color: #ff723a;
        height: 70px;
    }
    
    @media (max-width: 750px) {
        & > span {
            font-size: min(4vw, 26px);
        }
    
        & > div {
            font-size: min(5vw, 36px);
            color: #ff723a;
            height:  min(8vw, 70px);
        }
    }
`

function WriteLabel({label = "", content = ""}) {
    return (
        <Item>
            <span>
                {label}
            </span>
            <div>
                {content}
            </div>
        </Item>
    )
}

export default React.memo(WriteLabel);
