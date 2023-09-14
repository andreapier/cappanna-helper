import React from "react";
import PropTypes from "prop-types";
import Grid from "components/Grid";
import ItemGrid from "components/Grid/ItemGrid";
import OrderStatCard from "components/Dashboard/OrderStatCard";
import OrdersIncomeStartCard from "components/Dashboard/OrdersIncomeStartCard";
import WaitersStatCard from "components/Dashboard/WaitersStatCard";
import { withStyles } from "@material-ui/core";

const style = {
    container: {
        padding: "8px"
    }
};

const Dashboard = (props) => {
    return (
        <Grid>
            <ItemGrid xs={12} sm={6} lg={4}>
                <div className={props.classes.container}>
                    <OrderStatCard data={props.orderStats} />
                </div>
            </ItemGrid>
            <ItemGrid xs={12} sm={6} lg={4}>
                <div className={props.classes.container}>
                    <WaitersStatCard data={props.waitersStats} />
                </div>
            </ItemGrid>
            <ItemGrid xs={12} sm={6} lg={4}>
                <div className={props.classes.container}>
                    <OrdersIncomeStartCard income={props.income} />
                </div>
            </ItemGrid>
        </Grid>
    );
};

Dashboard.propTypes = {
    orderStats: PropTypes.array.isRequired,
    income: PropTypes.number.isRequired,
    waitersStats: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(style)(Dashboard);
