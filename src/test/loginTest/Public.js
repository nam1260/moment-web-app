/**
 * Public
 * @author wook
 * @since 2021/07/31
 * description
 * 경로 이름을 UI에 랜더링 하는 함수
 * 사용자 로그인 여부와 상관없이 접근 가
 */

import React from 'react'
import Container from './Container'


function Public() {
    return (
        <Container>
            <h1>Public route</h1>
        </Container>
    )
}

export default Public;


