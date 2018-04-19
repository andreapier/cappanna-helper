import React, { Component } from "react";
import Button from "material-ui/Button";
import { Card } from "material-ui/Card";
import TextField from "material-ui/TextField";
import ActionEuroSymbol from "@material-ui/icons/EuroSymbol";

class Calculator extends Component {
  render() {
    return (
      <Card>
        <div>
          <TextField name="amount" floatingLabelText="Da pagare" fullWidth={true} type="number" />
        </div>
        <div>
          <TextField name="paidAmount" floatingLabelText="Pagato" fullWidth={true} type="number" />
        </div>
        <div>
          <TextField name="seats" floatingLabelText="Coperti" fullWidth={true} type="number" />
        </div>
        <div>
          <TextField name="change" floatingLabelText="Resto" fullWidth={true} disabled={true} />
        </div>
        <div>
          <TextField name="perPersonAmount" floatingLabelText="A persona" fullWidth={true} disabled={true} />
        </div>
        <div>
          <Button variant="raised" label="Calcola" fullWidth={true} icon={<ActionEuroSymbol />} />
        </div>
      </Card>
    );
  }
}

export default Calculator;
