import './star.style.css';
import StarRatingComponent from 'shared/component/star/StarRating.component';
import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { WrapLoginedComponent } from 'shared/component/common/WrapLoginedComponent';
import { message } from "antd";
import StorageManager from 'managers/StorageManager';
import { Skeleton } from 'antd';

function StarComponent(props) {
    const history = useHistory();
    const { id : starId } = props.match.params;
    const {
        starDetail,
        getStarDetailAsync,
        isLoading,
    } = props;

    const {
        price = 0,
        longComment = '',
        rate = 0,
        shortComment = '',
        starNm = '',
        starNickNm = '',
        starImgUrl = '',
    } = starDetail;
    
    const onClickGoToWritePage = () => {
        const { userId } = StorageManager.loadUserInfo();
        if(StorageManager.checkUserIsLogined()) {
            if( userId === starId ) {
                message.info('나 자신을 사랑하는건 좋지만 본인에게 사연 작성은 불가능합니다!');
                return;
            } 
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
                    {
                        isLoading ? (
                            <Skeleton paragraph={{rows: 4}} active/>
                        ) : (
                            <>
                                <div>
                                    <span>{starNickNm}</span>
                                    <span>{starNm}</span>
                                    <span>{shortComment}</span>
                                </div>
                                <div>
                                    <img src={starImgUrl} alt="" />
                                </div>
                            </>
                        )
                    }
                </div>
            </section>
            <section className="app-star-body">
                <div className="container">
                    {
                        isLoading ? (
                            <Skeleton paragraph={{rows: 6}} active/>
                        ) : (
                            <>
                                <div>
                                    <span>평점</span>
                                    <span>
                                        <StarRatingComponent score={rate} />
                                    </span>
                                </div>
                                <div>
                                    <span>가격</span>
                                    <span>
                                        {price > 0 ? price.toLocaleString('ko-KR') : 0}원
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
                            </>
                        )
                    }
                    
                    
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