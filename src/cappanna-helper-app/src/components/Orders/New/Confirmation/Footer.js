import React from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { confirmOrder } from "actions";
import { selectCanConfirmOrder } from "selectors";
import Button from "components/CustomButtons";
import ActionDone from "@material-ui/icons/Done";
import Create from "@material-ui/icons/Create";
import Grid from "components/Grid";
import ItemGrid from "components/Grid/ItemGrid";
import { flex } from "variables/styles";

const Footer = (props) => {
    const standId = useSelector(state => state.user.settings.standId);
    const order = {
        ...useSelector(state => state.newOrderHeader),
        standId,
        details: useSelector(state => state.newOrderDetails)
    };
    const canConfirm = useSelector(selectCanConfirmOrder);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const doConfirmOrder = () => dispatch(confirmOrder(order));

    return (
        <Grid className={props.classes.root} justifyContent="space-between">
            <ItemGrid>
                <Button variant="contained" onClick={goBack}>
                    <Create />
                    Modifica
                </Button>
            </ItemGrid>
            <ItemGrid>
                <Button variant="contained" onClick={doConfirmOrder} disabled={!canConfirm}>
                    <ActionDone />
                    Conferma
                </Button>
            </ItemGrid>
        </Grid>
    );
};

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(flex)(Footer);
