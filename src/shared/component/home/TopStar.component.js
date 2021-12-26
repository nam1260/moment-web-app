import React from "react";
import styled from "styled-components";

const TopStarCard = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1;
  margin-right: 5px;
  border-radius: 4px;
  position: relative;

  & > .img-content {
    min-width: 170px;
    height: 240px;
    overflow: hidden;
    position: relative;
    border-radius: 4px;
    background: ${(props) => 
      props.isAdd ? 'none'
      : `
        linear-gradient(
          rgb(236, 236, 236),
          rgb(236, 236, 236),
          rgb(207, 207, 207)
        );
      `
    };
    background-color:${(props) => props.isAdd && 'rgb(255, 114, 58)'};
    & > .star-img {
      height: 100%;
    }
    & > .none-logo {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    & > .plus-img {
      position: absolute;
      bottom: 5%;
      left: 5%;
    }
  }

  & > .article-footer {
    width: 100%;
    & > b {
      font-size: 24px;
      color: white;
      height: 29px;
      display: inline-block;
      color: #101010;
      line-height: 2.06;
    }
    & > p {
      color: rgba(143, 143, 143, 0.8);
      font-size: 20px;
      opacity: 0.8;
      margin: 0px;
    }
  }

  @media (max-width: 750px) {

    & > .img-content {
      min-width: min(23vw, 170px);
      height: min(35vw, 240px);

      & > .none-logo {
        width:min(12vw, 60px);
        height:min(12vw, 61px);
      }
      & > .plus-img {
          width:min(6vw, 26px);
          height:min(6vw, 26px);
      }
    }

    & > .article-footer {
      bottom: min(4vw, 30px);
      left: min(4vw, 30px);
    }
    & > .article-footer > b {
      font-size: min(5vw, 24px);
      height: min(5vw, 29px);
    }

    & > .article-footer > p {
      font-size: min(4vw, 20px);
    }

  }
`;
const dummyIcon = "/assets/icons/main-ico-dummy.png";
const plusIcon = "/assets/icons/main-plus-request.png";

function TopStarComponent({ name, secondary, imgPath, starId, history, isAdd }) {
  const onClickEvent = isAdd ? () => console.log('Add') : () => history.push(`/star/${starId}`);
  
  return (
    <TopStarCard isAdd={isAdd} onClick={onClickEvent}>
      <div className="img-content">
        {
          isAdd ? (
            <>
              <img className={'none-logo'} alt="none" src={dummyIcon} style={{ opacity: 0.6 }} />
              <img className={'plus-img'} alt="none" src={plusIcon} />
            </>
          )
          : <img className={"star-img"} alt="none" src={imgPath} />
        }
        
      </div>
      <div className="article-footer">
        {isAdd || <b>{name}</b>}
        <p>{isAdd ? '요청해주세요' : secondary}</p>
      </div>
    </TopStarCard>
  );
}

export default React.memo(TopStarComponent);
