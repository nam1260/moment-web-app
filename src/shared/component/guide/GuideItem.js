import React from 'react'
import styled from 'styled-components'

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
    
    & >div > img {
        width: 100%;
    }
    

    @media (max-width: 750px) {
        & > span {
            font-size: min(7vw , 42px);
        }
    
        & > h3 {
            font-size: min(7vw , 44px);
            margin-bottom: 50px;
        }
    
        & > div {
            height: min(60vw , 320px);
            margin-bottom:min(10vw , 77px);
        }
        & > div > img{
            height: min(60vw , 320px);
        }
        

    }

`

const underLineImage = "/assets/images/present-num-box.png"

function GuideItemComponent({ title = "", index = 1, imgSrc= "" }) {
  
    return (
        <Item>
            <span>
                {"0" + index}
                <img alt="none" src={underLineImage} />
            </span>
            <h3>{title}</h3>
            <div>
                <img alt="none" src={imgSrc} />
            </div>
        </Item>
    )
}

export default React.memo(GuideItemComponent);