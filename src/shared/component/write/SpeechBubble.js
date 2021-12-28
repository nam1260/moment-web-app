import React from 'react';
import styled from "styled-components"

const Item = styled.div`
    display:inline-block;
    background-color:#ff723a;
    color:white;
    font-size: 26px;
    font-weight: 600;
    letter-spacing: -0.26px;
    padding: 10px 20px;
    border-radius:5px;
    position:relative;

    &::after {
        content:'';
        position:absolute;
        width:0px;
        height:0px;
        border-left: 20px solid #ff723a;
        border-bottom: 20px solid transparent;
        bottom:-19px;
        right:20px;

    }
    
    @media (max-width: 750px) {
        font-size: min(3vw, 26px);

        &::after {
            border-left: min(3vw, 20px) solid #ff723a;
            border-bottom: min(3vw, 20px) solid transparent;
            right:min(3vw, 20px);
            bottom:max(-2.5vw, -19px);
            width:0px;
            height:0px;
        }
    }
`

function SpeechBubble({ content = '' }) {

    return (
        <Item>
            {content}
        </Item>
    )
}

export default React.memo(SpeechBubble);
