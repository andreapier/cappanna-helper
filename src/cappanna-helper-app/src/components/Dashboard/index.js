import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { loadDashboardDataRequested, resetOrder } from "actions";
import Grid from "components/Grid";
import ItemGrid from "components/Grid/ItemGrid";
import OrderStatCard from "components/Dashboard/OrderStatCard";
import OrdersIncomeStartCard from "components/Dashboard/OrdersIncomeStartCard";
import WaitersStatCard from "components/Dashboard/WaitersStatCard";
import { withStyles } from '@mui/styles';

const style = {
    container: {
        padding: "8px"
    }
};

const Dashboard = (props) => {
    const orderStats = useSelector(state => state.dashboard.orderStats);
    const income = useSelector(state => state.dashboard.income);
    const waitersStats = useSelector(state => state.dashboard.waitersStats);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadDashboardDataRequested());

        return function cleanup() {
            dispatch(resetOrder());
        };
    }, [dispatch]);

    return (
        <Grid>
            <ItemGrid xs={12} sm={6} lg={4}>
                <div className={props.classes.container}>
                    <OrderStatCard data={orderStats} />
                </div>
            </ItemGrid>
            <ItemGrid xs={12} sm={6} lg={4}>
                <div className={props.classes.container}>
                    <WaitersStatCard data={waitersStats} />
                </div>
            </ItemGrid>
            <ItemGrid xs={12} sm={6} lg={4}>
                <div className={props.classes.container}>
                    <OrdersIncomeStartCard income={income} />
                </div>
            </ItemGrid>
        </Grid>
    );
};

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(style)(Dashboard);
