import React, { Component } from "react";
import { connect } from "react-redux";
import { loadUsersListRequested } from "actions";
import List from "components/Users/List";

class ConnectedUsersList extends Component {
  componentDidMount() {
    this.props.loadUsersListRequested();
  }

  render() {
    return <List users={this.props.users} />;
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadUsersListRequested: () => dispatch(loadUsersListRequested())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedUsersList);
