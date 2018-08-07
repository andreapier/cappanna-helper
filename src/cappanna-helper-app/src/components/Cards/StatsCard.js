import React from "react";
import {
  withStyles,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";

import statsCardStyle from "variables/styles/statsCardStyle";

function StatsCard({ ...props }) {
  const {
    classes,
    title,
    description,
    statLink,
    small,
    statText
  } = props;
  return (
    <Card className={classes.card}>
      <CardHeader
        classes={{
          root: classes.cardHeader + " " + classes.blueCardHeader,
          avatar: classes.cardAvatar
        }}
        avatar={<props.icon className={classes.cardIcon} />}
      />
      <CardContent className={classes.cardContent}>
        <Typography component="p" className={classes.cardCategory}>
          {title}
        </Typography>
        <Typography
          variant="headline"
          component="h2"
          className={classes.cardTitle}
        >
          {description}{" "}
          {small !== undefined ? (
            <small className={classes.cardTitleSmall}>{small}</small>
          ) : null}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <div className={classes.cardStats}>
          <props.statIcon
            className={
              classes.cardStatsIcon +
              " " +
              classes.blueCardStatsIcon
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

StatsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.func.isRequired,
  title: PropTypes.node,
  description: PropTypes.node,
  small: PropTypes.node,
  statIcon: PropTypes.func.isRequired,
  statLink: PropTypes.object,
  statText: PropTypes.node
};

export default withStyles(statsCardStyle)(StatsCard);
