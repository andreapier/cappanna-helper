import React from "react";
import PropTypes from "prop-types";
import Preview from "components/Orders/List/Preview";

const OrdersList = props => {
  return props.orders.map(o => <Preview order={o} key={o.id} />);
};

OrdersList.propTypes = {
  orders: PropTypes.array.isRequired
};

export default OrdersList;
