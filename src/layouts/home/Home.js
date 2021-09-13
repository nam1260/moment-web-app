import React from "react";
import "../../App.css";
import "../../Common.css";
import "./home.css";

const homeImage = "/assets/images/yhlee/mov.png";
const moveArrowPath = "/assets/icons/home-arrow.png";
const crownPath = "/assets/icons/icoCrown.png";
const homeThum1_1 = "/assets/images/yhlee/home-thum-1-1.png";
const homeThum1_2 = "/assets/images/yhlee/home-thum-1-2.png";
const dummyIcon = "/assets/icons/main-ico-dummy.png";
const plusIcon = "/assets/icons/main-plus-request.png";
const thunderIcon = "/assets/icons/icoThunder.png";
const homeThum2_1 = "/assets/images/yhlee/home-thum-2-1.png";
const homeThum2_2 = "/assets/images/yhlee/home-thum-2-2.png";
const homeThum2_3 = "/assets/images/yhlee/home-thum-2-3.png";
const homeThum2_4 = "/assets/images/yhlee/home-thum-2-4.png";
const circlePlusIcon = "/assets/icons/ico-plus.png";
const desThumb1 = "/assets/images/yhlee/main-1.png";
const desThumb2 = "/assets/images/yhlee/main-2.png";
const footerLogo = "/assets/images/yhlee/logo-gray.png";
const instaLogo = "/assets/icons/ico-insta.png";
const fbLogo = "/assets/icons/ico-fb.png";

function Home() {
    return (
        <main>
            <section className="app-home-header">
                <div className="container">
                    <div>
                        <img src={homeImage} />
                    </div>
                    <span>
                        <span>
                            내가 좋아하는
                            <br />
                            스타가 만들어주는
                            <br />
                            나만의 순간
                        </span>
                        <div>
                            모먼트 서비스 소개 <img src={moveArrowPath} />{" "}
                        </div>
                    </span>
                </div>
            </section>
            <section className="app-moment-content-star">
                <div className="container">
                    <h3>
                        <img src={crownPath} />
                        <span>모먼트 TOP STAR</span>
                    </h3>
                    <div>
                        <article>
                            <img src={homeThum1_1} />
                            <div>
                                <b>지수</b>
                                <p>가수, 탤런트</p>
                            </div>
                        </article>
                        <article>
                            <img src={homeThum1_2} />
                            <div>
                                <b>지수</b>
                                <p>가수, 탤런트</p>
                            </div>
                        </article>
                        <article>
                            <img src={dummyIcon} />
                            <div>
                                <b>아이유</b>
                                <p>가수, 탤런트</p>
                            </div>
                        </article>
                        <article>
                            <img src={dummyIcon} style={{ opacity: 0.6 }} />
                            <div>
                                <img src={plusIcon} />
                                <p>요청해주세요</p>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            <section className="app-moment-content-sns">
                <div className="container">
                    <h3>
                        <img src={thunderIcon} />
                        <span>지금 핫한 SNS 셀럽</span>
                    </h3>
                    <div>
                        <article>
                            <div className={"img-content"}>
                                <img src={homeThum2_1} />
                            </div>
                            <div className={"article-footer"}>
                                <b>도버마켓</b>
                                <span>유투버</span>
                            </div>
                        </article>
                        <article>
                            <div className={"img-content"}>
                                <img src={homeThum2_2} />
                            </div>
                            <div className={"article-footer"}>
                                <b>도버마켓</b>
                                <span>유투버</span>
                            </div>
                        </article>
                        <article>
                            <div className={"img-content"}>
                                <img src={homeThum2_3} />
                            </div>
                            <div className={"article-footer"}>
                                <b>도버마켓</b>
                                <span>유투버</span>
                            </div>
                        </article>
                        <article>
                            <div className={"img-content"}>
                                <img src={homeThum2_4} />
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
                <span>SNS 셀럽 더보기</span> <img src={circlePlusIcon} />
            </section>
            <section className="app-moment-description">
                <div className="container">
                    <h3>잠깐, 모먼트는 처음이신가요?</h3>
                    <div className="description-card">
                        <img src={desThumb1} />
                        <div>
                            <span>모먼트가 무엇인가요?</span>
                            <span>모먼트는 네모 네모<br />테스트 문구</span>
                            <span>모먼트 소개 <img src={moveArrowPath} />{" "} </span>
                        </div>
                    </div>
                    <div className="description-card">
                        <img src={desThumb2} />
                        <div>
                            <span>모먼트가 무엇인가요?</span>
                            <span>모먼트 이용가이드<br />테스트 문구</span>
                            <span>이용 가이드 <img src={moveArrowPath} />{" "} </span>
                        </div>
                    </div>
                </div>
            </section>
            <section className="app-moment-footer">
                <div className="container">
                    <div className="footer-header">
                        <img src={footerLogo} />
                    </div>
                    <div className="footer-content">
                        <p>사업자 등록 번호 : 111-111-1111</p>
                        <p>대표: 박재영</p>
                        <p>통신 판매업 신고 번호: 2021-서울강남-1863</p>
                        <p>E-mail: mooment@gmail.com</p>
                    </div>
                    <div className="footer-list">
                        <span>이용약관</span>
                        <span>개인정보처리방침</span>
                        <span>고객센터</span>
                        <span>파트너 문의</span>
                    </div>
                    <div className="footer-sns">
                        <img src={instaLogo} />
                        <img src={fbLogo} />
                    </div>
                </div>
            </section>
        </main>
    );
}

export default Home;
