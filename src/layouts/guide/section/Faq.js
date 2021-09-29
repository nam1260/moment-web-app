import FaqItem from '../../../shared/component/guide/FaqItem';




export default function FaqComponent() {
    return (
        <div className="container">
            <div className="faq-body">
                <FaqItem 
                    title={'모먼트 영상 제작 가격은 어떻게 되나요?'}
                    des={<p>영상 제작 가격은 원하시는 <span>스타의 상세 페이지</span><br />에서 확인 할 수 있어요.</p>}
                />
                <FaqItem 
                    title={'스타를 어디서 찾을 수 있을까요?'}
                    des={<p><span>우측 상단의 검색 창</span>에서 원하는 스타를 쉽게<br />검색 하실 수 있어요.</p>}
                />
                
                <FaqItem 
                    title={'원하는 스타가 없을 땐 어떻게 하죠? '}
                    des={'추가하세요.'}
                />
                <FaqItem 
                    title={'모먼트에 있는 스타들이 진짜인가요?'}
                    des={'진짜입니다.'}
                />
                  <FaqItem 
                    title={'영상 제작 요청 후 얼마 후에 영상을\n받을 수 있을까요? '}
                    des={<p><span>스타의 상세 페이지</span>에서 예상되는 영상 제작<br />기간을 확인할 수 있어요. </p>}
                />
                <FaqItem 
                    title={'완성된 영상은 어떤 형태로 받게 되나요?'}
                    des={<p>스타가 직접 업로드한 영상의 링크를 저희 모먼트팀이 검수 후 전달 드려요. 영상 링크를 통해 영상 시청은 물론 보관이 가능해요! </p>}
                />
            </div>
        </div>
    )
}