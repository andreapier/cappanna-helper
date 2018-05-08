import React from "react";
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from "material-ui/ExpansionPanel";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "material-ui/Typography";
import OrderDetail from "components/Orders/Detail";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

const DishList = props => {
  return (
    <div className={props.classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={props.classes.heading}>
            {props.title}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            {props.dishList.map(i => (
              <OrderDetail
                key={i.id}
                item={i}
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
  dishList: PropTypes.array.isRequired
};

export default withStyles(styles)(DishList);
