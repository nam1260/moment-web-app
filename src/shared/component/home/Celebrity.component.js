import React from "react";
import styled from "styled-components";

const CelebrityCard = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 4px;

  & > .img-content {
    width: 120px;
    height: 180px;
    overflow: hidden;
    position: relative;

    background-color: ${(props) => props.isAdd && "rgb(255, 114, 58)"};

    & > .star-image {
      height: 120%;
      position: absolute;
      top: -10%;
      left: -10%;
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
    display: flex;
    width: 100%;
    margin-top: 8px;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    & > b {
      height: 28px;
      font-size: 20px;
      font-stretch: normal;
      text-align: left;
      color: #101010;
    }

    & > span {
      opacity: 0.8;
      font-size: 16px;
      font-weight: normal;
      font-stretch: normal;
      font-style: normal;
      color: rgba(143, 143, 143, 0.8);
    }
  }

  @media (max-width: 750px) {
    margin-right: min(1vw, 10px);
    & > .img-content {
        width:min(16vw, 120px);
        height:min(26vw, 180px);

        & > .none-logo {
            width:min(10vw, 60px);
            height:min(10vw, 61px);
        }
        & > .plus-img {
            width:min(4vw, 26px);
            height:min(4vw, 26px);
        }
    }

    & > .article-footer {
        margin-top: min(1vw, 16px);
    }
    & > .article-footer > b {
        font-size: min(3vw, 20px);
        height: min(4vw, 28px);
    }

    & > .article-footer > span {
        margin-top:min(1vw, 16px);
        font-size: min(3vw, 24px);
    }
  }
`;

const dummyIcon = "/assets/icons/main-ico-dummy.png";
const plusIcon = "/assets/icons/main-plus-request.png";

function CelebrityComponent({
  name,
  secondary,
  imgPath,
  starId,
  history,
  isAdd,
}) {
  const onClickEvent = isAdd
    ? () => console.log("Add")
    : () => history.push(`/star/${starId}`);
  return (
    <CelebrityCard isAdd={isAdd} onClick={onClickEvent}>
      <div className={"img-content"}>
        {isAdd ? (
          <>
            <img
              className={"none-logo"}
              alt="none"
              src={dummyIcon}
              style={{ opacity: 0.6 }}
            />
            <img className={"plus-img"} alt="none" src={plusIcon} />
          </>
        ) : (
          <img className="star-image" alt="none" src={imgPath} />
        )}
      </div>
      <div className="article-footer">
        {isAdd || <b>{name}</b>}
        <span>{isAdd ? '요청해주세요' : secondary}</span>
      </div>
    </CelebrityCard>
  );
}

export default React.memo(CelebrityComponent);
