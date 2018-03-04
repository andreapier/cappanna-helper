import "./OrderDetail.css";
import React, { Component } from "react";
import FloatingActionButton from "material-ui/FloatingActionButton";
import ContentAdd from "material-ui/svg-icons/content/add";
import ContentRemove from "material-ui/svg-icons/content/remove";
import { padLeft } from "./../../utils/string";
import { connect } from "react-redux";
import { incrementOrderDetailQuantity } from "./../../actions";

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const innerContainerStyle = {
  ...containerStyle,
  justifyContent: "flex-end"
};

const innerItemStyle = {
  minWidth: "50px",
  textAlign: "center"
};

const innerItemStyle20px = {
  ...innerItemStyle,
  minWidth: "20px"
};

class OrderDetail extends Component {
  formatPrice(price) {
    return "€ " + padLeft(price.toFixed(2), " ", 5);
  }

  render() {
    return (
      <div style={containerStyle}>
        <div>{this.props.detail.name}</div>
        <div style={innerContainerStyle}>
          <div style={innerItemStyle}>{this.formatPrice(this.props.detail.price)}</div>
          <div>
            <FloatingActionButton mini={true} onClick={() => this.props.incrementOrderDetailQuantity(this.props.detail, 1)}
              disabled={!this.props.detail.isAvailable}>
              <ContentAdd />
            </FloatingActionButton>
          </div>
          <div style={innerItemStyle20px}>{this.props.detail.quantity}</div>
          <div>
            <FloatingActionButton
              mini={true}
              onClick={() => this.props.incrementOrderDetailQuantity(this.props.detail, -1)}
              disabled={this.props.detail.quantity === 0 || !this.props.detail.isAvailable}
            >
              <ContentRemove />
            </FloatingActionButton>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const details = state.newOrder.details.filter(item => item.id === ownProps.detailId);
  const detail = details ? details[0] : null;
  return {
    detail
  };
};

const mapDispatchToProps = dispatch => {
  return {
    incrementOrderDetailQuantity: (item, increment) => dispatch(incrementOrderDetailQuantity(item, increment))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
