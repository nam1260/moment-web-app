
import "./mypage.css";
import React, { useState, useEffect, useRef, Component} from "react";
import { useHistory } from 'react-router'; 
import MypageHeader from './MypageHeader';
import AWSManager from "../../managers/AWSManager.js";
import StorageManager from "../../managers/StorageManager";




const editPath = "assets/icons/list-ico-edit.png";
const cameraPath = "assets/icons/ico-camera.svg";
const thumPath = "assets/images/thum-160-px-1.png";
const checkOffPath = "assets/icons/check-off.svg";
const checkOnPath = "assets/icons/check-on.svg";



// TODO 이미지 등록 처리 필요
// TODO 닉네임 중복검사 로직 필요
// TODO 휴대폰번호 인증 로직 필요
export default function ModifyAccountComponent() {
    const history = useHistory();

    const [userInfo, setUserInfo] = useState({
        userId:'',
        userNm:'',
        userPw: '',
        pwConfirm: '',
        phoneNum: '',
        userNickNm: '',
        starYn: '',
        mrktAgreeYn: '',
    });


    const [inputVariables, setIsValidVariables] = useState({
        isValidPhoneNum: true,
        isValidUserNickNm: true,
        isValidPw: false,
        isPwConfirm: false,
    });

    const [nickNmAlertText, setNickNmAlertText] = useState('닉네임을 입력해 주세요');
    const [phoneNumAlertText, setPhoneNumAlertText] = useState('휴대폰 번호를 입력해 주세요(숫자만 입력 가능)');
    const [pwAlertText, setPwAlertText] = useState('비밀번호를 입력해 주세요');
    const [pwConfirmAlertText, setPwConfirmAlertText] = useState('');
    const { userPw, pwConfirm, phoneNum, userNickNm, mrktAgreeYn } = userInfo

    const onChange = (e) => {
        const { name, value } = e.target;
        const nextInputs = {
            ...userInfo,
            [name]: value,
        };
        setUserInfo(nextInputs);
    };

    const onChangeNickNmFormat = (e) => {
        var nickNmRule = /^[0-9|a-z|A-Z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]{5,13}$/;
        let nickNmAlertText ="";
        let isValidUserNickNm = false;
        if(!e.target.value) {
            nickNmAlertText = "닉네임을 입력해주세요";
        }else {
            isValidUserNickNm = nickNmRule.test(e.target.value);
            nickNmAlertText =  isValidUserNickNm ? '올바른 닉네임 입니다' : '닉네임이 올바르지 않습니다';
        }

        setIsValidVariables({
            ...inputVariables,
            isValidUserNickNm
        })
        setNickNmAlertText(nickNmAlertText);

        //set flag

        console.log(nickNmAlertText);
        onChange(e);
    };
    const onChangePhoneNumber = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');

        setIsValidVariables({
            ...inputVariables,
            isValidPhoneNum: e.target.value.length >9 ? true : false
        });

        onChange(e)
    };
    const onChangePassword = (e) => {
        var passRule = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^*()&+=]).*$/; // 특수문자 / 문자 / 숫자 포함 형태의 8~20자리 이내의 암호 정규식


        let inputPw = e.target.value;
        let isValidPw = inputPw && passRule.test(inputPw);

        //text set
        if(!inputPw) {
            setPwAlertText("비밀번호를 입력하세요");
        }else {
            setPwAlertText(isValidPw ? "올바른 비밀번호 입니다" : "비밀번호가 올바르지 않습니다(특수문자, 숫자, 영문 포함 8~20자리)");
        }

        //flag set
        setIsValidVariables({
            ...inputVariables,
            isValidPw
        });


        onChange(e);
    };
    const onChangePasswordConfirm = (e) => {
        var confirm = e.target.value;
        var pw = userInfo['userPw'];
        let isPwConfirm = false;
        let confirmText = "";
        if(!confirm) confirmText = "";

        else if(confirm === pw) {
            confirmText = "비밀번호가 일치합니다";
            isPwConfirm = true;
        }
        else confirmText = "비밀번호가 일치하지 않습니다";

        //test set
        setPwConfirmAlertText(confirmText);

        //flag set
        setIsValidVariables({
            ...inputVariables,
            isPwConfirm
        });
        onChange(e);
    };


    const onToggleMrktAgreeYn = (e) => {
        console.log(e);
        setUserInfo({
            ...userInfo,
            mrktAgreeYn :mrktAgreeYn === "y" ? "n": "y"
        });

    };

    const _returnToHome = () => {
        history.push("/");
    };
    const _complete = () => {
        console.log(userInfo);

        if(inputVariables.isValidPhoneNum && inputVariables.isValidUserNickNm && inputVariables.isValidPw && inputVariables.isPwConfirm) {
            AWSManager.updateUserInfo({
                ...userInfo
            })
        } else {
            alert("유효하지 않은 접근입니다.");
        }

    };

    //function 의 lifeCycle을 담당한다.
    useEffect(() =>{
        console.log("랜더링 시마다 호출");
        let userId = StorageManager.loadUserInfo() ? StorageManager.loadUserInfo().userId : "";
        AWSManager.getUserInfo({
            userId
        }).then((result) =>{
            if(result && result.status === 200 && result.data) {
                setUserInfo(result.data)
            }
        });

    },[]);
 
    return (
        <main>
            <MypageHeader index={0}/>
            <section className="mypage-header">
                <div>
                    <span>회원 정보 수정</span>
                </div>
            </section>
            <section className="mypage-container">
                <div>
                    <span>
                        <span>
                            이메일
                        </span>
                        <div className="mypage-email">
                            <div>
                                <div>{userInfo.userId}</div>
                            </div>
                            <div className="thumbnail"> 
                                <img className="thumbnail-img" alt="none" src={thumPath} />
                                <img className="thumbnail-icon" alt="none" src={cameraPath} />
                            </div>
                        </div>
                        <span>
                            이름
                        </span>
                        <div className="nickname">
                            <div>{userInfo.userNm}</div>
                        </div>
                        <span>
                            비밀번호 <span id="subText">{pwAlertText}</span>
                        </span>
                        <div>
                            <input
                                type="password"
                                onChange={onChangePassword}
                                value={userPw}
                                name="userPw"
                            ></input>
                        </div>
                        <span>
                            비밀번호 확인 <span id="subText">{pwConfirmAlertText}</span>
                        </span>
                        <div>
                            <input
                                type="password"
                                onChange={onChangePasswordConfirm}
                                value={pwConfirm}
                                name="pwConfirm"
                            ></input>
                        </div>
                        <span>
                            닉네임 <span id="subText">{nickNmAlertText}</span>
                        </span>
                        <div>
                            <input
                                placeholder={userInfo.userNickNm}
                                type="text"
                                onChange={onChangeNickNmFormat}
                                value={userNickNm}
                                name="userNickNm"
                            ></input>
                            <img alt="none" src={editPath} />
                        </div>
                        <span>
                            휴대폰 번호 <span id="subText">{phoneNumAlertText}</span>
                        </span>
                        <div>
                            <input
                                placeholder={userInfo.phoneNum}
                                type="text"
                                onChange={onChangePhoneNumber}
                                value={phoneNum}
                                name="phoneNum"
                            ></input>
                            <img alt="none" src={editPath}/>
                        </div>
                          <br/>

                        <span>
                            <img alt="none" id="mrktAgreeYn" src={mrktAgreeYn ==='y' ? checkOnPath : checkOffPath}
                                 onClick={onToggleMrktAgreeYn}/>
                            <span class="highlight" onClick={() => {
                                history.push('/doc/1')
                            }}>제 3자 제공 및 마케팅</span>
                            <span> 수신 동의 (선택)</span>
                        </span>

                    </span>
                </div>
            </section> 
            <section className="mypage-button">
                <div>
                    <button className="cancel-button" onClick={_returnToHome}>
                        취소하기
                    </button>
                    <button onClick={_complete}>
                        수정완료
                    </button>
                </div>
            </section>
        </main>
     );
 }
 