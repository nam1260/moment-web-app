import './star.style.css';
import StarRatingComponent from '../../shared/component/star/StarRating.component';
import CommentOfFanComponent from '../../shared/component/star/CommentOfFan.component';
import { useHistory } from 'react-router';

const homeThum1_1 = "/assets/images/yhlee/thum160Px1.png";
const plusIcon = "/assets/icons/ico-plus.png"

export default function StarComponent(props) {
    const history = useHistory();
    const { id : starId } = props.match.params
    return (
        <main className='star-main'>
            <section className="app-star-header">
                <div className="container">
                    <div>
                        <span>김스타</span>
                        <span>대한민국 음악가, 1991년생</span>
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
                            <StarRatingComponent score={4.2} />
                        </span>
                    </div>
                    <div>
                        <span>단가</span>
                        <span>
                            15,000원
                        </span>
                    </div>
                    <div>
                        <span>평균 배송일</span>
                        <span>
                            1일
                        </span>
                    </div>
                    <button>
                        사연 보내기
                    </button>
                    <div className="introduce-box">
                        <span>본인 소개</span>
                        <div>
                            안녕하세요 김스타 입니다.<br />
                            여러분들을 위한 즐거운 영상 만들어드립니다!<br />
                            <br />
                            다이렉트 URL: www.moment/starkim123
                            <br /><br />
                            홍보계정<br />
                            SNS: aaa@uuseske (instagram)
                            <br /><br />
                            조금 더 궁금하신 부분이 있다면<br />
                            편하게 연락 주세요.
                        </div>
                    </div>
                </div>
            </section>
            <section className="app-star-bottom">
                <div className="container">
                    <div>팬들이 남겨준 스타의 사연 소감이에요</div>
                    <CommentOfFanComponent score={4.2} comment={'화질이 조금 깨졌지만 영상 너무좋았습니다.\n감사합니다!'} />
                    <CommentOfFanComponent score={3.2} comment={'화질이 조금 깨졌지만 영상 너무좋았습니다.\n감사합니다!'} />
                    <div onClick={() => history.push(`${starId}/comment`)}> 사연 더보기 <img src={plusIcon} alt="none" /> </div>
                </div>
            </section>
        </main>
        
    )
}