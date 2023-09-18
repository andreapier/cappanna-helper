import React from "react";
import PropTypes from "prop-types";
import EuroSymbol from "@mui/icons-material/EuroSymbol";
import StatsCard from "components/Cards/StatsCard";
import { formatAmount } from "utils/string";

const OrdersIncomeStartCard = (props) => {
    return <StatsCard icon={EuroSymbol} title="Incasso" description={formatAmount(props.income, true)} />;
};

OrdersIncomeStartCard.propTypes = {
    income: PropTypes.number.isRequired
};

export default OrdersIncomeStartCard;
