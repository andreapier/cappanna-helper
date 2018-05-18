import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import RegularCard from "components/Cards/RegularCard";
import TextField from "@material-ui/core/TextField";
import ActionEuroSymbol from "@material-ui/icons/EuroSymbol";

class Calculator extends Component {
  render() {
    return (
      <RegularCard>
        <div>
          <TextField
            name="amount"
            floatingLabelText="Da pagare"
            fullWidth={true}
            type="number"
          />
        </div>
        <div>
          <TextField
            name="paidAmount"
            floatingLabelText="Pagato"
            fullWidth={true}
            type="number"
          />
        </div>
        <div>
          <TextField
            name="seats"
            floatingLabelText="Coperti"
            fullWidth={true}
            type="number"
          />
        </div>
        <div>
          <TextField
            name="change"
            floatingLabelText="Resto"
            fullWidth={true}
            disabled={true}
          />
        </div>
        <div>
          <TextField
            name="perPersonAmount"
            floatingLabelText="A persona"
            fullWidth={true}
            disabled={true}
          />
        </div>
        <div>
          <Button
            variant="raised"
            label="Calcola"
            fullWidth={true}
            icon={<ActionEuroSymbol />}
          />
        </div>
      </RegularCard>
    );
  }
}

export default Calculator;
