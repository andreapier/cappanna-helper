import React from "react";
import PropTypes from "prop-types";
import Preview from "components/Orders/List/Preview";
import { List } from "@material-ui/core";

const OrdersList = props => {
  return (
    <List>
      {props.orders.map(o => (
        <Preview order={o} key={o.id} />
      ))}
    </List>
  );
};

OrdersList.propTypes = {
  orders: PropTypes.array.isRequired
};

export default OrdersList;
