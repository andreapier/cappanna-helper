import React from "react";
import PropTypes from "prop-types";
import dailySalesChart from "variables/charts";
import RegularCard from "components/Cards/RegularCard";
import ChartistGraph from "react-chartist";

const OrdersChartCard = props => {
  return (<RegularCard
    cardTitle="Andamento"
    content={
      <ChartistGraph
        className="ct-chart"
        data={props.data}
        type="Line"
        options={dailySalesChart.options}
        listener={dailySalesChart.animation}
      />
    }
  />);
};

OrdersChartCard.propTypes = {
  data: PropTypes.shapeOf({
    labels: PropTypes.arrayOf(PropTypes.string).isRequired,
    series: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired
  }).isRequired
};

export default OrdersChartCard;
