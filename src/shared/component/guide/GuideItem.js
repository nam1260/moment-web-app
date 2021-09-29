import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'

const Item = styled.div`
    display:flex;
    flex-direction: column;
    
    & > * {
        margin-left:auto;
        margin-right:auto;
    }

    & > span {
        
        font-size: 42px;
        font-weight: 800;
        line-height: 1.33;
        letter-spacing: normal;
        color: #ff723a;
        position:relative;
        & > img {
            position:absolute;
            bottom:20%;
            left:50%;
            transform:translateX(-50%);
        }
    }

    & > h3 {
        font-size: 44px;
        font-weight: 800;
        line-height: 1.27;
        letter-spacing: -1.1px;
        margin-bottom: 50px;
        white-space:pre-wrap;
        text-align:center;
    }

    & > div {
        width: 100%;
        height: 320px;
        background-color: #e0e0e0;
        margin-bottom:77px;
    }


`

const underLineImage = "/assets/images/yhlee/present-num-box.png"

export default function GuideItemComponent({ title = "", index = 1 }) {
  
    return (
        <Item>
            <span>
                {"0" + index}
                <img src={underLineImage} />
            </span>
            <h3>{title}</h3>
            <div>
                -
            </div>
        </Item>
    )
}