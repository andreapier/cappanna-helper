import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadNotificationsListRequested,
  resetOrder,
  printRequested
} from "actions";
import NotificationsComp from "components/Notifications";

class Notifications extends Component {
  componentDidMount() {
    this.props.loadNotificationsListRequested();
  }

  render() {
    return (
      <NotificationsComp
        notifications={this.props.notifications}
        printRequested={this.props.printRequested}
      />
    );
  }

  componentWillUnmount() {
    this.props.resetOrder();
  }
}

const mapStateToProps = state => {
  return {
    notifications: state.notifications,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadNotificationsListRequested: () =>
      dispatch(loadNotificationsListRequested()),
    resetOrder: () => dispatch(resetOrder()),
    printRequested: orderId => dispatch(printRequested(orderId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
