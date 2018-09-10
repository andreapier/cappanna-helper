import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import withStyles from "@material-ui/core/styles/withStyles";
import sidebarStyle from "variables/styles/sidebarStyle";
import Checkbox from "@material-ui/core/Checkbox";

const Preview = props => {
  const text = `Ordine N° ${props.order.shiftCounter} - ${
    props.order.createdBy.userName
  } (Tav. ${props.order.chTable})`;

  return (
    <ListItem button className={props.classes.itemLink}>
      <Checkbox
        checked={props.order.selected}
        disableRipple
        disableTouchRipple
        onChange={() => toggleOrderSelectionForAggregation(props.order.id)}
      />
      <ListItemText
        primary={text}
        className={props.classes.itemText}
        disableTypography
      />
    </ListItem>
  );
};

Preview.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    shiftCounter: PropTypes.number.required,
    chTable: PropTypes.string.isRequired,
    createdBy: PropTypes.shape({
      userName: PropTypes.string.isRequired
    }).isRequired,
    selected: PropTypes.bool.isRequired
  }).isRequired,
  classes: PropTypes.object.isRequired,
  toggleOrderSelectionForAggregation: PropTypes.func.isRequired
};

export default withStyles(sidebarStyle)(Preview);
