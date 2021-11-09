
import "./mypage.css";
import "../popup/modalPopup.css";
import React, { useState, useRef, Component} from "react";
import { useHistory } from 'react-router'; 
import MypageHeader from './MypageHeader';

const editPath = "assets/icons/list-ico-edit.png"
const cameraPath = "assets/icons/ico-camera.svg"
const thumPath = "assets/images/thum-160-px-1.png"
const downArrowPath = "/assets/icons/list-ico-open.png"

export default function StartProfile() {
    const userInfo = {
        id: "starkim@moment.com",
        nickname: "김스타",
        category: "예술가",
        price : "150000",
        descriptionSimple : "대한민국, 음악가, 1991년생",
        descriptionFull : "안녕하세요 김스타 입니다.\n여러분들을 위한 즐거운 영상 만들어드립니다!\n\n다이렉트 URL: www.moment/starkim123\n\n홍보계정\nSNS: aaa@uuseske (instagram)\n\n조금 더 궁금하신 부분이 있다면 편하게 연락 주세요."
    };

    const [inputs, setInputs] = useState({
        nickname: '',
        category: '',
        price: '',
        descriptionSimple: '',
        descriptionFull: '',
    });
    const { nickname, category, price, descriptionSimple, descriptionFull} = inputs


    const [count, setCount] = useState(0);
    const textareaElement = useRef();
    const onKeyupCountStoryCharacter = (event) => {
        try {
            let story = event.target.value || ""
            story = story.replace(/\s/gi, '')
            setCount(story.length);
        } catch(e) {

        }
        
    }

    const onChange = (e) => {
        const { name, value } = e.target;
        const nextInputs = {
            ...inputs,  
            [name]: value,
        };
        setInputs(nextInputs);
    };

    return (

        <main>
            <MypageHeader index={5}/>
            <section className="mypage-header">
                <div className="container">
                    <span>스타 프로필 관리</span>
                </div>
            </section>
            <section className="mypage-container">
                <div>
                    <span>
                        <span>
                            이름
                        </span>
                        <div className="mypage-email">
                            <input
                                type="text"
                                placeholder={userInfo.nickname}
                                onChange={onChange}
                                value={nickname}
                                name="nickname}"
                            ></input>
                            <div className="thumbnail"> 
                                <img className="thumbnail-img" alt="none" src={thumPath} />
                                <img className="thumbnail-icon" alt="none" src={cameraPath} />
                            </div>
                        </div>
                        <span>
                            분야
                        </span>
                        <div>
                            <input
                                type="text"
                                onChange={onChange}
                                value={category}
                                name="category"
                            ></input>
                            <img alt="none" src={downArrowPath} />
                        </div>
                        <span>
                            영상단가
                        </span>
                        <div>
                            <input
                                type="text"
                                onChange={onChange}
                                value={price}
                                name="price"
                            ></input>
                            <img alt="none" src={downArrowPath} />
                        </div>
                        <span>
                            한줄소개
                        </span>
                        <div>
                            <input
                                type="text"
                                onChange={onChange}
                                value={descriptionSimple}
                                name="descriptionSimple"
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
                        <span>
                            본인 소개
                        </span>
                        <div>
                            <div className="write-wrapper">
                                <textarea onKeyUp={onKeyupCountStoryCharacter} ref={textareaElement} >
                                </textarea>
                            </div>
                        </div>
                    </span>
                </div>
            </section> 
            <section className="mypage-button">
                <div>
                    <button className="cancel-button">
                        취소하기
                    </button>
                    <button>
                        수정완료
                    </button>
                </div>
            </section>
        </main>
     );
 }
 