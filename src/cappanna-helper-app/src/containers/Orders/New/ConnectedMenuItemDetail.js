import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import MenuItemDetail from "components/Orders/New/MenuItemDetail";
import { incrementOrderDetailQuantity } from "actions";

class ConnectedMenuItemDetail extends Component {
  render() {
    return (
      <MenuItemDetail
        detail={this.props.detail}
        incrementOrderDetailQuantity={this.props.incrementOrderDetailQuantity}
      />
    );
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.detail.quantity !== nextProps.detail.quantity
      || this.props.detail.item.unitsInStock !== nextProps.detail.item.unitsInStock) {
      return true;
    }

    return false
  }
}

const mapStateToProps = (state, ownProps) => {
  const detail = state.newOrderDetails.find(e => e.itemId === ownProps.itemId);
  const menuDetail = state.menuDetails.find(d => d.id === ownProps.itemId);

  return {
    detail: {
      id: detail.id,
      quantity: detail.quantity,
      initialQuantity: detail.initialQuantity,
      item: menuDetail
    }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    incrementOrderDetailQuantity: (itemId, quantity, price) =>
      dispatch(incrementOrderDetailQuantity(itemId, quantity, price))
  };
};

ConnectedMenuItemDetail.propTypes = {
  itemId: PropTypes.PropTypes.number.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedMenuItemDetail);
