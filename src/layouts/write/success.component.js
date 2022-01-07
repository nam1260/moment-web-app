import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SpeechBubble from '../../shared/component/write/SpeechBubble';
import  './write.css'

const WriteSuccessComponent = (props) => {
    const { id : starId } = props.match.params;
    const history = useHistory();
    const {
        starDetail,
        getStarDetailAsync,
    } = props;

    const {
        catNm = '',
        starNm = '',
        starImgUrl = '',
    } = starDetail;
    

    useEffect(() => {
        if(starDetail.starId !== starId) {
            getStarDetailAsync(starId);
        }
    }, [])


    return (
        <main className='write-main'>
            <section className="app-success-header">
                <div className="container">
                    <SpeechBubble content='멋진 영상 기대해주세요!'/>
                    <span>
                        <img alt="none" src={starImgUrl} />
                    </span>
                    <h3>{starNm}</h3>
                    <span>{catNm}</span>
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
                    <div onClick={() => history.push('/sendMessageHistory')}>
                        보낸 사연 관리 메뉴로 이동
                    </div>
                </div>
            </section>
        </main>
    )
}

export default WriteSuccessComponent