import { connect } from "react-redux";
import { submitDepositData, setPaymentReset } from "redux/payment";
import DepositWithoutPassbookModal from "shared/component/write/DepositWithoutPassbook";


const mapStateToProps = (state) => ({
    starDetail: state.star.starDetail,
    user: state.user,
    payment: state.payment
})

const mapDispatchToProps = (dispatch) => ({
    register: (prop) => dispatch(submitDepositData(prop)),
    reset: () => dispatch(setPaymentReset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositWithoutPassbookModal);