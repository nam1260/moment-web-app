import MomentModal from "../common/modal";
import styled from 'styled-components';
import React,{useState,useCallback,useMemo,useRef, useEffect} from "react"
import emailjs, { init,sendForm,send } from 'emailjs-com';
import {useHistory} from "react-router"

const StyledContactModal = styled.div`
    margin: 40px;
    padding-top: 20px;
    & > div {
        font-size: 28px;
        letter-spacing: -0.36px;
        font-weight: 800;
        text-align: center;
        height: 40px;
        line-height: 40px;
        margin-bottom: 40px;

        @media (max-width: 750px) {
            font-size: min(5vw, 22px);
            margin-bottom: min(3vw, 40px);
        }
        
    }
    
    & > div:last-child {
        cursor: pointer;
    }
    
    label {
        text-align: left;
        font-size : 23px;
        font-weight: 700;
        
          @media (max-width: 750px) {
            font-size: min(5vw, 16px);
            margin-bottom: min(3vw, 40px);
        }
        
    }
    
    input {
        width: 100%;
        font-size: min(4vw, 20px);
        font-weight: bold;
        font-stretch: normal;
        font-style: normal;
        line-height: normal;
        letter-spacing: -0.36px;
        text-align: center;
        border-top: none;
        border-left: none;
        border-right: none;
    }
    
    input#submit{
        border: 1px solid black;
        cursor: pointer;
    }
    

    textArea {
        width: 100%
    }
    textArea {
      height: 250px;  
      font-size: min(4vw, 16px);
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.36px;  
    border: 1px solid grey;
      @media (max-width: 750px) {
        height: min( 81.89999999999999vw, 100px );
      }
    }

    & + .footer > .confirm {
        background-color: #f0f0f0 !important;
        color: black !important;
    }

    @media (max-width: 750px) {
        margin: min(3vw, 40px);
        padding-top: min(1vw, 20px);
    }
`

const EMAIL_USER_ID = "user_btxMAA4NA3dQIJAHqpM6h";
const EMAIL_SERVICE_ID = "service_6rbt3rs";
const EMAIL_TEMPLATE_ID = "template_r4asjec";

export default function ContactModal({ isModalOpen, setIsModalOpen, contactTitle}) {
    console.log("ContactModal");

    const formInput = useRef();
    const history = useHistory();
    useEffect(()=>{
        emailjs.init(EMAIL_USER_ID);
    },[]);

    const onClickSummit = useCallback(()=>{

        const current = formInput.current;
        const name = current.querySelector('[name="name"]').value;
        const email = current.querySelector('[name="email"]').value;
        const phone = current.querySelector('[name="phone"]').value;
        const message = current.querySelector('[name="message"]').value;

        if(!name) {
            alert("????????? ???????????????")
            return;
        }
        if(!email) {
            alert("???????????? ???????????????")
            return;
        }
        if(!phone) {
            alert("??????????????? ???????????????")
            return;
        }
        if(!message) {
            alert("???????????? ???????????????");
            return;
        }

        emailjs.send(EMAIL_SERVICE_ID, EMAIL_TEMPLATE_ID,
            {name,email,phone,message}, EMAIL_USER_ID).then((result) => {
                setIsModalOpen(false);
                }, (error) => { console.log(error.text); });

    },[]);
    return (
        <MomentModal
            isOpen={isModalOpen}
            confirmText={'??????'}
            contentComponent={
                <StyledContactModal>
                    <div>Moment??? ????????? ????????? ???????????????</div>
                    <section ref={formInput} id="contact-form">
                        <div>
                            <label>??????</label>
                            <input placeholder="??????" type="text" name="name"/>
                        </div>
                        <div>
                            <label>Email</label>
                            <input placeholder="???????????? ??????????????????" type="email" name="email"/>
                        </div>

                        <div>
                            <label>Phone</label>
                            <input placeholder="?????? ????????? ????????? ????????? ??????????????????" type="number" name="phone"/>
                        </div>

                        <div>
                            <label>Message</label>
                            <textarea placeholder= "?????? ????????? ????????? ?????? ??? ??? ?????? SNS ?????? ????????? ?????? ??????????????? !" name="message"></textarea>
                        </div>

                        <div>
                            <input id='submit' type="submit" onClick={onClickSummit} value="?????????"/>
                        </div>
                    </section>

                </StyledContactModal>
            }
            onClickHandlerConfirm={() => setIsModalOpen(false)}
            width={650}
            height={800}
        />
    )
}