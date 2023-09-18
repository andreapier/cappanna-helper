import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { loadSelectedOrderRequested, loadMenuDetailsRequested } from "actions";
import { selectNeedsMenuDetailsLoading } from "selectors";
import buildFilledOrderDetails from "utils/buildFilledOrderDetails";
import Table from "components/Table";
import { formatAmount } from "utils/string";
import { TextField } from "@mui/material";

import { withStyles } from '@mui/styles';

const buildTableRow = (dish) => [dish.item.name, formatAmount(dish.item.price, false), dish.quantity];

const style = {
    notes: {
        marginTop: "20px"
    }
};

const Body = (props) => {
    const needsMenuDetailsLoading = useSelector(selectNeedsMenuDetailsLoading);
    const order = useSelector(state => state.selectedOrder);
    const menuDetails = useSelector(state => state.menuDetails);

    const dishList = order && !needsMenuDetailsLoading ? buildFilledOrderDetails(order.details, menuDetails) : [];
    const notes = order ? order.notes || "" : "";

    const dispatch = useDispatch();
    const match = useMatch("/order/:id");

    useEffect(() => {
        if (needsMenuDetailsLoading) {
            dispatch(loadMenuDetailsRequested());
        }
    }, [dispatch, needsMenuDetailsLoading]);

    useEffect(() => {
        dispatch(loadSelectedOrderRequested(match.params.id));
    }, [dispatch, match]);

    return (
        <div>
            <Table tableHead={["Nome", "Prezzo (€)", "Quantità"]} tableData={dishList.map(buildTableRow)} />
            <TextField
                variant="standard"
                label="Note"
                multiline
                readOnly
                fullWidth
                value={notes}
                className={props.classes.notes} />
        </div>
    );
};

Body.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(style)(Body);
