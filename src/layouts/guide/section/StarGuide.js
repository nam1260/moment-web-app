import GuideComponent from 'shared/component/guide/GuideItem';


const IMG_GUIDE_STAR1 = "/assets/images/guide-star-1.png"
const IMG_GUIDE_STAR2 = "/assets/images/guide-star-2.png"
const IMG_GUIDE_STAR3 = "/assets/images/guide-star-3.png"
const IMG_GUIDE_STAR4 = "/assets/images/guide-star-4.png"




export default function StarGuideComponent() {
    return (
        <div className="container">
            <div className="user-body">
                <GuideComponent 
                    title={'마이 페이지에서 스타 등록'}
                    imgSrc={IMG_GUIDE_STAR1}
                    index={1}
                />
                <GuideComponent 
                    title={'받은 사연을 확인'}
                    imgSrc={IMG_GUIDE_STAR2}
                    index={2}
                />
                <GuideComponent 
                    title={'영상을 제작&업로드 합니다'}
                    imgSrc={IMG_GUIDE_STAR3}
                    index={3}
                />
                <GuideComponent 
                    title={'등록된 영상의\n링크를 전달합니다'}
                    imgSrc ={IMG_GUIDE_STAR4}
                    index={4}
                />
            </div>
        </div>
    )
}