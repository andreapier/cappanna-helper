import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TextField, withStyles } from "@material-ui/core";
import { calculate } from "actions";
import Button from "components/CustomButtons";
import ItemGrid from "components/Grid/ItemGrid";
import Grid from "components/Grid";
import { formatAmount } from "utils/string";

const style = {
  buttonContainer: {
    paddingTop: "40px",
    paddingBottom: "40px"
  }
};

class Calculator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: props.amount,
      paidAmount: props.paidAmount,
      seats: props.seats
    };

    this.format = this.format.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.setPaidAmount = this.setPaidAmount.bind(this);
    this.setSeats = this.setSeats.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  format(value) {
    return formatAmount(value, false);
  }

  setAmount(event) {
    this.amount = parseFloat(event.target.value);
  }

  setPaidAmount(event) {
    this.paidAmount = parseFloat(event.target.value);
  }

  setSeats(event) {
    this.seats = parseFloat(event.target.value);
  }

  handleSubmit(event) {
    event.stopPropagation();
    event.preventDefault();

    this.props.calculate(this.state);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Grid>
          <ItemGrid xs={12} md={4}>
            <TextField
              name="amount"
              autoFocus
              fullWidth
              label="Da pagare"
              type="number"
              normalize={this.formatAmount}
              onChange={this.setAmount}
              value={this.state.amount}
            />
          </ItemGrid>
          <ItemGrid xs={12} md={4}>
            <TextField
              name="paidAmount"
              fullWidth
              label="Pagato"
              type="number"
              normalize={this.formatAmount}
              onChange={this.setPaidAmount}
              value={this.state.paidAmount}
            />
          </ItemGrid>
          <ItemGrid xs={12} md={4}>
            <TextField
              name="seats"
              fullWidth
              label="Coperti"
              type="number"
              onChange={this.setSeats}
              value={this.state.seats}
            />
          </ItemGrid>
          <ItemGrid xs={12} className={this.props.classes.buttonContainer}>
            <Button type="submit" fullWidth>
              Calcola
            </Button>
          </ItemGrid>
          <ItemGrid xs={12} md={6}>
            <TextField
              name="perPersonAmount"
              fullWidth
              label="Da pagare a persona"
              type="number"
              readOnly
              value={this.props.perPersonAmount}
              normalize={this.formatAmount}
            />
          </ItemGrid>
          <ItemGrid xs={12} md={6}>
            <TextField
              name="chChange"
              fullWidth
              label="Resto"
              type="number"
              readOnly
              value={this.props.chChange}
              normalize={this.formatAmount}
            />
          </ItemGrid>
        </Grid>
      </form>
    );
  }
}

Calculator.propTypes = {
  amount: PropTypes.number.isRequired,
  calculate: PropTypes.func.isRequired,
  chChange: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  paidAmount: PropTypes.number.isRequired,
  perPersonAmount: PropTypes.number.isRequired,
  seats: PropTypes.number.isRequired
};

const mapStateToProps = state => {
  return {
    amount: state.calculator.amount,
    paidAmount: state.calculator.paidAmount,
    seats: state.calculator.seats,
    chChange: state.calculator.change,
    perPersonAmount: state.calculator.perPersonAmount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    calculate: ({ amount, paidAmount, seats }) =>
      dispatch(calculate({ amount, paidAmount, seats }))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(style)(Calculator));
