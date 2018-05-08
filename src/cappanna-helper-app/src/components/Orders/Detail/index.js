import React from "react";
import Button from "material-ui/Button";
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

const Detail = props => {
  return (
    <div style={containerStyle}>
      <div>{props.item.name}</div>
      <div style={innerContainerStyle}>
        <div style={innerItemStyle}>
          <AmountFormat amount={props.item.price} />
        </div>
        <div>
          <Button
            variant="fab"
            mini={true}
            onClick={() => props.incrementOrderDetailQuantity(props.item, 1)}
            disabled={!props.item.isAvailable}
          >
            <ContentAdd />
          </Button>
        </div>
        <div style={innerItemStyle20px}>{props.item.quantity}</div>
        <div>
          <Button
            variant="fab"
            mini={true}
            onClick={() => props.incrementOrderDetailQuantity(props.item, -1)}
            disabled={props.item.quantity === 0 || !props.item.isAvailable}
          >
            <ContentRemove />
          </Button>
        </div>
      </div>
    </div>
  );
};

Detail.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    isAvailable: PropTypes.bool.isRequired
  }),
  incrementOrderDetailQuantity: PropTypes.func.isRequired
};

export default Detail;
