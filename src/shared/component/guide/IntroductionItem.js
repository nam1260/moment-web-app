import React, { useEffect, useState } from 'react'
import styled, { ThemeProvider } from 'styled-components'

const Item = styled.div`
    display:flex;
    flex-direction: column;
    margin-bottom:92px;
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
        margin-bottom:19px;
    }

    & > p {
        font-size: 26px;
        line-height: 1.46;
        letter-spacing: -0.65px;
        color: #8f8f8f;
        white-space:pre-wrap;
    }

    @media (max-width: 750px) {
        margin-bottom: min(20vw, 92px);
        & > img {
            width:min(80vw, 750px)
        }

        & > span {
            font-size: min(7vw , 42px);
        }
    
        & > h3 {
            font-size: min(7vw , 44px);
        }
    
        & > p {
            font-size: min(4vw , 26px);
        }
    }
`

const underLineImage = "/assets/images/yhlee/present-num-box.png"

export default function GuideItemComponent({ title = "", des = "", imgPath = "", index = 1 }) {
  
    return (
        <Item>
            <span>
                {"0" + index}
                <img src={underLineImage} />
            </span>
            <h3>{title}</h3>
            <p>{des}</p>
            <img src={imgPath} alt="none"/>
        </Item>
    )
}