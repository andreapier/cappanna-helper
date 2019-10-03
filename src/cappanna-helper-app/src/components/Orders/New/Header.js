import React from "react";
import IconButton from "components/CustomButtons/IconButton";
import { MenuItem, Select, TextField } from "@material-ui/core";
import ContentSend from "@material-ui/icons/Send";
import AmountFormat from "components/AmountFormat";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const textFieldStyle = {
  width: "80px"
};

const renderTables = () => {
  const cupra = [...Array(30).keys()]
    .map(e => e + 1)
    .map(e => (
      <MenuItem key={e} value={e + ""}>
        {e}
      </MenuItem>
    ));
  const zena = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "L",
    "M",
    "N",
    "O",
    "P"
  ].map(e => (
    <MenuItem key={e} value={e}>
      {e}
    </MenuItem>
  ));

  return cupra.concat(zena);
};

const Header = props => {
  return (
    <div>
      <div style={containerStyle}>
        <div>
          <Select
            label="Tav."
            style={textFieldStyle}
            value={props.chTable}
            onChange={e => props.setOrderTable(e.target.value)}
          >
            {renderTables()}
          </Select>
        </div>
        <div>
          <TextField
            label="N° pers"
            style={textFieldStyle}
            value={isNaN(props.seats) ? "" : props.seats}
            onChange={e => props.setOrderSeats(parseInt(e.target.value, 10))}
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
  chTable: PropTypes.string.isRequired,
  seats: PropTypes.number.isRequired,
  canConfirm: PropTypes.bool.isRequired,
  setOrderTable: PropTypes.func.isRequired,
  setOrderSeats: PropTypes.func.isRequired,
  goToConfirm: PropTypes.func.isRequired,
  standId: PropTypes.number.isRequired
};

export default Header;
