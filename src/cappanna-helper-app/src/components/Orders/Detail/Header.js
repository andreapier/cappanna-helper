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
import Done from "@material-ui/icons/Done";
import isNotEditable from "utils/isOrderNotEditable";
import withStyles from "@material-ui/core/styles/withStyles";
import { flex } from "variables/styles";

const style = {
  root: {
    ...flex.alignCenter,
    justifyContent: "space-between"
  },
  textField: {
    width: "60px"
  },
  icon: {
    marginRight: "10px"
  }
};

const Header = props => {
  const closable = props.order.status === 3;
  const notEditable = isNotEditable(props.order.status);

  return (
    <div>
      <Toolbar>
        <IconButton
          onClick={() => props.editOrder(props.order)}
          disabled={notEditable}
          customClass={props.classes.icon}
        >
          <Create />
        </IconButton>
        {props.deleteOrder ? (
          <IconButton
            onClick={() => props.deleteOrder(props.order.id)}
            disabled={notEditable}
            customClass={props.classes.icon}
          >
            <Delete />
          </IconButton>
        ) : null}
        <IconButton
          onClick={() => props.goToCalc(props.order)}
          customClass={props.classes.icon}
        >
          <Apps />
        </IconButton>
        {props.printRequested ? (
          <IconButton
            onClick={() => props.printRequested(props.order.id)}
            customClass={props.classes.icon}
          >
            <Print />
          </IconButton>
        ) : null}
        {props.closeOrder ? (
          <IconButton
            onClick={() => props.closeOrder(props.order.id)}
            disabled={!closable}
            customClass={props.classes.icon}
          >
            <Done />
          </IconButton>
        ) : null}
      </Toolbar>
      <div className={props.classes.root}>
        <div>
          <TextField
            name="table"
            type="number"
            label="Tav."
            className={props.classes.textField}
            value={props.order.chTable}
            InputLabelProps={{ shrink: true }}
            readOnly
          />
        </div>
        <div>
          <TextField
            name="tableCategory"
            label="Cliente"
            className={props.classes.textField}
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
            className={props.classes.textField}
            value={props.order.seats}
            InputLabelProps={{ shrink: true }}
            readOnly
          />
        </div>
        <div className={props.classes.textField}>
          Tot: <AmountFormat amount={props.order.totalPrice} />
        </div>
      </div>
    </div>
  );
};

Header.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    chTable: PropTypes.number.isRequired,
    tableCategory: PropTypes.string,
    seats: PropTypes.number.isRequired,
    status: PropTypes.number.isRequired
  }).isRequired,
  printRequested: PropTypes.func,
  editOrder: PropTypes.func.isRequired,
  deleteOrder: PropTypes.func,
  closeOrder: PropTypes.func,
  goToCalc: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Header);
