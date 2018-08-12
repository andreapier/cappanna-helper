import React from "react";
import PropTypes from "prop-types";
import ChartistGraph from "react-chartist";
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import StatsCard from "components/Cards/StatsCard";
import ChartCard from "components/Cards/ChartCard";
import RegularCard from "components/Cards/RegularCard";
import Table from "components/Table";
import ItemGrid from "components/Grid/ItemGrid";
import {
  dailySalesChart
} from "variables/charts";
import dashboardStyle from "variables/styles/dashboardStyle";

class Dashboard extends React.Component {
  render() {
    return [
      <Grid container key={1}>
        <ItemGrid xs={12} sm={6} md={3}>
          <StatsCard
            icon={Store}
            title="Used Space"
            description="49/50"
            small="GB"
            statIcon={Warning}
            statLink={{ text: "Get More Space...", href: "#pablo" }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={6} md={3}>
          <StatsCard
            icon={Store}
            title="Revenue"
            description="$34,245"
            statIcon={DateRange}
            statText="Last 24 Hours"
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={6} md={3}>
          <StatsCard
            icon={Store}
            title="Fixed Issues"
            description="75"
            statIcon={LocalOffer}
            statText="Tracked from Github"
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={6} md={3}>
          <StatsCard
            icon={Accessibility}
            title="Followers"
            description="+245"
            statIcon={Update}
            statText="Just Updated"
          />
        </ItemGrid>
      </Grid>,
      <Grid container key={2}>
        <ItemGrid xs={12} sm={12} md={4}>
          <ChartCard
            chart={
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            }
            title="Daily Sales"
            text={
              <span>
                <span className={this.props.classes.successText}>
                  <ArrowUpward
                    className={this.props.classes.upArrowCardCategory}
                  />{" "}
                  55%
                </span>{" "}
                increase in today sales.
              </span>
            }
            statIcon={AccessTime}
            statText="updated 4 minutes ago"
          />
        </ItemGrid>
      </Grid>,
      <Grid container key={3}>
        <ItemGrid xs={12} sm={12} md={6}>
          <RegularCard
            cardTitle="Employees Stats"
            cardSubtitle="New employees on 15th September, 2016"
            content={
              <Table
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            }
          />
        </ItemGrid>
      </Grid>
    ];
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
