import { useState, forwardRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker'
import ko from 'date-fns/locale/ko';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

registerLocale('ko', ko)

const DateLabel = styled.div`
    display:flex;
    justify-content:space-between;
    border-bottom: 2px solid #ddd;
    font-size: 36px;
    font-weight: bold;
    letter-spacing: -0.36px;
    color: black;
    height: 70px;
    flex:1 ;

    @media (max-width: 750px) {
        font-size: min(4vw, 36px);
        height:  min(8vw, 70px);
        & > div > img {
            width: min(5vw, 40px)
        }
    }
    
`


const TimeLabel = styled.div`
    font-size: 36px;
    font-weight: bold;
    letter-spacing: -0.36px;
    color: #aaaaaa;
    height: 70px;
    margin-left: 66px;
    @media (max-width: 750px) {
        font-size: min(4vw, 36px);
        height:  min(8vw, 70px);
    }

`
const downArrow = "/assets/icons/list-ico-open.png"

export default function MomentDatePicker() {
    const [startDate, setStartDate] = useState(new Date());
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="custom-input">
            <DateLabel>
                {value.split("/")[0]}
                <div onClick={onClick} ref={ref}>
                    <img alt="none" src={downArrow} />
                </div>
            </DateLabel>
            
            <TimeLabel>
                {value.split("/")[1]}분 까지
            </TimeLabel>
        </div>
      ));
    return (
        <DatePicker 
            showTimeSelect
            locale="ko"
            selected={startDate}
            customInput={<ExampleCustomInput />}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd/hh:mm"
        />
            
    )
}