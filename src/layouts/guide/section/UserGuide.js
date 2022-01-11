import GuideComponent from 'shared/component/guide/GuideItem';


const IMG_GUIDE_USER1 = "/assets/images/guide-user-1.png";
const IMG_GUIDE_USER2 = "/assets/images/guide-user-2.png";
const IMG_GUIDE_USER3 = "/assets/images/guide-user-3.png";
const IMG_GUIDE_USER4 = "/assets/images/guide-user-4.png";

export default function UserGuideComponent() {
    return (
        <div className="container">
            <div className="user-body">
                <GuideComponent 
                    title={'원하는 스타를 검색'}
                    index={1}
                    imgSrc={IMG_GUIDE_USER1}
                />
                <GuideComponent 
                    title={'원하는 스타를 선택'}
                    index={2}
                    imgSrc={IMG_GUIDE_USER2}
                />
                <GuideComponent 
                    title={'나의 스타에게\n사연을 작성합니다'}
                    index={3}
                    imgSrc={IMG_GUIDE_USER3}

                />
                <GuideComponent 
                    title={'나의 스타에게\n사연을 전송합니다'}
                    index={4}
                    imgSrc={IMG_GUIDE_USER4}

                />
            </div>
        </div>
    )
}