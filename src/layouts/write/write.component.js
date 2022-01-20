/* eslint-disable no-throw-literal */
import  './write.css'
import WriteLabel from 'shared/component/write/WriteLabel'
import MomentDatePicker from 'shared/component/write/MomentDatePicker';
import MomentModal from 'shared/component/common/modal';
import SpeechBubble from 'shared/component/write/SpeechBubble';
import PaymentModal from 'shared/component/write/PaymentModal.componet';
import { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { WrapLoginedComponent } from 'shared/component/common/WrapLoginedComponent';
import StorageManager from 'managers/StorageManager';
import { Input, message } from 'antd';
import Styled from "styled-components"
import DepositWithoutPassbookModal from 'layouts/container/DepositModalContainer';
import ADSManager from '../../managers/ADSManager';
import { submitPaymentInfo } from "redux/payment";

const letterImage = "/assets/images/icoLetter.png";
const iconFace = "/assets/icons/icoFace6.png";



const StyledNoti = Styled.div`

    
    text-align: center;
`


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


const Under50Modal = (
    <div className='modal-content warning-modal'>
        <div>죄송합니다.<br /> 사연 요청은 최소 50자 이상 작성해주세요.</div>
        <div>
            스타가 당신을 진심으로 축하해주기 위해 꼭 알아야 할 내용<br />
            (축하 받을 사람의 이름, 축하 받을 사연, 축하 받을 이벤트의 날짜, 사연 요청자와의 관계)이
            혹시 빠지지 않았는지 확인해주세요!
        </div>
    </div>
)

const Over300Modal = (
    <div className='modal-content warning-modal'>
        <div>죄송합니다.<br />사연 요청은 최소 50자, 최대 300자 이하로 작성해주세요.</div>
        <div>
            그래도 스타가 당신을 진심으로 축하해주기 위해 꼭 알아야할 내용
            (축하 받을 사람의 이름, 축하 받을 사연, 축하 받을 이벤트의 날짜, 사연 요청자와의 관계)은
            빠지지 않게 부탁해요!
        </div>
    </div>
)



const WriteComponent = (props) => {
    const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
    const [isUnder50ModalOpen, setIsUnder50ModalOpen] = useState(false);
    const [isOver300ModalOpen, setIsOver300ModalOpen] = useState(false);
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
    const [isPassbookModalOpen, setIsPassbookModalOpen] = useState(false);
    const [count, setCount] = useState(0);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState();
    const history = useHistory();
    const textareaElement = useRef();
    const titleElement = useRef();
    const { id : starId } = props.match.params;
    const search = history.location.search;
    
    const {
        starDetail,
        isLoading,
        user,
        getStarDetailAsync,
        sendMessage,
    } = props;
    
    const {
        price = 0,
        catNm = '',
        starNm = '',
        starImgUrl = '',
    } = starDetail;
    
    const { userId } = user;

    useEffect(() => {
        if(search !== '' && userId) {
            const searchObject = search.slice(1).split('&').reduce((prev, param) => {
                const value = param.split('=');
                prev[value[0]] = decodeURI(value[1]);
                return prev;
            }, {});
            if(searchObject.hasOwnProperty('code')) {
                /* error handling 
                    1. PAY_PROCESS_CANCELED 사용자 결제 취소
                    2. PAY_PROCESS_ABORTED 결제 진행 중 승인 실패
                    3. REJECT_CARD_COMPANY 카드사 승인 거절
                */
            } else {
                const param = {
                    userId: userId,
                    starId: starId,
                    payType: 1,
                    price: price,
                    payStatus: 1,
                    pgNm: 'tossPay',
                    cardNm: '', 
                    cardNum: '',
                    aprvNum: '',
                    emPhoneNum: '',
                    userBankNm: '',
                    userAccountNm: '',
                    userAccountNum: '',
                }
                try {
                    (async () => {
                        
                            const { payNo } = await submitPaymentInfo(param);
                            await sendMessage({
                                starId,
                                userId,
                                payNo: payNo,
                                deliveryDate: date,
                                msgContents: textareaElement.current.value,
                                msgTitle: title,
                                msgStatus: '', /* TODO: 간편 결제 연동 시 90 or ''로 변경 */
                            }, 'toss', searchObject);
                            ADSManager.collectClikedSendMessage();
                            history.replace(`/writesuccess/${starId}`);
                    })();
                } catch (error) {
                    message.warning('사연 전송에 실패하였습니다. 관리자에게 문의해주세요.')
                }
                
            }

        }
    }, [user])
    
    useEffect(() => {
        if(!StorageManager.checkUserIsLogined()) {
            message.warn('사연을 보내기 위해 로그인이 필요합니다.', 1, () => {
                history.push({
                    pathname: '/login',
                    state: { hasGoBack: true, backPathName: '/write/2' }
                })
            })
        }
        
        if( starId === userId ) {
            message.info('나 자신을 사랑하는건 좋지만 본인에게 사연 작성은 불가능합니다!', 1, () => {
                history.goBack();
            });
            
        }

        if(starDetail.starId !== starId) {
            getStarDetailAsync(starId);
        }
    }, [user]);

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
            checkTitleIsBlank();
            checkCharacterUnder50();
            checkCharacterOver300();
        } catch(e) {
            switch(e.type) {
                case 'under50': {
                    setIsUnder50ModalOpen(true);
                    break;
                }
                case 'over300': {
                    setIsOver300ModalOpen(true);
                    break;
                }
                case 'titleIsBlank': {
                    message.warn('제목을 입력해주세요.');
                    titleElement.current.focus();
                    break;
                }
                default: {
                    break
                }
            }
            throw new Error('유효성 체크 실패');
        }
        return true;
    }

    const checkTitleIsBlank = () => {
        if(!title) {
            throw {
                type: 'titleIsBlank',
                error: new Error('제목을 입력해주세요.')
            }
        }
    }

    const checkCharacterUnder50 = () => {
        if(count < 50) {
            throw {
                type: 'under50',
                error: new Error('50자 이하 에러')
            }
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

    const onClickSendStory = async () => {
        try {
            checkStoryValidation();
        } catch(e) {
            return false;
        }
        setIsPaymentModalOpen(true);
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
                isOpen={isLoading}
                contentComponent={LoadingModal}
                width={650}
                height={330}
            />

            <MomentModal
                isOpen={isUnder50ModalOpen}
                contentComponent={Under50Modal}
                confirmText={'확인'}
                onClickHandlerConfirm={() => setIsUnder50ModalOpen(false)}
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
                name={starNm}
                starId={starId}
                payment={price.toLocaleString('ko-KR')}
                /* TODO: 각 API 연동 */
                paymentButtonClick={() => {
                    setIsPaymentModalOpen(false);
                    setIsPassbookModalOpen(true);
                }}
            />

            <DepositWithoutPassbookModal
                isModalOpen={isPassbookModalOpen}
                setIsModalOpen={setIsPassbookModalOpen}
                onSuccess={(paymentNo) => {
                    try {
                        sendMessage({
                            starId,
                            userId,
                            payNo: paymentNo,
                            deliveryDate: date,
                            msgContents: textareaElement.current.value,
                            msgTitle: title,
                            msgStatus: '90', /* TODO: 간편 결제 연동 시 90 or ''로 변경 */
                        }).then(() => {
                            ADSManager.collectClikedSendMessage();
                            history.push(`/writesuccess/${starId}`)
                        })
                    } catch (error) {
                        message.warning('사연 전송에 실패하였습니다. 관리자에게 문의해주세요.')
                    }
                }}
                price={price}
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
                            content={starNm}
                        />
                        <div>
                            <img alt="none" src={starImgUrl} />
                        </div>
                    </section>
                    <WriteLabel 
                        label={'분야'}
                        content={catNm}
                    />
                    <WriteLabel 
                        label={'영상가격(영구 소장, 추가 구매 없음)'}
                        content={`${price.toLocaleString('ko-KR')}원`}
                    />
                    <div className="date-wrapper">
                        <div>영상 배송 희망일</div>
                        <MomentDatePicker setDate={setDate} />
                    </div>
                    <div className="write-wrapper">
                        <div>제목 입력</div>
                        <Input ref={titleElement} allowClear value={title} onChange={(e) => setTitle(e.target.value)} size='large' placeholder="제목을 입력해주세요." />
                    </div>
                    <div className="write-wrapper">
                        <div>사연 입력</div>
                        <span style={{float: 'right'}}>{count} / 300</span>
                        <textarea onKeyUp={onKeyupCountStoryCharacter} ref={textareaElement} placeholder='축하 받고 싶은 사람들의 이름/별명과 사연, 축하 받을 이벤트, 해당 이벤트의 날짜를 적어서 최애의 축하를 더욱 의미있게 만들어 보세요! 최소 50자 - 최대 300자'>
                        </textarea>
                    </div>

                </div>
            </section>
            <section className="app-write-bottom">
                <div className="container">
                    <div onClick={() => setIsQuestionModalOpen(true)}>어떻게 사연을 보내야 할지 모르시겠다구요?</div>
                    <div onClick={() => onClickSendStory()} >
                        결제하고 사연 전송하기!
                    </div>
                    <StyledNoti>‘결제하고 사연 전송하기' 버튼을 누르시는 것은 당신이 모먼트의 <br/>
                        <a onClick={() => history.push('/doc/3')}> 이용약관 </a> 및
                        <a onClick={() => history.push('/doc/2')}> 개인정보처리방침 </a> 에 동의하시는 것으로 간주 됩니다.</StyledNoti>
                </div>


            </section>
        </main>
    )
}

export default WrapLoginedComponent(WriteComponent)