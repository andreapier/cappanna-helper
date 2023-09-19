import React, { useEffect } from "react";
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { loadDashboardDataRequested, resetOrder } from "actions";
import Grid from "components/Grid";
import ItemGrid from "components/Grid/ItemGrid";
import OrderStatCard from "components/Dashboard/OrderStatCard";
import OrdersIncomeStartCard from "components/Dashboard/OrdersIncomeStartCard";
import WaitersStatCard from "components/Dashboard/WaitersStatCard";
const PREFIX = 'Dashboard';

const classes = {
    container: `${PREFIX}-container`
};

const StyledGrid = styled(Grid)({
    [`& .${classes.container}`]: {
        padding: "8px"
    }
});

const Dashboard = () => {
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
        <StyledGrid>
            <ItemGrid xs={12} sm={6} lg={4}>
                <div className={classes.container}>
                    <OrderStatCard data={orderStats} />
                </div>
            </ItemGrid>
            <ItemGrid xs={12} sm={6} lg={4}>
                <div className={classes.container}>
                    <WaitersStatCard data={waitersStats} />
                </div>
            </ItemGrid>
            <ItemGrid xs={12} sm={6} lg={4}>
                <div className={classes.container}>
                    <OrdersIncomeStartCard income={income} />
                </div>
            </ItemGrid>
        </StyledGrid>
    );
};

export default Dashboard;
