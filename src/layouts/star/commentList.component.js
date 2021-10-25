import { useHistory } from "react-router";
import CommentOfFanComponent from "../../shared/component/star/CommentOfFan.component";
import './star.style.css';

export default function StarCommentListComponent() {
    const history = useHistory();

    // TODO : INFINITE LOAD..
    const comments = Array(10).fill('').map((x) => 
        <CommentOfFanComponent 
            score={3.2}
            comment={'화질이 조금 깨졌지만 영상 너무좋았습니다.\n감사합니다!'} 
        />
    )

    return (
        <main className="star-main">
            <section className="app-star-comment">
                <div className="container">
                    <div>팬들이 남겨준 스타의 사연 소감이에요</div>
                    {comments}
                    <button onClick={() => history.goBack()}>이전 화면으로 돌아가기</button>
                </div>
            </section>
        </main>
    )
}