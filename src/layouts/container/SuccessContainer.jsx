import SuccessComponent from "../write/success.component";
import { connect } from "react-redux";
import { getStarDetailAsync } from "redux/star";

const mapStateToProps = (state) => ({
    starDetail: state.star.starDetail,
})

const mapDispatchToProps = (dispatch) => ({
    getStarDetailAsync: (prop) => dispatch(getStarDetailAsync(prop))
})

export default connect(mapStateToProps, mapDispatchToProps)(SuccessComponent);