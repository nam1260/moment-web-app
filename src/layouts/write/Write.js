import  './write.css'
import WriteLabel from '../../shared/component/write/WriteLabel'
import MomentDatePicker from '../../shared/component/write/MomentDatePicker';
import MomentModal from '../../shared/component/common/modal';
import { useState } from 'react';
import styled from 'styled-components';
import SpeechBubble from '../../shared/component/write/SpeechBubble';


const homeThum1_1 = "/assets/images/yhlee/thum160Px1.png";
const letterImage = "/assets/images/yhlee/icoLetter.png";
const iconFace = "/assets/icons/icoFace6.png";


const QuestionModalContent = (
    
        <div className='modal-content'>
            <img src={iconFace} />
            <div>
                Tip! 스타에게 축하 받고 싶은 순간을 <br />
                가능한 자세하게 말해주세요
            </div>
            <div>
                누구와 함께하는지 (이름), 그 순간이 언제인지 (날짜),<br />
                그 순간이 왜 당신에게 특별한지 (사연)
            </div>
            <div>
                예 : 안녕하세요! 전 지현입니다!<br />
                이번 9월 21일은 제 남친 수현이와 1주년이 되는 날이에요.<br />
                쇼미를 같이 보면서 남친과 제가 모두 좋아하게 된<br />
                '블랙' 님에게 직접 저희 커플 1주년 축하 받고 싶어요!
            </div>
        </div>
)

const LoadingModal = (
    <div className='modal-content'>
        <img src={letterImage} />
        <span>사연을 전송중입니다...</span>
        
    </div>
)


const WriteComponent = () => {
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
    const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
    return (
        <main className='write-main'>
            <MomentModal
                isOpen={isQuestionModalOpen}
                confirmText={'확인'}
                contentComponent={QuestionModalContent}
                onClickHandlerConfirm={() => setIsQuestionModalOpen(false)}
                width={650}
                height={750}
            />

            <MomentModal
                isOpen={isLoadingModalOpen}
                contentComponent={LoadingModal}
                width={650}
                height={330}
            />
            
            <section className="app-write-header">
                <div className="container">
                    <h3>
                        전달 받을 스타는<br />누구인가요?
                        <SpeechBubble content='당신의 사연이 궁금해요!'/>
                    </h3>
                </div>
            </section>
            <section className="app-write-body">
                <div className="container">
                    <section>
                        <WriteLabel 
                            label={'이름'}
                            content={'김스타, 예술인'}
                        />
                        <div>
                            <img src={homeThum1_1} />
                        </div>
                    </section>
                    <WriteLabel 
                        label={'분야'}
                        content={'대한민국 음악가, 1991년생'}
                    />
                    <WriteLabel 
                        label={'영상단가'}
                        content={'150,000원'}
                    />
                    <div className="date-wrapper">
                        <div>영상 배송 희망일</div>
                        <MomentDatePicker />
                    </div>
                    <div className="write-wrapper">
                        <div>사연 입력</div>
                        <textarea>
                            안녕하세요 김스타님,
                            이번에 사연을 부탁하게 된 00에 사는 000 입니다.
                            올해 제가 카페를 창업하게 됐는데요!

                            카페 메인 스크린에 홍보할만한 영상 하나가
                            필요합니다.
                            저희 카페는....
                        </textarea>
                    </div>

                </div>
            </section>
            <section className="app-write-bottom">
                <div className="container">
                    <div onClick={() => setIsQuestionModalOpen(true)}>어떻게 사연을 보내야 할지 모르시겠다구요?</div>
                    <div onClick={() => { 
                        setIsLoadingModalOpen(true); 
                        setTimeout(() => setIsLoadingModalOpen(false), 1000)
                    }}>
                        결제하고 사연 전송하기!
                    </div>
                </div>
            </section>
        </main>
    )
}

export default WriteComponent