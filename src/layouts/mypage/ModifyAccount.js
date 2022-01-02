
import "./mypage.css";
import React, { useState, useEffect, useRef, Component} from "react";
import { useHistory } from 'react-router'; 
import MypageHeader from './MypageHeader';
import AWSManager from "../../managers/AWSManager.js";
import AWSS3Manager from "../../managers/AWSS3Manager.js";
import StorageManager from "../../managers/StorageManager";
import EncryptionManager from "../../managers/EncryptionManager.js";
import {WrapLoginedComponent} from "../../shared/component/common/WrapLoginedComponent";
import {Redirect} from 'react-router-dom'


const editPath = "assets/icons/list-ico-edit.png";
const cameraPath = "assets/icons/ico-camera.svg";
const thumPath = "assets/icons/ico-user-default.png";
const checkOffPath = "assets/icons/check-off.svg";
const checkOnPath = "assets/icons/check-on.svg";

const contentType = 'image/jpeg, image/png';


// TODO 이미지 등록 처리 필요
// TODO 동일 닉네임 저장 시 그대로 저장되도록 처리 필요
function ModifyAccountComponent({isLogined}) {
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
        userImgUrl: '',
        salt: '',
    });

    const [checkVariables, setValidVariables] = useState({
        isValidPhoneNum: true,
        isValidUserNickNm: true,
        isCheckedNickNmDupl:true,
        isValidPw: false,
        isPwConfirm: false,
    });

    const fileInput = useRef(null);
    const [profileImage, setprofileImage] = useState(undefined);

    const [nickNmAlertText, setNickNmAlertText] = useState('중복 닉네임 존재 시 변경되지 않습니다');
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
            nickNmAlertText =  isValidUserNickNm ? '중복 닉네임 존재 시 변경되지 않습니다' : '닉네임이 올바르지 않습니다';
        }

        setValidVariables({
            ...checkVariables,
            isValidUserNickNm,
            isCheckedNickNmDupl: false
        })
        setNickNmAlertText(nickNmAlertText);

        //set flag

        console.log(nickNmAlertText);
        onChange(e);
    };


    const onChangePhoneNumber = (e) => {
        e.target.value = e.target.value.replace(/[^0-9]/g, '');

        setValidVariables({
            ...checkVariables,
            isValidPhoneNum: e.target.value.length >9 ? true : false
        });

        onChange(e)
    };
    const onChangePassword = (e) => {
        var passRule = /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^*()&+=]).*$/; // 특수문자 / 문자 / 숫자 포함 형태의 8~20자리 이내의 암호 정규식


        let inputPw = e.target.value;
        let isValidPw = inputPw && passRule.test(inputPw);
        let pwConfirm = userInfo['pwConfirm'];
        //text set
        if(!inputPw) {
            setPwAlertText("비밀번호를 입력하세요");
        }else {
            setPwAlertText(isValidPw ? "올바른 비밀번호 입니다" : "비밀번호가 올바르지 않습니다(특수문자, 숫자, 영문 포함 8~20자리)");
        }

        let confirmPwText = "";
        let isPwConfirm = false;
        if(inputPw && inputPw === pwConfirm) {
            confirmPwText ="비밀번호가 일치합니다";
            isPwConfirm = true;
        }else if(inputPw && pwConfirm){
            confirmPwText = "비밀번호가 일치하지 않습니다";
        }

        setPwConfirmAlertText(confirmPwText);

        //flag set
        setValidVariables({
            ...checkVariables,
            isValidPw,
            isPwConfirm
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

        //text set
        setPwConfirmAlertText(confirmText);

        //flag set
        setValidVariables({
            ...checkVariables,
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

        if(checkVariables.isValidPhoneNum && checkVariables.isValidUserNickNm && checkVariables.isValidPw && checkVariables.isPwConfirm) {

            checkDuplNick().then(() => {

                EncryptionManager.createPassword(userInfo.userPw).then((result) => {
                    console.log(result);
                    let salt = result.salt;
                    AWSManager.updateUserInfo({
                        ...userInfo,
                        userPw: result.password,
                        salt: salt
                    }).then((result) => {
                        if (result && result.status === 200) {
                            StorageManager.saveSalt(salt);
                            _returnToHome();
                        }
                    })

                })
            }).catch((e) => {
                console.log(e)
            })
        }else {
            alert("비밀번호 / 닉네임 / 휴대폰 번호 가 정상 입력되었는지 확인해주세요")
        }

    };

    const checkDuplNick = (type)=>{
        if(!checkVariables.isValidUserNickNm) return;
        let nickNmAlertText = "";
        let duplResult = false;
        return new Promise((resolve,reject) => {

            if(checkVariables.isCheckedNickNmDupl) resolve();
            else {
                AWSManager.checkDuplNickNm({userNickNm}).then((result) => {
                    if(result && result.status === 200) {
                        if(result.data.isDupl) {
                            nickNmAlertText = "중복된 닉네임이 존재합니다.";
                            reject("error");
                        }else {
                            duplResult = true;
                            nickNmAlertText = "사용 가능한 닉네임 입니다.";
                            resolve();
                        }
                        //TODO 중복 닉네임 체크 관련 비동기 확인 필요 (setState 이슈)
                        //setCheckedNickNmDupl(duplResult);
                        setNickNmAlertText(nickNmAlertText);
                    }else {
                        alert("server error");
                        reject("server error");
                    }
                })
            }

        })

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

            // setCheckedNickNmDupl(true)
        });

    },[]);
 
    const onImgChange = async (event)=>{
        var file = event.target.files[0];
        
        console.log(file);
        if(file && (file.type.indexOf('jpeg') > -1 || file.type.indexOf('png') > -1)) {
            // 미리 보기 반영 
            const reader = new FileReader();
            reader.onload = e => {
                setprofileImage(e.target.result);
            }
            reader.readAsDataURL(file);

            // S3 저장 
            let fileNm = 'profile';
            // let fileNm = file.name.split('.')[0]; // 실제 파일 명으로 저장 
            let fileType = file.type.split('/');
            let extension = fileType[fileType.length-1];
            AWSS3Manager.uploadImage(file, userInfo.userId, fileNm)
            .then((data)=> {
                AWSManager.saveUserImageUrl({
                    userId: userInfo.userId, 
                    fileNm: fileNm + '.' + extension,
                }).then((result) => {
                    console.log(result);
                    if(result.data.userImgUrl) {
                        StorageManager.saveUserInfo({
                            ...StorageManager.loadUserInfo(),
                            userImgUrl: result.data.userImgUrl
                        });
                    }
                });
            })
            .catch(err => console.error(err));

        } else {
            alert('jpg, png 형식의 파일만 첨부하실 수 있습니다.');
        }
    };

    return (

        !isLogined ? <Redirect to="/"/> :
            
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
                                <img className="thumbnail-img" alt="none" src={profileImage ? profileImage : (userInfo.userImgUrl ? userInfo.userImgUrl : thumPath)} />
                                <img className="thumbnail-icon" alt="none" src={cameraPath} for="inputLogoImg" onClick={() => fileInput.current.click()} />
                                <input type='file' ref={fileInput} accept={contentType} name='file' style={{ display: 'none' }} onChange={onImgChange}/>
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

                           {/*<span id="duplCheckBtn" className= { checkVariables.isValidUserNickNm? "enable" : "disable"} onClick={()=>{checkDuplNick('nickname');}}>*/}
                                {/*중복확인*/}
                            {/*</span>*/}
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
                    <button id="complete"onClick={_complete}>
                        수정완료
                    </button>
                </div>
            </section>
        </main>
     );
 } export default WrapLoginedComponent(ModifyAccountComponent);
 