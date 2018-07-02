import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import { NavLink, withRouter } from "react-router-dom";
import sidebarStyle from "variables/styles/sidebarStyle";

const Preview = props => {
  const text = `Ordine N° ${props.order.id} (Tav. ${props.order.chTable})`;

  return (
    <NavLink to={`/order/${props.order.id}`} className={props.classes.item}>
      <ListItem button className={props.classes.itemLink}>
        <ListItemText
          primary={text}
          className={props.classes.itemText}
          disableTypography
        />
      </ListItem>
    </NavLink>
  );
};

Preview.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.required,
    chTable: PropTypes.string.isRequired,
    status: PropTypes.number.required
  }).isRequired,
  classes: PropTypes.object.isRequired
};

export default withRouter(withStyles(sidebarStyle)(Preview));
