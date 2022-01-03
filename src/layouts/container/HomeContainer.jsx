import Home from "../home/Home";
import { connect } from "react-redux";
import { getStarAsync } from "redux/star";


const mapStateToProps = (state) => ({
    starList: state.star.starList
})

const mapDispatchToProps = (dispatch) => ({
    getStarListAsync: (prop) => dispatch(getStarAsync(prop))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home);