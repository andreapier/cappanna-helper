import React, { Component } from "react";
import { connect } from "react-redux";
import { loadDashboardDataRequested, resetOrder } from "actions";
import Dashboard from "components/Dashboard";

class ConnectedDashboard extends Component {
  componentDidMount() {
    this.props.loadDashboardDataRequested();
  }

  render() {
    return (
      <Dashboard
        orderStats={this.props.orderStats}
        income={this.props.income}
        dailySales={this.props.dailySales}
        waitersStats={this.props.waitersStats}
      />
    );
  }

  componentWillUnmount() {
    this.props.resetOrder();
  }
}

const mapStateToProps = state => {
  return {
    orderStats: state.dashboard.orderStats,
    income: state.dashboard.income,
    waitersStats: state.dashboard.waitersStats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadDashboardDataRequested: () => dispatch(loadDashboardDataRequested()),
    resetOrder: () => dispatch(resetOrder())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedDashboard);
