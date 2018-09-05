import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { TextField } from "redux-form-material-ui";
import { calculate } from "actions";
import Button from "components/CustomButtons";
import ItemGrid from "components/Grid/ItemGrid";
import Grid from "components/Grid";
import TextFieldMui from "@material-ui/core/TextField";
import withStyles from "@material-ui/core/styles/withStyles";
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
    this.format = this.format.bind(this);
  }

  format(value) {
    return formatAmount(value, false);
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.calculate)}>
        <Grid>
          <ItemGrid xs={12} md={4}>
            <Field
              name="amount"
              component={TextField}
              autoFocus
              fullWidth
              label="Da pagare"
              type="number"
              normalize={this.formatAmount}
            />
          </ItemGrid>
          <ItemGrid xs={12} md={4}>
            <Field
              name="paidAmount"
              component={TextField}
              fullWidth
              label="Pagato"
              type="number"
              normalize={this.formatAmount}
            />
          </ItemGrid>
          <ItemGrid xs={12} md={4}>
            <Field
              name="seats"
              component={TextField}
              fullWidth
              label="Coperti"
              type="number"
            />
          </ItemGrid>
          <ItemGrid xs={12} className={this.props.classes.buttonContainer}>
            <Button type="submit" fullWidth>
              Calcola
            </Button>
          </ItemGrid>
          <ItemGrid xs={12} md={6}>
            <TextFieldMui
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
            <TextFieldMui
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
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    initialValues: {
      amount: state.calculator.amount,
      paidAmount: state.calculator.paidAmount,
      seats: state.calculator.seats
    },
    chChange: state.calculator.change,
    perPersonAmount: state.calculator.perPersonAmount
  };
};

const mapDispatchToProps = dispatch => {
  return {
    calculate: ({ amount, paidAmount, seats }) => dispatch(calculate({
      amount: parseFloat(amount),
      paidAmount: parseFloat(paidAmount),
      seats: parseInt(seats, 10)
    }))
  };
};

Calculator = reduxForm({
  form: "calculatorForm"
})(Calculator);

Calculator = connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Calculator))

export default Calculator;
