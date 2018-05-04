import React, { Component } from "react";
import OrderFormHeader from "./OrderFormHeader";
import OrderFormBody from "./OrderFormBody";

class NewOrderForm extends Component {
  render() {
    return (
      <div>
        <OrderFormHeader />
        <OrderFormBody />
      </div>
    );
  }
}

export default NewOrderForm;
