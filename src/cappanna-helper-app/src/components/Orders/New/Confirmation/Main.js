import React from "react";
import { useSelector } from "react-redux";
import { withStyles } from '@mui/styles';
import Table from "components/Table";
import { formatAmount } from "utils/string";
import buildFilledOrderDetails from "utils/buildFilledOrderDetails";

const styles = {
    table: {
        margin: "16px 0px"
    }
};

const Main = (props) => {
    const newOrderDetails = useSelector(state => state.newOrderDetails);
    const menuDetails = useSelector(state => state.menuDetails);

    const details = buildFilledOrderDetails(
        newOrderDetails.filter((e) => e.quantity > 0),
        menuDetails
    );

    return (
        <div className={props.classes.table}>
            <Table
                tableHead={["Nome", "Prezzo (€)", "Qta", "Tot (€)"]}
                tableData={details.map((e) => [e.item.name, formatAmount(e.item.price, false), e.quantity, formatAmount(e.subtotal, false)])}
            />
        </div>
    );
};

export default withStyles(styles)(Main);
