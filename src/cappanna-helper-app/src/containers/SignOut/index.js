import React from "react";
import { P } from "components";
import { connect } from 'react-redux';
import { signoutRequested } from 'actions';

class SignOut extends React.Component {
    componentWillMount() {
        this.props.signout();
    }

  render() {
    return (
        <P>Arrivedorci!</P>
    );
  }
}

const mapDispatchToProps = dispatch => {
    return {
        signout: () => dispatch(signoutRequested())
    };
};

export default connect(null, mapDispatchToProps)(SignOut);
