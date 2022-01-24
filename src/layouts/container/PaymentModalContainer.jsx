import PaymentModalComponent from "shared/component/write/PaymentModal.componet";
import { connect } from "react-redux";
import { openTossBankRequirement } from "redux/payment";


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    openTossBankRequirement: (...props) => {
        dispatch(openTossBankRequirement(...props))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModalComponent);