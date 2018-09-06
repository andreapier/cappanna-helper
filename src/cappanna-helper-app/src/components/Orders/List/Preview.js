import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import withStyles from "@material-ui/core/styles/withStyles";
import { NavLink, withRouter } from "react-router-dom";
import sidebarStyle from "variables/styles/sidebarStyle";
import Print from "@material-ui/icons/Print";
import Done from "@material-ui/icons/Done";
import PrintDisabled from "@material-ui/icons/PrintDisabled";

const Preview = props => {
  const text = `Ordine N° ${props.order.shiftCounter} - ${
    props.order.createdBy.userName
  } (Tav. ${props.order.chTable})`;
  const printed = props.order.status === 3;
  const closed = props.order.status === 4;

  return (
    <NavLink to={`/order/${props.order.id}`} className={props.classes.item}>
      <ListItem button className={props.classes.itemLink}>
        <ListItemText
          primary={text}
          className={props.classes.itemText}
          disableTypography
        />
        <ListItemIcon>
          {closed ? <Done /> : printed ? <Print /> : <PrintDisabled />}
        </ListItemIcon>
      </ListItem>
    </NavLink>
  );
};

Preview.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.required,
    shiftCounter: PropTypes.number.required,
    chTable: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    createdBy: PropTypes.shape({
      userName: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(sidebarStyle)(Preview));
