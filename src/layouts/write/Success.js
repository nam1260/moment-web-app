import SpeechBubble from '../../shared/component/write/SpeechBubble';
import  './write.css'


const homeThum1_1 = "/assets/images/yhlee/thum160Px1.png";


const WriteSuccessComponent = () => {
    return (
        <main className='write-main'>
            <section className="app-success-header">
                <div className="container">
                    <SpeechBubble content='멋진 영상 기대해주세요!'/> 
                    <img alt="none" src={homeThum1_1} />
                    <h3>최인기맨</h3>
                    <span>대한민국 음악가, 1991년생</span>
                </div>
            </section>
            <section className="app-success-body">
                <div className="container">
                    
                    사연 전송이 완료되었습니다 !<br />
                    <span>마이메뉴 &gt; 보낸 사연 관리</span>에서<br />
                    확인 해주세요

                </div>
            </section>
            <section className="app-success-bottom">
                <div className="container">
                    <div>
                        보낸 사연 관리 메뉴로 이동
                    </div>
                </div>
            </section>
        </main>
    )
}

export default WriteSuccessComponent