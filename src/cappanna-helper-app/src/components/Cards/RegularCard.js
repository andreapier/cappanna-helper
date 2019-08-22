import cx from "classnames";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import regularCardStyle from "variables/styles/regularCardStyle";

const RegularCard = props => {
  const {
    classes,
    plainCard,
    cardTitle,
    cardSubtitle,
    children,
    footer
  } = props;
  const plainCardClasses = cx({
    [" " + classes.cardPlain]: plainCard
  });
  const cardPlainHeaderClasses = cx({
    [" " + classes.cardPlainHeader]: plainCard
  });

  return (
    <Card className={classes.card + plainCardClasses}>
      <CardHeader
        classes={{
          root:
            classes.cardHeader +
            " " +
            classes.blueCardHeader +
            cardPlainHeaderClasses,
          title: classes.cardTitle,
          subheader: classes.cardSubtitle
        }}
        title={cardTitle}
        subheader={cardSubtitle}
      />
      <CardContent>{children}</CardContent>
      {footer !== undefined ? (
        <CardActions className={classes.cardActions}>{footer}</CardActions>
      ) : null}
    </Card>
  );
};

RegularCard.defaultProps = {
  headerColor: "blue"
};

RegularCard.propTypes = {
  plainCard: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  cardTitle: PropTypes.node.isRequired,
  cardSubtitle: PropTypes.node,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node
};

export default withStyles(regularCardStyle)(RegularCard);
