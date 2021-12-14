import React, { useEffect } from "react";
import "../../App.css";
import "../../Common.css";
import "./home.css";
import { useHistory } from "react-router";


const homeImage = "/assets/images/mov.png";
const moveArrowPath = "/assets/icons/home-arrow.png";
const crownPath = "/assets/icons/icoCrown.png";
const homeThum1_1 = "/assets/images/home-thum-1-1.png";
const homeThum1_2 = "/assets/images/home-thum-1-2.png";
const dummyIcon = "/assets/icons/main-ico-dummy.png";
const plusIcon = "/assets/icons/main-plus-request.png";
const thunderIcon = "/assets/icons/icoThunder.png";
const homeThum2_1 = "/assets/images/home-thum-2-1.png";
const homeThum2_2 = "/assets/images/home-thum-2-2.png";
const homeThum2_3 = "/assets/images/home-thum-2-3.png";
const homeThum2_4 = "/assets/images/home-thum-2-4.png";
const circlePlusIcon = "/assets/icons/ico-plus.png";
const desThumb1 = "/assets/images/main-1.png";
const desThumb2 = "/assets/images/main-2.png";
const footerLogo = "/assets/images/logo-gray.png";
const instaLogo = "/assets/icons/ico-insta.png";
const youtubeLogo = "/assets/icons/ico-youtube.png";


/* 
  * 홈 컴포넌트
  - 로그인 전, 로그인 후 분기 (필)
  - 반응형 확인
  - 각 카드 별 이벤트 확인
  - 반복 되는 부분 컴포넌트 화 적용 => 모먼트 TOP STAR 카드, SNS 셀럽 추가하기
*/
function Home() {
    const history = useHistory();
    useEffect(() => {
        document.documentElement.scrollTo({ top: 0, left: 0 }) 
    }, [])
    return (
        <main>
            <section className="app-home-header">
                <div className="container">
                    <div>
                        <img alt="none" src={homeImage} />
                    </div>
                    <span>
                        <span>
                            내가 좋아하는
                            <br />
                            스타가 만들어주는
                            <br />
                            나만의 순간
                        </span>
                        <div onClick={() => history.push('guide/moment')}>
                            모먼트 서비스 소개 <img alt="none" src={moveArrowPath} />{" "}
                        </div>
                    </span>
                </div>
            </section>
            <section className="app-moment-content-star">
                <div className="container">
                    <h3>
                        <img alt="none" src={crownPath} />
                        <span>모먼트 TOP STAR</span>
                    </h3>
                    <div>
                        <article onClick={() => history.push('star/1')}>
                            <div className="img-content">
                                <img className={'star-img'} alt="none" src={homeThum1_1} />
                            </div>
                            <div className="article-footer">
                                <b>지수</b>
                                <p>가수, 탤런트</p>
                            </div>
                        </article>
                        <article onClick={() => history.push('star/1')}>
                            <div className="img-content">
                                <img className={'star-img'} alt="none" src={homeThum1_2} />
                            </div>
                            <div className="article-footer">
                                <b>지수</b>
                                <p>가수, 탤런트</p>
                            </div>
                        </article>
                        <article onClick={() => history.push('star/1')}>
                            <div className="img-content">
                                <img className={'none-logo'} alt="none" src={dummyIcon} />
                            </div>
                            <div className="article-footer">
                                <b>아이유</b>
                                <p>가수, 탤런트</p>
                            </div>
                        </article>
                        <article>
                            <div className="img-content">
                                <img className={'none-logo'} alt="none" src={dummyIcon} style={{ opacity: 0.6 }} />
                                <img className={'plus-img'} alt="none" src={plusIcon} />
                            </div>
                            <div className="article-footer">
                                <p>요청해주세요</p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            <section className="app-moment-content-sns">
                <div className="container">
                    <h3>
                        <img alt="none" src={thunderIcon} />
                        <span>지금 핫한 SNS 셀럽</span>
                    </h3>
                    <div>
                        <article onClick={() => history.push('star/1')}>
                            <div className={"img-content"}>
                                <img alt="none" src={homeThum2_1} />
                            </div>
                            <div className={"article-footer"}>
                                <b>도버마켓</b>
                                <span>유투버</span>
                            </div>
                        </article>
                        <article onClick={() => history.push('star/1')}>
                            <div className={"img-content"}>
                                <img alt="none" src={homeThum2_2} />
                            </div>
                            <div className={"article-footer"}>
                                <b>도버마켓</b>
                                <span>유투버</span>
                            </div>
                        </article>
                        <article onClick={() => history.push('star/1')}>
                            <div className={"img-content"}>
                                <img alt="none" src={homeThum2_3} />
                            </div>
                            <div className={"article-footer"}>
                                <b>도버마켓</b>
                                <span>유투버</span>
                            </div>
                        </article>
                        <article onClick={() => history.push('star/1')}>
                            <div className={"img-content"}>
                                <img alt="none" src={homeThum2_4} />
                            </div>
                            <div className={"article-footer"}>
                                <b>도버마켓</b>
                                <span>유투버</span>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            <section className="app-moment-more">
                <span>SNS 셀럽 더보기</span> <img alt="none" src={circlePlusIcon} />
            </section>
            <section className="app-moment-description">
                <div className="container">
                    <h3>잠깐, 모먼트는 처음이신가요?</h3>
                    <div>
                        <div className="description-card">
                            <img alt="none" src={desThumb1} />
                            <div>
                                <span>모먼트가 무엇인가요?</span>
                                <span>모먼트는 네모 네모<br />테스트 문구</span>
                                <span onClick={() => history.push('guide/moment')}>모먼트 소개 <img alt="none" src={moveArrowPath} />{" "} </span>
                            </div>
                        </div>
                        <div className="description-card">
                            <img alt="none" src={desThumb2} />
                            <div>
                                <span>모먼트가 무엇인가요?</span>
                                <span>모먼트 이용가이드<br />테스트 문구</span>
                                <span onClick={() => history.push('guide/user')} >이용 가이드 <img alt="none" src={moveArrowPath} />{" "} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="app-moment-footer">
                <div className="container">
                    <div className="footer-header">
                        <img alt="none" src={footerLogo} />
                    </div>
                    <div className="footer-content">
                        <p>사업자 등록 번호 : 255-49-00797</p>
                        <p>상호: 모먼트</p>
                        <p>대표: 박재영</p>
                        <p>정보통신업 / 소프트웨어 개발 및 공급업</p>
                        <p>E-mail: mtm.moment@gmail.com</p>
                    </div>
                    <div className="footer-list">
                        <span onClick={() => history.push('/doc/3')}>이용약관</span>
                        <span onClick={() => history.push('/doc/2')}>개인정보처리방침</span>
                        <span>고객센터</span>
                        <span>파트너 문의</span>
                    </div>
                    <div className="footer-sns">
                        <img alt="none" src={instaLogo} />
                        <img alt="none" src={youtubeLogo} />
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;
