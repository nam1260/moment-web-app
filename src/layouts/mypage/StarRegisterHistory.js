
import "./mypage.css";
import "../popup/modalPopup.css";
import React, { useState, useRef, Component} from "react";
import { useHistory } from 'react-router'; 
import { Modal } from "../popup/ModalPopup";
import MypageHeader from './MypageHeader';

const editPath = "assets/icons/list-ico-edit.png"
const failIcon = "assets/icons/icoFace3@3x.png"
const successIcon = "assets/icons/icoFace1@3x.png"


export default function StartRegisterHistory() {

    return (
        <main>
            <MypageHeader index={4}/>
            <section className="mypage-header">
                <div className="container">
                    <span>스타 등록 현황</span>
                </div>
            </section>
        </main>
     );
 }
 