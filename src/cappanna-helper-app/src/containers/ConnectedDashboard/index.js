import React, { Component } from "react";
import { connect } from "react-redux";
import { loadDashboardDataRequested, invalidateDashboardData } from "actions";
import Dashboard from "components/Dashboard";

class ConnectedDashboard extends Component {
  componentDidMount() {
    if (this.props.shouldLoad) {
      this.props.loadDashboardDataRequested();
    }
  }

  render() {
    return (
      <Dashboard
        ordersQuantity={this.props.ordersQuantity}
        income={this.props.income}
        dailySales={this.props.dailySales}
        waitersStats={this.props.waitersStats}
      />);
  }

  componentWillUnmount() {
    if (this.props.loaded) {
      this.props.invalidateDashboardData();
    }
  }
}

const mapStateToProps = state => {
  return {
    shouldLoad: !state.dashboard.loading && !state.orders.loaded,
    loaded: state.dashboard.loaded,
    ordersQuantity: state.dashboard.data.ordersQuantity,
    income: state.dashboard.data.income,
    dailySales: state.dashboard.data.dailySales,
    waitersStats: state.dashboard.data.waitersStats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDashboardDataRequested: () => dispatch(loadDashboardDataRequested()),
    invalidateDashboardData: () => dispatch(invalidateDashboardData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedDashboard);
