import  './write.css'
import WriteLabel from '../../shared/component/write/WriteLabel'
import MomentDatePicker from '../../shared/component/write/MomentDatePicker';
import MomentModal from '../../shared/component/common/modal';
import SpeechBubble from '../../shared/component/write/SpeechBubble';
import PaymentModal from '../../shared/component/write/PaymentModal.componet';

import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';


const homeThum1_1 = "/assets/images/thum160Px1.png";
const letterImage = "/assets/images/icoLetter.png";
const iconFace = "/assets/icons/icoFace6.png";


const ExampleModalContent = (    
        <div className='modal-content example-modal'>
            <img alt="none" src={iconFace} />
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
        <img alt="none" src={letterImage} />
        <span>사연을 전송중입니다...</span>
        
    </div>
)


const Under100Modal = (
    <div className='modal-content warning-modal'>
        <div>죄송합니다.<br /> 사연 요청은 최소 100자 이상 작성해주세요.</div>
        <div>
            스타가 당신을 진심으로 축하해주기 위해 꼭 알아야 할 내용<br />
            (축하 받을 사람의 이름, 축하 받을 사연, 축하 받을 이벤트의 날짜, 사연 요청자와의 관계)이
            혹시 빠지지 않았는지 확인해주세요!
        </div>
    </div>
)

const Over300Modal = (
    <div className='modal-content warning-modal'>
        <div>죄송합니다.<br />사연 요청은 최소 100자, 최대 300자 이하로 작성해주세요.</div>
        <div>
            그래도 스타가 당신을 진심으로 축하해주기 위해 꼭 알아야할 내용
            (축하 받을 사람의 이름, 축하 받을 사연, 축하 받을 이벤트의 날짜, 사연 요청자와의 관계)은
            빠지지 않게 부탁해요!
        </div>
    </div>
)



const WriteComponent = () => {
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
    const [isLoadingModalOpen, setIsLoadingModalOpen] = useState(false);
    const [isUnder100ModalOpen, setIsUnder100ModalOpen] = useState(false);
    const [isOver300ModalOpen, setIsOver300ModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
    const [count, setCount] = useState(0);
    const history = useHistory();
    const textareaElement = useRef();
    

    const onKeyupCountStoryCharacter = (event) => {
        try {
            let story = event.target.value || ""
            story = story.replace(/\s/gi, '')
            setCount(story.length);
        } catch(e) {

        }
        
    }

    const checkStoryValidation = () => {
        try {
            checkCharacterUnder100();
            checkCharacterOver300();
        } catch(e) {
            switch(e.type) {
                case 'under100': {
                    setIsUnder100ModalOpen(true);
                    break;
                }
                case 'over300': {
                    setIsOver300ModalOpen(true);
                    break;
                }
            }
            throw new Error('유효성 체크 실패');
        }
        return true;
    }

    const checkCharacterUnder100 = () => {
        if(count < 100) {
            throw {
                type: 'under100',
                error: new Error('100자 이하 에러')
            };
        }
    }

    const checkCharacterOver300  = () => {
        if(count > 300) {
            throw {
                type: 'over300',
                error: new Error('300자 초과 에러')
            };
        }
    }

    const onClickSendStory = () => {
        try {
            // checkStoryValidation();
        } catch(e) {
            return false;
        }
        setIsPaymentModalOpen(true);
        // setIsLoadingModalOpen(true); 
        // setTimeout(() => {
        //     setIsLoadingModalOpen(false)
        //     history.push('/writesuccess')
        // }, 1000)
    }

    return (
        <main className='write-main'>
            <MomentModal
                isOpen={isQuestionModalOpen}
                confirmText={'확인'}
                contentComponent={ExampleModalContent}
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

            <MomentModal
                isOpen={isUnder100ModalOpen}
                contentComponent={Under100Modal}
                confirmText={'확인'}
                onClickHandlerConfirm={() => setIsUnder100ModalOpen(false)}
                width={650}
                height={520}
            />

            <MomentModal
                isOpen={isOver300ModalOpen}
                contentComponent={Over300Modal}
                confirmText={'확인'}
                onClickHandlerConfirm={() => setIsOver300ModalOpen(false)}
                width={650}
                height={520}
            />

            <PaymentModal 
                isModalOpen={isPaymentModalOpen}
                setIsModalOpen={setIsPaymentModalOpen}
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
                            <img alt="none" src={homeThum1_1} />
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
                        <span style={{float: 'right'}}>{count} / 300</span>
                        <textarea onKeyUp={onKeyupCountStoryCharacter} ref={textareaElement} placeholder='사연을 입력해주세요!'>
                        </textarea>
                    </div>

                </div>
            </section>
            <section className="app-write-bottom">
                <div className="container">
                    <div onClick={() => setIsQuestionModalOpen(true)}>어떻게 사연을 보내야 할지 모르시겠다구요?</div>
                    <div onClick={onClickSendStory} >
                        결제하고 사연 전송하기!
                    </div>
                </div>
            </section>
        </main>
    )
}

export default WriteComponent