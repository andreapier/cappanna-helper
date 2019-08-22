import React from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  withStyles
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MenuItemDetail from "components/Orders/New/MenuItemDetail";
import PropTypes from "prop-types";

const styles = {
  root: {
    flexGrow: 1
  }
};

const DishList = props => {
  return (
    <div className={props.classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{props.title}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            {props.details.map(i => (
              <MenuItemDetail
                key={i.item.id}
                detail={i}
                incrementOrderDetailQuantity={
                  props.incrementOrderDetailQuantity
                }
              />
            ))}
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};

DishList.propTypes = {
  title: PropTypes.string.isRequired,
  details: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.shape({
        id: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  ).isRequired,
  incrementOrderDetailQuantity: PropTypes.func.isRequired
};

export default withStyles(styles)(DishList);
