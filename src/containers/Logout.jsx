import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actions from "../reduxStore/actions/index";

const Logout = props => {
  props.onLogout();
  props.history.push("/");

  return null;
};
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Logout)
);
