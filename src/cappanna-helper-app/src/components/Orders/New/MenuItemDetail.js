import React from "react";
import IconButton from "components/CustomButtons/IconButton";
import ContentAdd from "@material-ui/icons/Add";
import ContentRemove from "@material-ui/icons/Remove";
import AmountFormat from "components/AmountFormat";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center"
};

const innerContainerStyle = {
  ...containerStyle,
  justifyContent: "flex-end"
};

const innerItemStyle = {
  minWidth: "50px",
  textAlign: "center"
};

const innerItemStyle20px = {
  ...innerItemStyle,
  minWidth: "20px"
};

const MenuItemDetail = props => {
  return (
    <div style={containerStyle}>
      <div>{props.detail.item.name}</div>
      <div style={innerContainerStyle}>
        <div style={innerItemStyle}>
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
            disabled={props.detail.item.unitsInStock - props.detail.quantity <= 0}
          >
            <ContentAdd />
          </IconButton>
        </div>
        <div style={innerItemStyle20px}>{props.detail.quantity}</div>
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

export default MenuItemDetail;
