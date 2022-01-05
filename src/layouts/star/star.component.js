import './star.style.css';
import StarRatingComponent from 'shared/component/star/StarRating.component';
import CommentOfFanComponent from 'shared/component/star/CommentOfFan.component';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { WrapLoginedComponent } from 'shared/component/common/WrapLoginedComponent';
import { message } from "antd";
import StorageManager from 'managers/StorageManager';

const homeThum1_1 = "/assets/images/thum160Px1.png";
const plusIcon = "/assets/icons/ico-plus.png"

function StarComponent(props) {
    const history = useHistory();
    const { id : starId } = props.match.params;
    const {
        starDetail,
        getStarDetailAsync
    } = props;

    const {
        price = 0,
        longComment = '',
        rate = 0,
        shortComment = '',
        starNm = '',
    } = starDetail;
    
    const onClickGoToWritePage = () => {
        if(StorageManager.checkUserIsLogined()) {
            history.push(`/write/${starId}`)
        } else {
            message.warn('사연을 보내기 위해 로그인이 필요합니다.', 1, () => {
                history.push({
                    pathname: '/login',
                    state: { hasGoBack: true, backPathName: `/write/${starId}` }
                })
            })
        }
    }
    
    useEffect(() => {
        document.documentElement.scrollTo({ top: 0, left: 0 });
        if(starDetail.starId !== starId) {
            getStarDetailAsync(starId);
        }
    }, [])

    return (
        <main className='star-main'>
            <section className="app-star-header">
                <div className="container">
                    <div>
                        <span>{starNm}</span>
                        <span>{shortComment}</span>
                    </div>
                    <div>
                        <img src={homeThum1_1} alt="" />
                    </div>
                </div>
            </section>
            <section className="app-star-body">
                <div className="container">
                    <div>
                        <span>평점</span>
                        <span>
                            <StarRatingComponent score={rate} />
                        </span>
                    </div>
                    <div>
                        <span>가격</span>
                        <span>
                            {(price+"").toLocaleString('ko-KR')}원
                        </span>
                    </div>
                    <button onClick={onClickGoToWritePage}>
                        사연 보내기
                    </button>
                    <div className="introduce-box">
                        <span>본인 소개</span>
                        <div>
                            {longComment}
                        </div>
                    </div>
                </div>
            </section>
           {/*
           사연 보내기 기능은 임시 block
           <section className="app-star-bottom">
                <div className="container">
                    <div>팬들이 남겨준 스타의 사연 소감이에요</div>
                    <CommentOfFanComponent score={4.2} comment={'화질이 조금 깨졌지만 영상 너무좋았습니다. 감사합니다!'} />
                    <CommentOfFanComponent score={3.2} comment={'화질이 조금 깨졌지만 영상 너무좋았습니다. 감사합니다!'} />
                    <div onClick={() => history.push(`${starId}/comment`)}> 사연 더보기 <img src={plusIcon} alt="none" /> </div>
                </div>
            </section>*/}
        </main>
        
    )
}

export default WrapLoginedComponent(StarComponent);