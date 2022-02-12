import PaymentModalComponent from "shared/component/write/PaymentModal.componet";
import { connect } from "react-redux";
import { openTossBankRequirement, openKaKaoRequirement } from "redux/payment";


const mapStateToProps = (state) => ({})

const mapDispatchToProps = (dispatch) => ({
    openTossBankRequirement: (...props) => {
        dispatch(openTossBankRequirement(...props))
    },
    openKaKaoRequirement: (...props) => {
        dispatch(openKaKaoRequirement(...props));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(PaymentModalComponent);