import GuideComponent from '../../../shared/component/guide/GuideItem';


export default function StarGuideComponent() {
    return (
        <div className="container">
            <div className="user-body">
                <GuideComponent 
                    title={'마이 페이지에서 스타 등록'}
                    index={1}
                />
                <GuideComponent 
                    title={'받은 사연을 확인'}
                    index={2}
                />
                <GuideComponent 
                    title={'영상을 제작&업로드 합니다'}
                    index={3}
                />
                <GuideComponent 
                    title={'등록된 영상의\n링크를 전달합니다'}
                    index={4}
                />
            </div>
        </div>
    )
}