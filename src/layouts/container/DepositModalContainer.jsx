import { connect } from "react-redux";
import DepositWithoutPassbookModal from "shared/component/write/DepositWithoutPassbook";


const mapStateToProps = (state) => ({
    starDetail: state.star.starDetail,
    user: state.user,
    payment: state.payment
})

const mapDispatchToProps = (dispatch) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(DepositWithoutPassbookModal);