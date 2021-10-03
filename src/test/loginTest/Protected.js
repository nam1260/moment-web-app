/**
 * Protected
 * @author wook
 * @since 2021/07/31
 * description
 */

import React, {useEffect} from 'react'
import {Auth} from 'aws-amplify'
import Container from './Container'

function Protected(props) {

    //useEffect 의 첫번째 인수는 이 컴포넌트가 랜더링 될 때  사용된다.
    //빈 배열을 두번째 인수로 전달하면 컴포넌트가 마운트 될 때 한번만 호출되도록 할 수 있다.
    //ex

    /**
     * class 형태의 컴포너트에서 componentDidMount를 사용하는 것과 useEffect의 특성 및 사용 사례가 유사하다.. !!
     */
    useEffect(() => {
        //
        console.log("Protected !!!");
        Auth.currentAuthenticatedUser().catch(() => {
            props.history.push('/profile')
        })
    },[])

    return (
        <Container>
            <h1>로그인 사용자만 확인할 수 있는 페이지입니다!</h1>
        </Container>
    )
}

export default Protected