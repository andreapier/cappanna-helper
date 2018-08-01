import React, { Component } from "react";
import { connect } from "react-redux";
import Main from "components/Orders/New/Confirmation/Main";

class ConnectedMain extends Component {
  render() {
    return <Main {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    details: state.newOrder.details.filter(e => e.quantity > 0).map(e => {
      const menuDetail = state.menuDetails.items.find(d => d.id === e.itemId);

      return {
        id: e.id,
        quantity: e.quantity,
        totalPrice: menuDetail.price * e.quantity,
        item: {
          id: e.itemId,
          name: menuDetail.name,
          price: menuDetail.price,
          group: menuDetail.group
        }
      };
    })
  };
};

export default connect(mapStateToProps)(ConnectedMain);
