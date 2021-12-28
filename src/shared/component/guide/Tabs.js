import { Tabs } from 'antd'
import React, { useState } from 'react'
import styled from 'styled-components'

const Tab = styled.div`
    width:100%;
    height:100px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:#fbfbfb;
    
    
    & > div {
        flex: 1 1 0px;
        display:inline-flex;
        justify-content:center;
        font-size: 28px;
        font-weight: bold;
        letter-spacing: -0.28px;
        cursor:pointer;
        height:100%;
        & > * {
            width:fit-content;
            color:#333;
            line-height:100px;
        }

        
        &.active {
            & > * {
                color:black;
                position:relative;
                &::before {
                    content:'';
                    position:absolute;
                    left:0px;
                    bottom:0px;
                    width:100%;
                    height:3px;
                    background-color:black;
                }
            }
        }
    }

    @media screen and (max-width: 750px) {
        & > div {
            font-size: min(5vw, 28px);
        }
        
    }

`

function TabsComponent({ children, value, defaultValue = 0 }) {
    const [active, setActive] = useState(defaultValue)
    
    return (
        <Tab>
            {React.Children.map(children, (child, index) => {
                if((!!child.props.onClick)) {
                    return (
                        <div className={value === index ? 'active' : ''} onClick={() => child.props.onClick()}>
                            {React.cloneElement(child, {onClick: undefined})}
                        </div>
                    )
                } else {
                    return (
                        <div className={active === index ? 'active' : ''} onClick={() => setActive(index)}>
                            {React.cloneElement(child, {onClick: undefined})}
                        </div>
                    )
                }
                
            })}
        </Tab>
    )

}

export default React.memo(TabsComponent);