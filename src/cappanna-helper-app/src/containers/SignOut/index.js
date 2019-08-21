import React from "react";
import P from "components/Typography/P";
import { connect } from "react-redux";
import { signoutRequested } from "actions";

class SignOut extends React.Component {
  componentDidMount() {
    this.props.signout();
  }

  render() {
    return <P>Arrivedorci!</P>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signout: () => dispatch(signoutRequested())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(SignOut);
