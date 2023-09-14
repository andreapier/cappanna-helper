import React, { Component } from "react";
import { connect } from "react-redux";
import { loadUsersListRequested } from "actions";
import Header from "components/Users/List/Header";
import { withRouter } from "react-router-dom";

class ConnectedHeader extends Component {
    render() {
        return <Header {...this.props} />;
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadUsersListRequested: () => dispatch(loadUsersListRequested()),
        goToNewUser: () => {
            ownProps.history.push("/user/new");
        }
    };
};

export default withRouter(connect(null, mapDispatchToProps)(ConnectedHeader));
