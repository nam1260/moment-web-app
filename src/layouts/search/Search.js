import { useState, useRef, useLayoutEffect } from "react";

import { debounce } from "../../shared/func";
import { useEventListener } from "../../shared/customHook";
import "./search.css";

const searchPath = "/assets/icons/icoSearch.png";
const notFoundPath = "/assets/icons/icoFace3B.png"
const searchStatus = {
    INIT: 1,
    NOT_FOUND:2,
    FOUND:3
}

const NotFoundComponent = () => {
    return (
        <div className="not-found-box">
            <img src={notFoundPath} />
            <p>찾으시는 검색 결과가 없습니다.</p>
            <div>검색한 셀럽 추가 요청하기</div>
        </div>
    )
}

const FoundComponent = ({celebrityList}) => {
    return (
        <div className="found-box">
            {
                celebrityList.map((item) => {

                    return (
                        <div className="celebrity-list">
                            <div>
                                <span>{item.name}</span>
                                <span>{item.job}</span>
                                <span>{item.info}</span>
                            </div>
                            <div>
                                <div>
                                    <img src={item.imgPath} />
                                </div>
                            </div>
                            
                        </div>
                    )
                })
            }
        </div>
    )
}


export default function SearchComponent() {
    const searchInputElement = useRef(null); // 인풋
    const [eventElement, setEventElement] = useState(null);
    const [searchBodyStatus, setSearchBodyStatus] = useState(searchStatus.INIT);
    const celebrityList = [
        {
            name: "최인기맨",
            job: "대한민국 유튜버",
            info: "구독자 100만명 핫 인플루언서",
            imgPath: 'assets/images/yhlee/home-thum-1-1.png'
        },
        {
            name: "김연아",
            job: "대한민국 피겨스케이팅 선수",
            info: "피겨 채널 운영 중",
            imgPath: 'assets/images/yhlee/home-thum-2-2.png'
        },
    ];

    const findCelebrity = (e) => {
        if (e.target.value.search(/[최김]/) > -1) {
            setSearchBodyStatus(searchStatus.FOUND);
        } else if(e.target.value.trim() === '') {
            setSearchBodyStatus(searchStatus.INIT);
        } else {
            setSearchBodyStatus(searchStatus.NOT_FOUND);
        }
    };
    useEventListener("keyup", debounce(findCelebrity, 100), eventElement);

    useLayoutEffect(() => {
        setEventElement(searchInputElement.current);
    }, []);

    return (
        <div className="search-wrapper">
            <span className="hide-element"></span>
            <div className="container">
                <div className="search-header">
                    <div>
                        <input
                            placeholder={"스타를 찾아보세요"}
                            ref={searchInputElement}
                            type="text"
                        ></input>
                    </div>
                    <img src={searchPath} />
                </div>
                <div className="search-body">
                    {
                     {
                        [searchStatus.INIT] : <></>,
                        [searchStatus.NOT_FOUND] : <NotFoundComponent />,
                        [searchStatus.FOUND] : <FoundComponent celebrityList={celebrityList} />
                     }[searchBodyStatus]   
                    }
                </div>
            </div>
        </div>
    );
}
