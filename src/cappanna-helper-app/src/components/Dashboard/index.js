import React from "react";
import PropTypes from "prop-types";
import Grid from "components/Grid";
import ItemGrid from "components/Grid/ItemGrid";
import OrdersQuantityStatCard from "components/Dashboard/OrdersQuantityStatCard";
import OrdersIncomeStartCard from "components/Dashboard/OrdersIncomeStartCard";
import WaitersStatCard from "components/Dashboard/WaitersStatCard";
import { withStyles } from "@material-ui/core";

const style = {
  container: {
    padding: "8px"
  }
};

const Dashboard = props => {
  return (
    <Grid>
      <ItemGrid xs={12} sm={6}>
        <div className={props.classes.container}>
          <OrdersQuantityStatCard ordersQuantity={props.ordersQuantity} />
        </div>
      </ItemGrid>
      <ItemGrid xs={12} sm={6}>
        <div className={props.classes.container}>
          <OrdersIncomeStartCard income={props.income} />
        </div>
      </ItemGrid>
      <ItemGrid xs={12}>
        <div className={props.classes.container}>
          <WaitersStatCard data={props.waitersStats} />
        </div>
      </ItemGrid>
    </Grid>
  );
};

Dashboard.propTypes = {
  ordersQuantity: PropTypes.number.isRequired,
  income: PropTypes.number.isRequired,
  waitersStats: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired
};

export default withStyles(style)(Dashboard);
