import styled from "styled-components";


const onStar = "/assets/icons/star-2-on.png";
const offStar = "/assets/icons/star-2-off.png";

const StarWrapper = styled.div`
    display:inline-flex;
    height:23px;

    & > span {
        color: #ff723a;
        line-height: 28px;
        margin-left: 5px;
        font-size: 28px;
        font-weight: bold;
    }
`

const StarElement = styled.img.attrs((props) => ({
    alt: 'none',
    src: props.flag === 'on' ? onStar : offStar
}))`
    width:23px;
    height:23px;
`

const TOTAL_RATING = 5;

export default function StarRatingComponent({ score = 0 }) {
    const scoreToInt = Math.round(score);
    let StarElements = Array(TOTAL_RATING).fill().reduce((prev, _, index) => 
        [...prev, <StarElement flag={ index >= scoreToInt ? 'off' : 'on'} />]
    , [])

    return (
        <StarWrapper>
            {StarElements}
            <span>{score}</span>
        </StarWrapper>
    )

}