import React from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import { Toolbar } from "@mui/material";
import Assignment from "@mui/icons-material/Assignment";
import IconButton from "components/CustomButtons/IconButton";

const PREFIX = 'Header';

const classes = {
    icon: `${PREFIX}-icon`
};

const StyledToolbar = styled(Toolbar)({
    [`& .${classes.icon}`]: {
        marginRight: "20px"
    }
});

const Header = props => {
    return (
        <StyledToolbar>
            <IconButton
                onClick={() => props.orderDetailsAggregationRequested(props.ordersId)}
                customClass={classes.icon}
                disabled={props.ordersId.length === 0}
                size="large">
                <Assignment />
            </IconButton>
        </StyledToolbar>
    );
};

Header.propTypes = {
    ordersId: PropTypes.arrayOf(PropTypes.number).isRequired,
    orderDetailsAggregationRequested: PropTypes.func.isRequired,
};

export default Header;
