

import React, { useEffect } from "react";
import Styled from "styled-components"
import { useHistory } from "react-router";


const ICON_QUESTION = "/assets/icons/ico-question.png";
const dummyIcon = "/assets/icons/main-ico-dummy.png";
const plusIcon = "/assets/icons/main-plus-request.png";

const SERVEY_URL = "https://docs.google.com/forms/d/e/1FAIpQLScHxVABrNFNAU2y180xopkBvSvZIbre7GuIwzBtiqsbgEUJjg/viewform"

/**
 * requestStar
 * @author wook
 * @since 2021/12/26
 * description
 */
const StyledReuqestStar = Styled.section`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 1.3em;
    font-weight: 600;
    margin-top: 102px;
    margin-bottom: 50px;
    cursor: pointer;
    & > div {
    
        display: flex;
        flex-direction: column;
        
        & > h3 {
            display: flex;
            align-items: center;
            margin-bottom: 32px;
            font-size: 34px;
            font-weight: 800;
            letter-spacing: -0.34px;
            color: #101010;
            
            & > img {
                max-width: 44px;
                margin: 0px 9px 0px 43px;
            }
        }
        
        & > div {
        
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex: 1 1;
            overflow-x: auto;
            margin-left: 50px;
            
            & > article {
            
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                flex: 1 1;
                margin-right: 5px;
                border-radius: 4px;
                
                & > div {
                    width: 100%;
                    height: 200px;
                    overflow: hidden;
                    position: relative;
                    border-radius: 40px;
                    background-color: rgb(255, 114, 58);
                    margin-right: 0px;
                    text-align: center;
                    
                    & > .none-logo{
                        position: absolute;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                    }
                    & > .plus-img{
                        position: relative;
                        margin-top: 140px;
                    }
                    & > span{
                        position: relative;
                        top: 35%;
                        color: white;
                    }
                }
                
            }
        }
    }
    
    @media (max-width: 750px) {
    
        margin-top: 13vh;
    
        & > div > h3 > span {
            font-size: min(7vw, 34px);
        }
    
        & > div > h3 > img {
            margin: 0px 9px 0px 3vw;
        }
    
        & > div > div {
            margin-left:3vw;
        }
        & > div > h3 {
            margin-bottom: min(3vw, 32px);
        }
    
    }
    
`

//TODO 클릭 시 링크 처
const RequestStar = () => {
    console.log("RequstStar");
    const history = useHistory();
    return (
        <StyledReuqestStar>
            <div className="container">
                <h3>
                    <img alt="none" src={ICON_QUESTION}/>
                    <span>내가 찾는 최애가 없다면 ↓↓↓</span>
                </h3>
                <div>
                    <article>
                        <div className="img-content" onClick={()=>{console.log("onclick"); window.open(SERVEY_URL, '_blank')}}>
                            <img className={'none-logo'} alt="none" src={dummyIcon} style={{ opacity: 0.6 }} />
                            <img className={'plus-img'} alt="none" src={plusIcon} />
                            <span> 딱 30초만에 요청하세요!</span>
                        </div>
                    </article>
                </div>
            </div>
        </StyledReuqestStar>
    )
}
export default RequestStar;