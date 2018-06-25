import React, { Component } from "react";
import Body from "components/Orders/Detail/Body";
import { connect } from "react-redux";

class ConnectedBody extends Component {
  render() {
    return <Body {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    dishList: state.selectedOrder.details.map(e => {
      const menuDetail = state.menuDetails.items.find(d => d.id === e.itemId);

      return {
        ...menuDetail,
        quantity: e.quantity,
        totalPrice: menuDetail.price * e.quantity
      };
    })
  };
};

export default connect(mapStateToProps)(ConnectedBody);
