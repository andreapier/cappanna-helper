import React, { Component } from "react";
import Body from "components/Orders/Detail/Body";
import { connect } from "react-redux";
import { loadSelectedOrderRequested, invalidateSelectedOrder } from "actions";
import { withRouter } from "react-router-dom";

class ConnectedBody extends Component {
  componentDidMount() {
    if (this.props.shouldLoad) {
      this.props.loadSelectedOrderRequested();
    }
  }

  render() {
    return <Body dishList={this.props.dishList} notes={this.props.notes} />;
  }

  componentWillUnmount() {
    if (this.props.loaded) {
      this.props.invalidateSelectedOrder();
    }
  }
}

const mapStateToProps = state => {
  return {
    shouldLoad: !state.selectedOrder.loading && !state.selectedOrder.loaded,
    dishList: state.selectedOrder.item
      ? state.selectedOrder.item.details.map(e => {
          const menuDetail = state.menuDetails.items.find(d => d.id === e.itemId);

          return {
            ...menuDetail,
            quantity: e.quantity,
            totalPrice: menuDetail.price * e.quantity
          };
        })
      : [],
    loaded: state.selectedOrder.loaded,
    notes: state.selectedOrder.item ? state.selectedOrder.item.notes || "" : ""
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadSelectedOrderRequested: () =>
      dispatch(loadSelectedOrderRequested(ownProps.match.params.id)),
    invalidateSelectedOrder: () => dispatch(invalidateSelectedOrder())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ConnectedBody)
);
