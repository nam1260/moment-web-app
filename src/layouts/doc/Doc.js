import MarketingAcceptComponent from "./section/MarketingAccept"
import PersonalDataComponent from "./section/PersonalData"
import TermsAndConditionComponent from "./section/TermsAndCondition"
import './doc.css'
import { ScrollTopHoc } from "../../shared/component/common/ScrollTopHoc"

const DOC_TYPE = {
    MARKETING_ACCEPT: 1,
    PERSONAL_DATA: 2,
    TERMS_AND_CONDITION: 3
}

function DocComponent({ match: { params: { type = 1 } } }) {
    return (
        <section className="doc-wrapper">
            <div className="container">
                {
                    {
                        [DOC_TYPE.MARKETING_ACCEPT]: <MarketingAcceptComponent />,
                        [DOC_TYPE.PERSONAL_DATA]: <PersonalDataComponent />,
                        [DOC_TYPE.TERMS_AND_CONDITION]: <TermsAndConditionComponent />,
                    }[type]
                }
            </div>
        </section>
    )
}

export default ScrollTopHoc(DocComponent)