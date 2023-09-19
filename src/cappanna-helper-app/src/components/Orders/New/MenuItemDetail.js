import React from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectOrderItemsByItemId } from "selectors";
import IconButton from "components/CustomButtons/IconButton";
import ContentAdd from "@mui/icons-material/Add";
import ContentRemove from "@mui/icons-material/Remove";
import AmountFormat from "components/AmountFormat";
import { flex } from "variables/styles";
import { incrementOrderDetailQuantity } from "actions";

const PREFIX = 'MenuItemDetail';

const classes = {
    root: `${PREFIX}-root`,
    end: `${PREFIX}-end`,
    item55: `${PREFIX}-item55`,
    item17: `${PREFIX}-item17`
};

const Root = styled('div')({
    [`&.${classes.root}`]: {
        ...flex.alignCenter,
        margin: "2px 0px",
        fontSize: "0.875em"
    },
    [`& .${classes.end}`]: {
        ...flex.root,
        ...flex.alignCenter,
        justifyContent: "flex-end"
    },
    [`& .${classes.item55}`]: {
        ...flex.alignCenter,
        minWidth: "55px",
        textAlign: "center"
    },
    [`& .${classes.item17}`]: {
        ...flex.alignCenter,
        textAlign: "center",
        minWidth: "17px",
        justifyContent: "center"
    }
});

const MenuItemDetail = props => {
    const selectOrderItemsByItemId = makeSelectOrderItemsByItemId();
    const orderDetail = useSelector(state => selectOrderItemsByItemId(state, props.detail.id));
    
    const dispatch = useDispatch();
    const doIncrementOrderDetailQuantity = quantity => dispatch(incrementOrderDetailQuantity(props.detail.id, quantity, props.detail.price));

    return (
        <Root className={classes.root}>
            <div>{props.detail.name}</div>
            <div className={classes.end}>
                <div className={classes.item55}>
                    <AmountFormat amount={props.detail.price} />
                </div>
                <div>
                    <IconButton
                        onClick={() => doIncrementOrderDetailQuantity(1)}
                        disabled={props.detail.unitsInStock + orderDetail.initialQuantity - orderDetail.quantity <= 0}
                        size="large">
                        <ContentAdd />
                    </IconButton>
                </div>
                <div className={classes.item17}>{orderDetail.quantity}</div>
                <div>
                    <IconButton
                        onClick={() => doIncrementOrderDetailQuantity(-1)}
                        disabled={orderDetail.quantity === 0}
                        size="large">
                        <ContentRemove />
                    </IconButton>
                </div>
            </div>
        </Root>
    );
};

MenuItemDetail.propTypes = {
    detail: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        unitsInStock: PropTypes.number.isRequired
    }).isRequired,
};

export default MenuItemDetail;
