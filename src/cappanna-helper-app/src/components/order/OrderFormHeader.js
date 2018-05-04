import React, { Component } from "react";
import { connect } from "react-redux";
import {
  setOrderTable,
  setOrderTableCategory,
  setOrderSeats
} from "./../../actions";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
import ContentSend from "@material-ui/icons/Send";
import { withRouter } from "react-router";

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const textFieldStyle = {
  width: "60px"
};

const buttonStyle = {
  margin: "auto auto auto 5px"
};

class OrderFormHeader extends Component {
  constructor(props) {
    super(props);
    this.setOrderTable = this.setOrderTable.bind(this);
    this.setOrderSeats = this.setOrderSeats.bind(this);
  }

  setOrderTable(e) {
    const value = e.target.value;
    this.props.setOrderTable(value);
  }

  setOrderSeats(e) {
    const value = e.target.value;
    this.props.setOrderSeats(value);
  }

  render() {
    const canConfirmOrder =
      this.props.totalPrice > 0 &&
      this.props.chTable > 0 &&
      this.props.seats > 0 &&
      this.props.tableCategory;

    return (
      <div>
        <div style={containerStyle}>
          <div>
            <TextField
              name="table"
              type="number"
              label="Tav."
              className="CreateOrderForm-TextField"
              style={textFieldStyle}
              value={this.props.chTable}
              onChange={this.setOrderTable}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div>
            <TextField
              name="tableCategory"
              label="Cat."
              className="CreateOrderForm-TextField"
              style={textFieldStyle}
              value={this.props.tableCategory}
              onChange={e => this.props.setOrderTableCategory(e.target.value)}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div>
            <TextField
              name="personNumber"
              type="number"
              label="N° pers"
              className="CreateOrderForm-TextField"
              style={textFieldStyle}
              value={this.props.seats}
              onChange={this.setOrderSeats}
              InputLabelProps={{
                shrink: true
              }}
            />
          </div>
          <div style={textFieldStyle}>
            Tot: € {this.props.totalPrice.toFixed(2)}
          </div>
          <div>
            <Button
              variant="fab"
              mini={true}
              type="submit"
              style={buttonStyle}
              disabled={!canConfirmOrder}
              onClick={() => this.props.history.push("/order/confirm")}
            >
              <ContentSend />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    totalPrice: state.newOrder.header.totalPrice,
    chTable: state.newOrder.header.chTable,
    tableCategory: state.newOrder.header.tableCategory,
    seats: state.newOrder.header.seats
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOrderTable: table => dispatch(setOrderTable(table)),
    setOrderTableCategory: tableCategory =>
      dispatch(setOrderTableCategory(tableCategory)),
    setOrderSeats: seats => dispatch(setOrderSeats(seats))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(OrderFormHeader)
);
