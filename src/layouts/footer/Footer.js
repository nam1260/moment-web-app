import React from "react";
import "./footer.css";
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebookF } from 'react-icons/fa';
function Footer() {
    return (
        <footer className="app-moment-footer">
            <div className="container">
                <h3>
                    <span>moment</span>
                    모멘트
                </h3>
                <p>사업자 등록번호 : 111-111-1111</p>
                <p>대표: 박재영</p>
                <p>통신 판매업 신고 번호: 2021-서울강남-1863</p>
                <p>E-mail: moment@gamil.com</p>
                <nav className="footer-info">
                    <a href="#">이용약관</a>
                    <a href="#">개인정보처리방침</a>
                    <a href="#">고객센터</a>
                    <a href="#">파트너문의</a>
                </nav>
                <nav className="sns-wrapper">
                    <a href="#">
                        <AiFillInstagram />
                    </a>
                    <a href="#">
                        <FaFacebookF />
                    </a>
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
