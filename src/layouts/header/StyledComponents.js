/**
 *  Copyright (c) 2021 Moment Corp.
 *  All rights reserved. http://www.youronlymoment.com/
 *
 *  This software is the confidential and proprietary information of
 *  Moment Corp. ("Confidential Information"). You shall not
 *  disclose such Confidential Information and shall use it only in
 *  accordance with the terms of the license agreement you entered into
 *  with Moment.
 */

/**
 * StyledComponents
 * @author wook
 * @since 2021/07/22
 * 앱 Header 영역 StyledComponents
 */

import styled from "styled-components";
import * as Color from "../../resources/Color";


const LeftArea = styled.div`
    position: absolute;
    left: 10%;
    text-align: left;
    
`
const RightArea = styled.div`
    position: absolute;
    right: 10%;
    text-align: left;
`

const IconWrapper = styled.div`
    display: inline-block;
    vertical-align: middle;
`


const HeaderIcon = styled.img`
    position: relative;
    
    &.hovered {
        -webkit-transform: scale(1.1);
    }
  
    width: ${props => (props.isAppLogo ? "10vh;" : "5vh;")}
    height: ${props => (props.isAppLogo ? "10vh;" : "5vh;")}
  
`


export default {
    LeftArea,
    RightArea,
    IconWrapper,
    HeaderIcon,
}

