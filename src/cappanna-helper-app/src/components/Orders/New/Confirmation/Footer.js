import React from "react";
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { confirmOrder } from "actions";
import { selectCanConfirmOrder } from "selectors";
import Button from "components/CustomButtons";
import ActionDone from "@mui/icons-material/Done";
import Create from "@mui/icons-material/Create";
import Grid from "components/Grid";
import ItemGrid from "components/Grid/ItemGrid";
import { flex } from "variables/styles";

const PREFIX = 'Footer';

const classes = {
    flex: `${PREFIX}-flex`
};

const StyledGrid = styled(Grid)({ [`& .${classes.flex}`]: flex });

const Footer = () => {
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
        <StyledGrid className={classes.root} justifyContent="space-between">
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
        </StyledGrid>
    );
};

export default Footer;
