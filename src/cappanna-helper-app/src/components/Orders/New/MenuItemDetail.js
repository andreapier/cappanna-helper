import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { makeSelectOrderItemsByItemId } from "selectors";
import IconButton from "components/CustomButtons/IconButton";
import ContentAdd from "@material-ui/icons/Add";
import ContentRemove from "@material-ui/icons/Remove";
import AmountFormat from "components/AmountFormat";
import { withStyles } from "@material-ui/core";
import { flex } from "variables/styles";
import { incrementOrderDetailQuantity } from "actions";

const style = {
    root: {
        ...flex.alignCenter,
        margin: "2px 0px",
        fontSize: "0.875em"
    },
    end: {
        ...flex.root,
        ...flex.alignCenter,
        justifyContent: "flex-end"
    },
    item55: {
        ...flex.alignCenter,
        minWidth: "55px",
        textAlign: "center"
    },
    item17: {
        ...flex.alignCenter,
        textAlign: "center",
        minWidth: "17px",
        justifyContent: "center"
    }
};

const MenuItemDetail = (props) => {
    const selectOrderItemsByItemId = makeSelectOrderItemsByItemId();
    const orderDetail = useSelector(state => selectOrderItemsByItemId(state, props.detail.id));
    
    const dispatch = useDispatch();
    const doIncrementOrderDetailQuantity = quantity => dispatch(incrementOrderDetailQuantity(props.detail.id, quantity, props.detail.price));

    return (
        <div className={props.classes.root}>
            <div>{props.detail.name}</div>
            <div className={props.classes.end}>
                <div className={props.classes.item55}>
                    <AmountFormat amount={props.detail.price} />
                </div>
                <div>
                    <IconButton
                        onClick={() => doIncrementOrderDetailQuantity(1)}
                        disabled={props.detail.unitsInStock + orderDetail.initialQuantity - orderDetail.quantity <= 0}
                    >
                        <ContentAdd />
                    </IconButton>
                </div>
                <div className={props.classes.item17}>{orderDetail.quantity}</div>
                <div>
                    <IconButton
                        onClick={() => doIncrementOrderDetailQuantity(-1)}
                        disabled={orderDetail.quantity === 0}
                    >
                        <ContentRemove />
                    </IconButton>
                </div>
            </div>
        </div>
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

export default withStyles(style)(MenuItemDetail);
