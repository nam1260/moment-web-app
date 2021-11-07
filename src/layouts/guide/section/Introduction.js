import TabsComponent from '../../../shared/component/guide/IntroductionItem';

const backgroundImage = "/assets/images/present-1-img-main.png";
const introImage = [ 
    "/assets/images/present-img-1.png",
    "/assets/images/present-img-2.png",
    "/assets/images/present-img-3.png"
]



export default function IntroductionComponent() {
    return (
        <div className="container">
            <div>
                <img alt="none" src={backgroundImage} />
            </div>
            <div className="guide-body">
                <div>
                    내가 좋아하는 스타가<br />
                    만들어주는 나만의 순간을<br />
                    위한 영상 메시지
                </div>
                <div>
                    당신의 인생에서 가장 축하 받고 싶은 순간을<br />
                    당신이 가장 좋아하는 스타가 직접 축하해준다면?
                </div>
                <TabsComponent 
                    title={'나만을 위한 맞춤 영상'}
                    des={'오직 내 사연만이 담긴 영상!'}
                    index={1}
                    imgPath={introImage[0]}
                />
                <TabsComponent 
                    title={'내가 좋아하는 스타에게'}
                    des={'내가 좋아하는 스타가 직접 만들어주는 영상!'}
                    index={2}
                    imgPath={introImage[1]}
                />
                <TabsComponent 
                    title={'내 맘대로 쓸 수 있는 영상'}
                    des={'SNS는 물론 결혼식, 개업식 졸업식 등\n 원하는 순간에 영상을 활용하세요'}
                    index={3}
                    imgPath={introImage[2]}
                />
            </div>
        </div>
    )
}