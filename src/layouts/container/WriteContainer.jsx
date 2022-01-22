import WriteComponent from "../write/write.component";
import { connect } from "react-redux";
import { getStarDetailAsync } from "redux/star";
import { sendMessage } from "redux/payment";


const mapStateToProps = (state) => ({
    starDetail: state.star.starDetail,
    user: state.user,
    isLoading: state.payment.isLoading,
    payNo: state.payment.payNo,
})

const mapDispatchToProps = (dispatch) => ({
    getStarDetailAsync: (prop) => dispatch(getStarDetailAsync(prop)),
    sendMessage: (prop, type, subparam) => dispatch(sendMessage(prop, type, subparam)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WriteComponent);