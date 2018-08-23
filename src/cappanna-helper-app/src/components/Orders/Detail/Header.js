import React from "react";
import TextField from "@material-ui/core/TextField";
import AmountFormat from "components/AmountFormat";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Print from "@material-ui/icons/Print";
import IconButton from "components/CustomButtons/IconButton";
import Create from "@material-ui/icons/Create";
import Apps from "@material-ui/icons/Apps";
import Delete from "@material-ui/icons/Delete";

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
        <IconButton
          onClick={() => props.editOrder(props.order)}
          disabled={props.order.status === 3}
          style={{ marginRight: "10px" }}
        >
          <Create />
        </IconButton>
        <IconButton
          onClick={() => props.deleteOrder(props.order.id)}
          disabled={props.order.status === 3}
          style={{ marginRight: "10px" }}
        >
          <Delete />
        </IconButton>
        <IconButton
          onClick={() => props.printRequested(props.order.id)}
          style={{ marginRight: "10px" }}
        >
          <Print />
        </IconButton>
        <IconButton onClick={() => props.goToCalc(props.order)}>
          <Apps />
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
  }).isRequired,
  printRequested: PropTypes.func.isRequired,
  editOrder: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func.isRequired,
  goToCalc: PropTypes.func.isRequired
};

export default Header;
