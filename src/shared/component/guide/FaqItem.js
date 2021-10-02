import { useState } from "react"
import styled from "styled-components"


const downArrow = "/assets/icons/list-ico-open.png"
const upArrow = "/assets/icons/list-ico-close.png"

const Item = styled.div`
    display:flex;
    white-space:pre-wrap;
    
    & > span {
        margin-right:15px;
        font-size: 36px;
        font-weight: bold;
        letter-spacing: -0.9px;
        color: #bababa;
    }

    & > section {
        flex: 1;
        & > h3 {
            font-size: 34px;
            font-weight: 500;
            letter-spacing: -0.85px;
            text-align: left;
            margin-bottom:0px;
        }

        & > div {
            font-family: AppleSDGothicNeo;
            font-size: 28px;
            font-weight: normal;
            font-stretch: normal;
            font-style: normal;
            letter-spacing: -0.7px;
            text-align: left;
            color: #8f8f8f;
            transition: line-height .2s ease-in-out;
            line-height: 0;
            overflow:hidden;
            margin-bottom:107px;
            & > p {
                margin-bottom:0px;
                & > span {
                    color: #ff723a
                }
            }
            &.on {
                line-height: 1.36;
            }
        }
    }

    & > div:last-child > img {
        cursor:pointer;
    }

    @media (max-width: 750px) {

        & > span {
            margin-right:15px;
            font-size: min(6vw , 36px);
        }
    
        & > section {
            & > h3 {
                font-size: min(6vw , 34px);
            }
    
            & > div {
                font-size: min(5vw , 28px);
                margin-bottom:min(15vw , 28px);
            }
        }

        & > div > img {
            width:min(8vw, 45px);
            height:min(8vw, 45px);
        }

    }
`

export default function FaqItem({title = "", des = ""}) {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <Item>
            <span>Q</span>
            <section>
                <h3>
                    {title}
                </h3>
                <div className={isOpen ? 'on' : ''}>
                    {des}
                </div>
            </section>
            <div >
                <img onClick={() => {setIsOpen(!isOpen)}} src={isOpen ? downArrow : upArrow} />
            </div>
            
        </Item>
    )
}