import React, { Component } from "react";
import { connect } from "react-redux";
import RequireAuth from "components/RequireAuth";

class ConnectedRequireAuth extends Component {
    render() {
        return <RequireAuth {...this.props} />;
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(ConnectedRequireAuth);
