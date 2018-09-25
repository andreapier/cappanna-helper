import React, { Component } from "react";
import Body from "components/Orders/Detail/Body";
import { connect } from "react-redux";
import { loadSelectedOrderRequested, loadMenuDetailsRequested, resetOrder } from "actions";
import { withRouter } from "react-router-dom";
import buildFilledOrderDetails from "utils/buildFilledOrderDetails";

class ConnectedBody extends Component {
  componentDidMount() {
    if (this.props.needsMenuDetailsLoading) {
      this.props.loadMenuDetailsRequested();
    }
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
    notes: state.selectedOrder ? state.selectedOrder.notes || "" : "",
    needsMenuDetailsLoading: state.menuDetails.length === 0
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadSelectedOrderRequested: () =>
      dispatch(loadSelectedOrderRequested(ownProps.match.params.id)),
    loadMenuDetailsRequested: () => dispatch(loadMenuDetailsRequested()),
    resetOrder: () => dispatch(resetOrder())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectedBody)
);
