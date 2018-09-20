import React, { Component } from "react";
import Body from "components/Orders/Detail/Body";
import { connect } from "react-redux";
import { loadSelectedOrderRequested, resetOrder } from "actions";
import { withRouter } from "react-router-dom";
import buildFilledOrderDetails from "utils/buildFilledOrderDetails";

class ConnectedBody extends Component {
  componentDidMount() {
    this.props.loadSelectedOrderRequested();
  }

  render() {
    return <Body dishList={this.props.dishList} notes={this.props.notes} />;
  }

  componentWillUnmount() {
    this.props.resetOrder();
  }
}

const mapStateToProps = state => {
  return {
    dishList: state.selectedOrder
      ? buildFilledOrderDetails(state.selectedOrder.details, state.menuDetails)
      : [],
    notes: state.selectedOrder ? state.selectedOrder.notes || "" : ""
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadSelectedOrderRequested: () =>
      dispatch(loadSelectedOrderRequested(ownProps.match.params.id)),
    resetOrder: () => dispatch(resetOrder())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectedBody)
);
