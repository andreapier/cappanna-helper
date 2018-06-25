import React, { Component } from "react";
import Body from "components/Orders/New/Body";
import { connect } from "react-redux";
import { incrementOrderDetailQuantity } from "actions";

class ConnectedBody extends Component {
  render() {
    return <Body {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    dishList: state.newOrder.details.map(e => {
      const menuDetail = state.menuDetails.items.find(d => d.id === e.id);

      return {
        ...menuDetail,
        quantity: e.quantity
      };
    })
  };
};

const mapDispatchToProps = dispatch => {
  return {
    incrementOrderDetailQuantity: (itemId, quantity, price) =>
      dispatch(incrementOrderDetailQuantity(itemId, quantity, price))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedBody);
