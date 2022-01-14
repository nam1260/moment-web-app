
import "./mypage.css";
import "../popup/modalPopup.css";
import React, { useState, useRef, useEffect, useCallback, Component} from "react";
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
const notFoundPath = "/assets/icons/icoFace3B.png"


const regBodyStatus = {
    INIT: 0,
    FAIL: 1,
    SUCCESS:2,
}
function StartProfile({isLogined}) {

    const history = useHistory();

    console.log("starProfile");
    const [bodyStatus, setBodyStatus] = useState(regBodyStatus.INIT);
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
        if(starInfo.price < 10000) {
            alert('영상 가격의 최소값은 10000입니다.');
            price = 10000;
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
        console.log("onchangetext");
        const { name, value } = e.target;
        const nextInputs = {
            ...starInfo,  
            [name]: value,
        };
        setStarInfo(nextInputs);
    };

    const categoryData = [
        {
            value: 'influencer',
            id: "1001",
            text: '유명인',
        },
        {
            value: '방송인',
            id: "1002",
            text: '방송인',
        },
        {
            value: '예술인',
            id: "1003",
            text: '예술인',
        },
        {
            value: '가수',
            id: "1004",
            text: '가수'
        },
        {
            value: '운동선수',
            id: "1005",
            text: '운동선수',
        },
        {
            value: '크리에이터',
            id: "1006",
            text: '크리에이터'
        },
        {
            value: '교육자',
            id: "1007",
            text: '교육자',
        },
        {
            value: '개그맨',
            id: "1008",
            text: '개그맨',
        },
        {
            value: '프로게이머',
            id: "1009",
            text: '프로게이머'
        },

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

    const findCatId = useCallback((value)=>{
        const target = categoryData.filter(item=> item.value === value);

        return target && target[0].id || "9999";
    },[])
    const [categorySelectedOption, setCategorySelectedOption] = useState(null);
    const categoryChange = e => {
        setCategorySelectedOption(e);
        setStarInfo( {
            ...starInfo,  
            'catNm': e.value,
            'catId': findCatId(e.value),
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
                // setPriceSelectedOption({value: result.data.price, text: result.data.price});
                setBodyStatus(regBodyStatus.SUCCESS);
            } else {
                setBodyStatus(regBodyStatus.FAIL);
            }
        }).catch(e => {
            console.error(e.message);
            setBodyStatus(regBodyStatus.FAIL);
        });

    },[]);

    const _complete = () => {
        console.log(starInfo);

        AWSManager.updateStarInfo({
            ...starInfo,
        }).then((result) => {
           alert("수정 완료되었습니다");
        })
    };

    // selectorStyles object
    const customStyles = {
        option: (styles, state) => ({
            ...styles,
            cursor: 'pointer',
        }),
        control: (styles) => ({
            ...styles,
            cursor: 'pointer',
        }),

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
                    {
                        {
                            [regBodyStatus.INIT] :   <></>,
                            [regBodyStatus.FAIL] :
                                <div className="messageList">
                                    <div className="emptyMessage">
                                        <img alt="none" src={notFoundPath} />
                                        <p>아직 스타등록을 하지 않았습니다.</p>
                                    </div>
                                </div>,
                            [regBodyStatus.SUCCESS] :
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
                                                <img className="thumbnail-img" alt="none"
                                                     src={StorageManager.loadUserInfo().userImgUrl ? StorageManager.loadUserInfo().userImgUrl : thumPath}/>
                                                {/* <img className="thumbnail-icon" alt="none" src={cameraPath} /> */}
                                            </div>
                                        </div>
                                        <span>
                                            분야
                                        </span>
                                        <div>
                                            <Select
                                                placeholder=""
                                                styles={customStyles}
                                                value={categorySelectedOption}
                                                options={categoryData}
                                                components={{DropdownIndicator}}
                                                onChange={categoryChange}
                                                styles={customStyle}
                                                getOptionLabel={e => (
                                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                                        <span style={{fontSize: "2.4vw", fontWeight: "bold",}}>{e.text}</span>
                                                    </div>
                                                )}
                                            />
                                        </div>
                                        <span>
                                            영상가
                                        </span>
                                        <div>
                                            <input
                                                type="number"
                                                onChange={onChange}
                                                onBlur={updatePriceUnit}
                                                value={starInfo.price}
                                                name="price"
                                                min="10000"
                                                step='1000'
                                                max="1000000"
                                            />
                                            <img alt="none" src={editPath}/>
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
                                            />
                                            <img alt="none" src={editPath}/>
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
                                                    // onKeyUp={onKeyupCountStoryCharacter}
                                                    ref={textareaElement}
                                                    name="longComment"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </span>
                                </div>
                        }[bodyStatus]
                    }
            </section>
            <section className="mypage-button">
                {bodyStatus == regBodyStatus.SUCCESS?
                    <div>
                    <button className="full-button" onClick={_complete}>
                        수정완료
                    </button>
                    </div>
                    : ""
                }
            </section>
        </main>
     );
 } export default WrapLoginedComponent(StartProfile)
 