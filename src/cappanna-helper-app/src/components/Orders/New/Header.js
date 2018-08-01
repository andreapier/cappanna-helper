import React from "react";
import IconButton from "components/CustomButtons/IconButton";
import TextField from "@material-ui/core/TextField";
import ContentSend from "@material-ui/icons/Send";
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
            onChange={e => props.setOrderTable(e.target.value)}
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
            value={props.tableCategory}
            onChange={e => props.setOrderTableCategory(e.target.value)}
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
            value={props.seats}
            onChange={e => props.setOrderSeats(e.target.value)}
            InputLabelProps={{
              shrink: true
            }}
          />
        </div>
        <div style={textFieldStyle}>
          Tot: <AmountFormat amount={props.totalPrice} />
        </div>
        <div>
          <IconButton
            type="submit"
            disabled={!props.canConfirm}
            onClick={() => props.goToConfirm(props.id)}
          >
            <ContentSend />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  id: PropTypes.number,
  totalPrice: PropTypes.number.isRequired,
  chTable: PropTypes.number.isRequired,
  tableCategory: PropTypes.string,
  seats: PropTypes.number.isRequired,
  canConfirm: PropTypes.bool.isRequired,
  setOrderTable: PropTypes.func.isRequired,
  setOrderTableCategory: PropTypes.func.isRequired,
  setOrderSeats: PropTypes.func.isRequired,
  goToConfirm: PropTypes.func.isRequired
};

export default Header;
