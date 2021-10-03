import { useState } from 'react';
import TabsComponent from '../../shared/component/guide/Tabs';
import FaqComponent from './section/Faq'
import UserGuideComponent from './section/UserGuide'
import StarGuideComponent from './section/StarGuide'
import IntroductionComponent from './section/Introduction'
import  './guide.css'


const IntroComponent = ({ match: { params: { type = 1 } } }) => {
    const [part, setPart] = useState(type - 1);
    return (
        <section className="introduction-wrapper">
            <div className="container">
                <TabsComponent value={part} defaultValue={0}>
                    <div onClick={() => setPart(0)}>모먼트 소개</div>
                    <div onClick={() => setPart(1)} >자주 묻는 질문</div>
                </TabsComponent>
                <div>
                    { part === 0 ? <IntroductionComponent /> : <FaqComponent /> }
                </div>
            </div>
        </section>
    )
}

const UserComponent = () => {
    const [part, setPart] = useState(0)
    return (
        <section className="introduction-wrapper">
            <div className="container">
                <TabsComponent value={part} defaultValue={0}>
                    <div onClick={() => setPart(0)}>이용자 가이드</div>
                    <div onClick={() => setPart(1)} >스타 가이드</div>
                </TabsComponent>
                <div>
                    { part === 0 ? <UserGuideComponent /> : <StarGuideComponent /> }
                </div>
            </div>
        </section>
    )
}

const GuideComponent = {
    IntroComponent,
    UserComponent
}

export default GuideComponent