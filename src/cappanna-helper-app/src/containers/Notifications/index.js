import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadNotificationsListRequested,
  invalidateNotificationsList,
  printRequested
} from "actions";
import NotificationsComp from "components/Notifications";

class Notifications extends Component {
  componentDidMount() {
    if (this.props.shouldLoad) {
      this.props.loadNotificationsListRequested();
    }
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
    if (this.props.loaded) {
      this.props.invalidateNotificationsList();
    }
  }
}

const mapStateToProps = state => {
  return {
    shouldLoad: !state.notifications.loading && !state.notifications.loaded,
    notifications: state.notifications.items,
    loaded: state.notifications.loaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadNotificationsListRequested: () =>
      dispatch(loadNotificationsListRequested()),
    invalidateNotificationsList: () => dispatch(invalidateNotificationsList()),
    printRequested: orderId => dispatch(printRequested(orderId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notifications);
