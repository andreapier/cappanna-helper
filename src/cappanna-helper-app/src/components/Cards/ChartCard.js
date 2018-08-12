import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

import chartCardStyle from "variables/styles/chartCardStyle";

function ChartCard({ ...props }) {
  const {
    classes,
    chart,
    title,
    text,
    statLink,
    statText
  } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        className={
          classes.cardHeader + " " + classes.blueCardHeader
        }
        subheader={chart}
      />
      <CardContent className={classes.cardContent}>
        <Typography
          variant="title"
          component="h4"
          className={classes.cardTitle}
        >
          {title}
        </Typography>
        <Typography component="p" className={classes.cardCategory}>
          {text}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.cardStats}>
          <props.statIcon
            className={
              classes.cardStatsIcon +
              " " +
              classes.grayCardStatsIcon
            }
          />{" "}
          {statLink !== undefined ? (
            <a href={statLink.href} className={classes.cardStatsLink}>
              {statLink.text}
            </a>
          ) : statText !== undefined ? (
            statText
          ) : null}
        </div>
      </CardActions>
    </Card>
  );
}

ChartCard.propTypes = {
  classes: PropTypes.object.isRequired,
  chart: PropTypes.object.isRequired,
  title: PropTypes.node,
  text: PropTypes.node,
  statIcon: PropTypes.func.isRequired,
  statLink: PropTypes.object,
  statText: PropTypes.node
};

export default withStyles(chartCardStyle)(ChartCard);
