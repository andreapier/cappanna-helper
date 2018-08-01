import React from "react";
import TextField from "@material-ui/core/TextField";
import AmountFormat from "components/AmountFormat";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Print from "@material-ui/icons/Print";
import IconButton from "components/CustomButtons/IconButton";
import Create from "@material-ui/icons/Create";

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
      <Toolbar>
        {props.orde}
        <IconButton
          onClick={() => props.editOrder(props.order)}
          disabled={props.order.status === 3}
          style={{ marginRight: "10px" }}
        >
          <Create />
        </IconButton>
        <IconButton onClick={() => props.printRequested(props.order.id)}>
          <Print />
        </IconButton>
      </Toolbar>
      <div style={containerStyle}>
        <div>
          <TextField
            name="table"
            type="number"
            label="Tav."
            className="CreateOrderForm-TextField"
            style={textFieldStyle}
            value={props.order.chTable}
            InputLabelProps={{ shrink: true }}
            readOnly
          />
        </div>
        <div>
          <TextField
            name="tableCategory"
            label="Cat."
            className="CreateOrderForm-TextField"
            style={textFieldStyle}
            value={props.order.tableCategory}
            InputLabelProps={{ shrink: true }}
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
            value={props.order.seats}
            InputLabelProps={{ shrink: true }}
            readOnly
          />
        </div>
        <div style={textFieldStyle}>
          Tot: <AmountFormat amount={props.order.totalPrice} />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.required,
    totalPrice: PropTypes.number.isRequired,
    chTable: PropTypes.number.isRequired,
    tableCategory: PropTypes.string,
    seats: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired,
    notes: PropTypes.string,
    details: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.required,
        price: PropTypes.number.required,
        group: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        quantity: PropTypes.number.required
      })
    ).isRequired
  }).isRequired,
  printRequested: PropTypes.func.isRequired,
  editOrder: PropTypes.func.isRequired
};

export default Header;
