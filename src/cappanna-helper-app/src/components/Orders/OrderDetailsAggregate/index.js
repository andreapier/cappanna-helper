import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import Header from "components/Orders/OrderDetailsAggregate/Header";
import Preview from "components/Orders/OrderDetailsAggregate/Preview";

const OrderDetailsAggregate = props => {
  return (
    <div>
      <Header
        orderDetailsAggregationRequested={
          props.orderDetailsAggregationRequested
        }
      />
      <List>
        {props.orders.map(o => (
          <Preview order={o} key={o.id} toggleOrderSelectionForAggregation={props.toggleOrderSelectionForAggregation} />
        ))}
      </List>
    </div>
  );
};

OrderDetailsAggregate.propTypes = {
  orderDetailsAggregationRequested: PropTypes.func,
  toggleOrderSelectionForAggregation: PropTyps.func,
  orders: PropTypes.array.isRequired
};

export default OrderDetailsAggregate;
