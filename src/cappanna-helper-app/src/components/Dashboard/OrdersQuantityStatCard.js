import React from "react";
import PropTypes from "prop-types";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import StatsCard from "components/Cards/StatsCard";

const OrdersQuantityStatCard = props => {
  return (<StatsCard
    icon={LibraryBooks}
    title="N° Ordini"
    description={props.ordersQuantity}
  />);
};

OrdersQuantityStatCard.propTypes = {
  ordersQuantity: PropTypes.number.isRequired
};

export default OrdersQuantityStatCard;
