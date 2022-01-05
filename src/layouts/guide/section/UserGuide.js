import GuideComponent from 'shared/component/guide/GuideItem';


export default function UserGuideComponent() {
    return (
        <div className="container">
            <div className="user-body">
                <GuideComponent 
                    title={'원하는 스타를 검색'}
                    index={1}
                />
                <GuideComponent 
                    title={'원하는 스타를 선택'}
                    index={2}
                />
                <GuideComponent 
                    title={'나의 스타에게\n사연을 작성합니다'}
                    index={3}
                />
                <GuideComponent 
                    title={'나의 스타에게\n사연을 전송합니다'}
                    index={4}
                />
            </div>
        </div>
    )
}