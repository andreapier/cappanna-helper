import React from "react";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";
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

const buttonStyle = {
  margin: "auto auto auto 5px"
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
          <Button
            variant="fab"
            mini={true}
            type="submit"
            style={buttonStyle}
            disabled={!props.canConfirm}
            onClick={props.goToConfirm}
          >
            <ContentSend />
          </Button>
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  setOrderTable: PropTypes.func.isRequired,
  setOrderTableCategory: PropTypes.func.isRequired,
  setOrderSeats: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired,
  canConfirm: PropTypes.bool.isRequired,
  goToConfirm: PropTypes.func.isRequired
};

export default Header;
