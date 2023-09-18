import { formatAmount } from "utils/string";
import PropTypes from "prop-types";

const AmountFormat = (props) => {
    return formatAmount(props.amount);
};

AmountFormat.propTypes = {
    amount: PropTypes.number.isRequired
};

export default AmountFormat;
