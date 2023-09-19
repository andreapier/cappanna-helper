import React from "react";
import { styled } from '@mui/material/styles';
import { useSelector } from "react-redux";
import Table from "components/Table";
import { formatAmount } from "utils/string";
import buildFilledOrderDetails from "utils/buildFilledOrderDetails";

const PREFIX = 'Main';

const classes = {
    table: `${PREFIX}-table`
};

const Root = styled('div')({
    [`&.${classes.table}`]: {
        margin: "16px 0px"
    }
});

const Main = () => {
    const newOrderDetails = useSelector(state => state.newOrderDetails);
    const menuDetails = useSelector(state => state.menuDetails);

    const details = buildFilledOrderDetails(
        newOrderDetails.filter(e => e.quantity > 0),
        menuDetails
    );

    return (
        <Root className={classes.table}>
            <Table
                tableHead={["Nome", "Prezzo (€)", "Qta", "Tot (€)"]}
                tableData={details.map((e) => [e.item.name, formatAmount(e.item.price, false), e.quantity, formatAmount(e.subtotal, false)])}
            />
        </Root>
    );
};

export default Main;
