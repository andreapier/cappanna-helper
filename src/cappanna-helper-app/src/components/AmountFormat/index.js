import { padLeft } from "utils/string";
import PropTypes from "prop-types";

const AmountFormat = props => {
  return "€ " + padLeft(props.amount.toFixed(2), " ", 5);
};

AmountFormat.propTypes = {
  amount: PropTypes.number.isRequired
};

export default AmountFormat;
