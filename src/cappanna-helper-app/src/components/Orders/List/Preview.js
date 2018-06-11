import React from "react";
import PropTypes from "prop-types";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

const Preview = props => {
  return (
    <Card onClick={() => props.loadOrderRequested(props.order.id)}>
      <CardHeader
        title={`Ordine N° ${props.order.id} (Tav. ${props.order.chTable})`}
      >
        <div>Cameriere: {props.order.createdById}</div>
      </CardHeader>
    </Card>
  );
};

Preview.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.required,
    chTable: PropTypes.string.isRequired,
    status: PropTypes.number.required,
    createdById: PropTypes.number.isRequired
  }).isRequired,
  loadOrderRequested: PropTypes.func.isRequired
};

export default Preview;
