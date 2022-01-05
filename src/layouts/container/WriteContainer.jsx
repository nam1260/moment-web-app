import WriteComponent from "../write/write.component";
import { connect } from "react-redux";
import { getStarDetailAsync } from "redux/star";


const mapStateToProps = (state) => ({
    starDetail: state.star.starDetail,
    isLoading: state.star.isLoading,
    user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
    getStarDetailAsync: (prop) => dispatch(getStarDetailAsync(prop)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WriteComponent);