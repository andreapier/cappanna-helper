import React from "react";
import PropTypes from "prop-types";
import IconButton from "components/CustomButtons/IconButton";
import ContentAdd from "@material-ui/icons/Add";
import ContentRemove from "@material-ui/icons/Remove";
import AmountFormat from "components/AmountFormat";
import withStyles from "@material-ui/core/styles/withStyles";
import { flex } from "variables/styles";

const flexProp = {
  display: "flex",
  alignItems: "center"
};

const style = {
  root: {
    ...flexProp,
    margin: "2px 0px",
    fontSize: "0.875em"
  },
  end: {
    ...flex.root,
    ...flexProp,
    justifyContent: "flex-end"
  },
  item55: {
    ...flexProp,
    minWidth: "55px",
    textAlign: "center"
  },
  item17: {
    ...flexProp,
    textAlign: "center",
    minWidth: "17px",
    justifyContent: "center"
  }
};

const MenuItemDetail = props => {
  return (
    <div className={props.classes.root}>
      <div>{props.detail.item.name}</div>
      <div className={props.classes.end}>
        <div className={props.classes.item55}>
          <AmountFormat amount={props.detail.item.price} />
        </div>
        <div>
          <IconButton
            onClick={() =>
              props.incrementOrderDetailQuantity(
                props.detail.item.id,
                1,
                props.detail.item.price
              )
            }
            disabled={
              props.detail.item.unitsInStock - props.detail.quantity <= 0
            }
          >
            <ContentAdd />
          </IconButton>
        </div>
        <div className={props.classes.item17}>{props.detail.quantity}</div>
        <div>
          <IconButton
            onClick={() =>
              props.incrementOrderDetailQuantity(
                props.detail.item.id,
                -1,
                props.detail.item.price
              )
            }
            disabled={props.detail.quantity === 0}
          >
            <ContentRemove />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

MenuItemDetail.propTypes = {
  detail: PropTypes.shape({
    id: PropTypes.number,
    quantity: PropTypes.number.isRequired,
    item: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      unitsInStock: PropTypes.number.isRequired
    }).isRequired
  }).isRequired,
  incrementOrderDetailQuantity: PropTypes.func.isRequired
};

export default withStyles(style)(MenuItemDetail);
