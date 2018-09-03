import React from "react";
import PropTypes from "prop-types";
import Grid from "components/Grid";
import ItemGrid from "components/Grid/ItemGrid";
import OrdersQuantityStatCard from "components/Dashboard/OrdersQuantityStatCard";
import OrdersIncomeStartCard from "components/Dashboard/OrdersIncomeStartCard";
import WaitersStatCard from "components/Dashboard/WaitersStatCard";

const Dashboard = props => {
  return (
    <Grid>
      <ItemGrid xs={12} sm={6}>
        <OrdersQuantityStatCard ordersQuantity={props.ordersQuantity} />
      </ItemGrid>
      <ItemGrid xs={12} sm={6}>
        <OrdersIncomeStartCard income={props.income} />
      </ItemGrid>
      <ItemGrid xs={12}>
        <WaitersStatCard data={props.waitersStats} />
      </ItemGrid>
    </Grid>
  );
};

Dashboard.propTypes = {
  ordersQuantity: PropTypes.number.isRequired,
  income: PropTypes.number.isRequired,
  waitersStats: PropTypes.array.isRequired
};

export default Dashboard;