import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Table from "components/Table";
import { formatAmount } from "utils/string";

const styles = {
    table: {
        margin: "16px 0px"
    }
};

const Main = (props) => {
    return (
        <div className={props.classes.table}>
            <Table
                tableHead={["Nome", "Prezzo (€)", "Qta", "Tot (€)"]}
                tableData={props.details.map((e) => [e.item.name, formatAmount(e.item.price, false), e.quantity, formatAmount(e.subtotal, false)])}
            />
        </div>
    );
};

Main.propTypes = {
    details: PropTypes.arrayOf(
        PropTypes.shape({
            quantity: PropTypes.number.isRequired,
            subtotal: PropTypes.number.isRequired,
            item: PropTypes.shape({
                name: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired
            }).isRequired
        }).isRequired
    ).isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
