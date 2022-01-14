import { connect } from "react-redux";
import { submitDepositData } from "redux/payment";
import DepositWithoutPassbookModal from "shared/component/write/DepositWithoutPassbook";


const mapStateToProps = (state) => ({
    starDetail: state.star.starDetail,
    user: state.user,
    paymentNo: state.payment.paymentNo
})

const mapDispatchToProps = (dispatch) => ({
    submitDepositData: (prop) => dispatch(submitDepositData(prop))
})

export default connect(mapStateToProps, mapDispatchToProps)(DepositWithoutPassbookModal);