import React from "react";
import PropTypes from "prop-types";

const Detail = props => {
  return props.orders.map(o => <Detail order={o} key={o.id} />);
};

Detail.propTypes = {
  order: PropTypes.shape({}).isRequired
};

export default Detail;
