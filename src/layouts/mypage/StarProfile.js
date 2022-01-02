
import "./mypage.css";
import "../popup/modalPopup.css";
import React, { useState, useRef, useEffect, Component} from "react";
import { useHistory } from 'react-router'; 
import MypageHeader from './MypageHeader';
import AWSManager from "../../managers/AWSManager.js";
import StorageManager from "../../managers/StorageManager";
import {WrapLoginedComponent} from "../../shared/component/common/WrapLoginedComponent";
import {Redirect} from 'react-router-dom'
import Select, { components, DropdownIndicatorProps } from 'react-select';

const editPath = "assets/icons/list-ico-edit.png"
const cameraPath = "assets/icons/ico-camera.svg"
const thumPath = "assets/icons/ico-user-default.png"
const downArrowPath = "/assets/icons/list-ico-open.png"

function StartProfile({isLogined}) {
    const userInfo = {
        id: "starkim@moment.com",
        nickname: "김스타",
        category: "예술가",
        price : "150000",
        descriptionSimple : "대한민국, 음악가, 1991년생",
        descriptionFull : "안녕하세요 김스타 입니다.\n여러분들을 위한 즐거운 영상 만들어드립니다!\n\n다이렉트 URL: www.moment/starkim123\n\n홍보계정\nSNS: aaa@uuseske (instagram)\n\n조금 더 궁금하신 부분이 있다면 편하게 연락 주세요."
    };

    const [starInfo, setStarInfo] = useState({
        starNm: '',
        catNm: '',
        catId:'',
        price: '',
        shortComment: '',
        longComment: '',
    });
    const { starNm, catNm, catId, price, shortComment, longComment} = starInfo


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

    const updatePriceUnit = (e) => {
        console.log('updatePriceUnit');
        console.log(e)
        let price = starInfo.price;
        if(starInfo.price < 50000) {
            alert('영상 단가의 최솟값은 50000입니다.');;
            price = 50000;
        }else if(starInfo.price % 1000 != 0) {
            alert('1000 단위 숫자만 입력 할 수 있습니다.');
            price = Math.ceil(starInfo.price / 1000)*1000;
        }
        const nextInputs = {
            ...starInfo,  
            'price': price
        };
        setStarInfo(nextInputs);
    };
    const onChange = (e) => {
        const { name, value } = e.target;
        const nextInputs = {
            ...starInfo,  
            [name]: value,
        };
        setStarInfo(nextInputs);
    };

    const categoryData = [
        {
          value: '가수',
          text: '가수',
        },
        {
          value: '예술인',
          text: '예술인',
        },
        {
          value: '운동선수',
          text: '운동선수',
        }
    ];
    const DropdownIndicator = (
        props: DropdownIndicatorProps<ColourOption, true>
      ) => {
        return (
            // width: min(10vw, 44px);
            // height: min(10vw, 44px);
            <components.DropdownIndicator {...props}>
                <img src={downArrowPath} style={{ 
                }}/>
            </components.DropdownIndicator>
        );
      };
     
    const [categorySelectedOption, setCategorySelectedOption] = useState(null);
    const categoryChange = e => {
        setCategorySelectedOption(e);
        setStarInfo( {
            ...starInfo,  
            'catNm': e.value,
            'catId': "1001",
        });
    }
    const [priceSelectedOption, setPriceSelectedOption] = useState(null);
    const priceChange = e => {
        setPriceSelectedOption(e);
        setStarInfo( {
            ...starInfo,  
            'price': e.value,
        });
    }
    const customStyle = {
        control: (provided, state) => ({
          ...provided,
          boxShadow: "none",
          border: "none",
        }),
        menu: (provided, state) => ({
          ...provided,
          border: "none",
          boxShadow: "none"
        }),
        option: (provided, state) => ({
           ...provided,
           color: state.isFocused && "red",
        }), 
    };

    
    //function 의 lifeCycle을 담당한다.
    useEffect(() =>{
        let userId = StorageManager.loadUserInfo() ? StorageManager.loadUserInfo().userId : "";
        AWSManager.getStarInfo({
            starId : userId,
        }).then((result) =>{
            if(result && result.status === 200 && result.data) {
                setStarInfo(result.data);
                setCategorySelectedOption({value: result.data.catNm, text: result.data.catNm});
                setPriceSelectedOption({value: result.data.price, text: result.data.price});
            }
        });

    },[]);

    const _complete = () => {
        console.log(starInfo);

        AWSManager.updateStarInfo({
            ...starInfo,
        }).then((result) => {
            console.log(result);
        })
    };
    return (
        !isLogined? <Redirect to="/login"/> :
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
                            <span className="nickname">
                                {starInfo.starNm}
                            </span>
                            
                            <div className="thumbnail"> 
                                <img className="thumbnail-img" alt="none" src={StorageManager.loadUserInfo().userImgUrl ? StorageManager.loadUserInfo().userImgUrl : thumPath} />
                                {/* <img className="thumbnail-icon" alt="none" src={cameraPath} /> */}
                            </div>
                        </div>
                        <span>
                            분야
                        </span>
                        <div>
                            <Select
                                placeholder=""
                                value={categorySelectedOption}
                                options={categoryData}
                                components={{ DropdownIndicator }}
                                onChange={categoryChange}
                                styles={customStyle}
                                getOptionLabel={e => (
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <span style={{ fontSize:"3.4vw", fontWeight: "bold", }}>{e.text}</span>
                                </div>
                                )}
                            />
                        </div>
                        <span>
                            영상단가
                        </span>
                        <div>
                            <input
                                type="number"
                                onChange={onChange}
                                onBlur={updatePriceUnit}
                                value={starInfo.price}
                                name="price"
                                min="50000"
                                step='1000'
                                max="1000000"
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
                        <span>
                            한줄소개
                        </span>
                        <div>
                            <input
                                type="text"
                                onChange={onChange}
                                value={starInfo.shortComment}
                                name="shortComment"
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
                        <span>
                            본인 소개
                        </span>
                        <div>
                            <div className="write-wrapper">
                                <textarea 
                                    // placeholder={starInfo.longComment}
                                    onChange={onChange}
                                    value={starInfo.longComment}
                                    onKeyUp={onKeyupCountStoryCharacter}
                                    ref={textareaElement} 
                                    name="longComment"
                                ></textarea>
                            </div>
                        </div>
                    </span>
                </div>
            </section> 
            <section className="mypage-button">
                <div>
                    <button className="full-button" onClick={_complete}>
                        수정완료
                    </button>
                </div>
            </section>
        </main>
     );
 } export default WrapLoginedComponent(StartProfile)
 