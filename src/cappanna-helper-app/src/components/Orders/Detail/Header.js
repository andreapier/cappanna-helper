import React from "react";
import TextField from "@material-ui/core/TextField";
import AmountFormat from "components/AmountFormat";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const textFieldStyle = {
  width: "60px"
};

const Header = props => {
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
            value={props.chTable}
            InputLabelProps={{
              shrink: true
            }}
            readOnly
          />
        </div>
        <div>
          <TextField
            name="tableCategory"
            label="Cat."
            className="CreateOrderForm-TextField"
            style={textFieldStyle}
            value={props.tableCategory}
            InputLabelProps={{
              shrink: true
            }}
            readOnly
          />
        </div>
        <div>
          <TextField
            name="personNumber"
            type="number"
            label="N° pers"
            className="CreateOrderForm-TextField"
            style={textFieldStyle}
            value={props.seats}
            InputLabelProps={{
              shrink: true
            }}
            readOnly
          />
        </div>
        <div style={textFieldStyle}>
          Tot: <AmountFormat amount={props.totalPrice} />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  totalPrice: PropTypes.number.isRequired
};

export default Header;
