import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import ItemGrid from "components/Grid/ItemGrid";
import dailySalesChart from "variables/charts";
import OrdersQuantityStatCard from "components/Dashboard/OrdersQuantityStatCard";
import OrdersIncomeStartCard from "components/Dashboard/OrdersIncomeStartCard";
import OrdersChartCard from "components/Dashboard/OrdersChartCard";
import WaitersStatCard from "components/Dashboard/WaitersStatCard";

const waitersStatData = [{
  waiter: 'marco',
  count: 10,
  amount: 100
}, {
  waiter: 'truku',
  count: 15,
  amount: 150
}];

class Dashboard extends Component {
  render() {
    return (
      <Grid container>
        <ItemGrid xs={12} sm={6}>
          <OrdersQuantityStatCard ordersQuantity={49} />
        </ItemGrid>
        <ItemGrid xs={12} sm={6}>
          <OrdersIncomeStartCard income={5000} />
        </ItemGrid>
        <ItemGrid xs={12} md={6}>
          <OrdersChartCard data={dailySalesChart.data} />
        </ItemGrid>
        <ItemGrid xs={12} md={6}>
          <WaitersStatCard data={waitersStatData} />
        </ItemGrid>
      </Grid>
    );
  }
}

export default Dashboard;
