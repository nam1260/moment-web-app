import React from 'react';
import styled from 'styled-components';
import StarRatingComponent from './StarRating.component'; 

const ItemBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-top: 60px;
    & > div:nth-child(2) {
        display: flex;
        justify-content: space-between;
        align-item: center;
        margin-top:15px;
        & > span:nth-child(1) {
            font-size: 32px;
            font-weight: 500;
            line-height: 1.25;
            letter-spacing: -0.32px;
            margin-top: auto;
            margin-bottom: auto;
            white-space:pre-wrap;
        }

        & > span:nth-child(2) {
            min-width: 100px;
            width:100px;
            height: 100px;
            overflow: hidden;
            border-radius: 100px;
            display: block;
            

            & > img {
                position: relative;
                top:0px;
                left:0px; 
            }
        }
        
    }

    & > div:nth-child(3) {
        font-size: 28px;
        line-height: 1.29;
        letter-spacing: -0.28px;
        color: rgba(143, 143, 143, 0.8);
        display:flex;
        & > span {
            display:inline-block;
            margin: auto 15px;
            width: 5px;
            height: 5px;
            border-radius: 5px;
            background-color: rgba(143, 143, 143, 0.8);
        }
    }

    @media (max-width: 750px) {
        & > div:nth-child(2) {
            margin-top:min(3vw, 15px);
            & > span:nth-child(1) {
                font-size: min(6vw, 32px);
            }
    
            & > span:nth-child(2) {
                min-width: min(12vw, 100px);
                width: min(12vw, 100px);
                height: min(12vw, 100px);
                border-radius: min(12vw, 100px);
            }
            
        }
    
        & > div:nth-child(3) {
            font-size: min(5vw, 28px);
        }

    }
`

const homeThum1_1 = "/assets/images/thum160Px1.png";

function CommentOfFanComponent({ comment = '', score = 0}) {
    return (
        <ItemBox>
            <StarRatingComponent score={score} />
            <div>
                <span>{comment}</span>
                <span><img src={homeThum1_1} alt="none" /></span>
            </div>
            <div>
                2021.07.22 <span></span> 스타빅팬
            </div>
        </ItemBox>
    )
}

export default React.memo(CommentOfFanComponent);

