import React from "react";
import PropTypes from "prop-types";
import Table from "components/Table";
import { formatAmount } from "utils/string";
import Quantity from "components/Menu/Quantity";

const buildTableRow = (dish, setMenuDetailQuantity) => [
    dish.id,
    dish.group,
    dish.name,
    formatAmount(dish.price, false),
    <Quantity dishId={dish.id} unitsInStock={dish.unitsInStock} setMenuDetailQuantity={setMenuDetailQuantity} />
];

const List = (props) => {
    return (
        <Table
            tableHead={["Id", "Gruppo", "Nome", "Prezzo (€)", "Quantità"]}
            tableData={props.dishList.map((e) => buildTableRow(e, props.setMenuDetailQuantity))}
        />
    );
};

List.propTypes = {
    dishList: PropTypes.array.isRequired,
    setMenuDetailQuantity: PropTypes.func
};

export default List;
