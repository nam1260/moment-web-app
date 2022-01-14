import { useState, forwardRef, useEffect } from 'react';
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

const downArrow = "/assets/icons/list-ico-open.png"

function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

export default function MomentDatePicker({ setDate }) {
    const [startDate, setStartDate] = useState(new Date());

    useEffect(() => {
        const fullOfYear = startDate.getFullYear();
        let fullOfMonth = startDate.getMonth()+1;
        fullOfMonth = fullOfMonth < 10 ? `0${fullOfMonth}` : fullOfMonth;
        let fullOfDate = startDate.getDate();
        fullOfDate = fullOfDate < 10 ? `0${fullOfDate}` : fullOfDate;
        setDate(`${fullOfYear}${fullOfMonth}${fullOfDate}`)
    }, [startDate, setDate])

    const minDate = addDays(new Date(), 7);
    const maxDate = addDays(minDate, 23);
    
    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <div className="custom-input"  onClick={onClick}>
            <DateLabel>
                {value.split("/")[0]}
                <div ref={ref}>
                    <img alt="none" src={downArrow} />
                </div>
            </DateLabel>
        </div>
      ));
    return (
        <DatePicker 
            locale="ko"
            selected={startDate}
            customInput={<ExampleCustomInput />}
            onChange={(date) => setStartDate(date)}
            dateFormat="yyyy-MM-dd"
            showDisabledMonthNavigation
            minDate={minDate}
            maxDate={maxDate}
        />
            
    )
}