import React from "react";
import PropTypes from "prop-types";
import { Toolbar } from "@mui/material";
import { makeStyles } from '@mui/styles';
import Assignment from "@mui/icons-material/Assignment";
import IconButton from "components/CustomButtons/IconButton";

const useStyles = makeStyles({
    icon: {
        marginRight: "20px"
    }
});

const Header = (props) => {
    const classes = useStyles();

    return (
        <Toolbar>
            <IconButton
                onClick={() => props.orderDetailsAggregationRequested(props.ordersId)}
                customClass={classes.icon}
                disabled={props.ordersId.length === 0}
                size="large">
                <Assignment />
            </IconButton>
        </Toolbar>
    );
};

Header.propTypes = {
    ordersId: PropTypes.arrayOf(PropTypes.number).isRequired,
    orderDetailsAggregationRequested: PropTypes.func.isRequired,
};

export default Header;
