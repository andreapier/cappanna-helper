import cx from "classnames";
import { styled } from "@mui/material/styles";
import { Card, CardActions, CardContent, CardHeader } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { blueCardHeader, card, cardHeader, defaultFont } from "variables/styles";

const PREFIX = "RegularCard";

const classes = {
  card: `${PREFIX}-card`,
  cardPlain: `${PREFIX}-cardPlain`,
  cardHeader: `${PREFIX}-cardHeader`,
  cardPlainHeader: `${PREFIX}-cardPlainHeader`,
  blueCardHeader: `${PREFIX}-blueCardHeader`,
  cardTitle: `${PREFIX}-cardTitle`,
  cardSubtitle: `${PREFIX}-cardSubtitle`,
  cardActions: `${PREFIX}-cardActions`
};

const StyledCard = styled(Card)({
  [`& .${classes.card}`]: card,
  [`& .${classes.cardPlain}`]: {
    background: "transparent",
    boxShadow: "none"
  },
  [`& .${classes.cardHeader}`]: {
    ...cardHeader,
    ...defaultFont
  },
  [`& .${classes.cardPlainHeader}`]: {
    marginLeft: 0,
    marginRight: 0
  },
  [`& .${classes.blueCardHeader}`]: blueCardHeader,
  [`& .${classes.cardTitle}`]: {
    color: "#FFFFFF",
    marginTop: "0",
    marginBottom: "5px",
    ...defaultFont,
    fontSize: "1.125em"
  },
  [`& .${classes.cardSubtitle}`]: {
    ...defaultFont,
    marginBottom: "0",
    color: "rgba(255, 255, 255, 0.62)",
    margin: "0 0 10px"
  },
  [`& .${classes.cardActions}`]: {
    padding: "14px",
    display: "block",
    height: "auto"
  }
});

const RegularCard = (props) => {
  const { plainCard, cardTitle, cardSubtitle, children, footer } = props;
  const plainCardClasses = cx({
    [" " + classes.cardPlain]: plainCard
  });
  const cardPlainHeaderClasses = cx({
    [" " + classes.cardPlainHeader]: plainCard
  });

  return (
    <StyledCard className={classes.card + plainCardClasses}>
      <CardHeader
        classes={{
          root: classes.cardHeader + " " + classes.blueCardHeader + cardPlainHeaderClasses,
          title: classes.cardTitle,
          subheader: classes.cardSubtitle
        }}
        title={cardTitle}
        subheader={cardSubtitle}
      />
      <CardContent>{children}</CardContent>
      {footer !== undefined ? <CardActions className={classes.cardActions}>{footer}</CardActions> : null}
    </StyledCard>
  );
};

RegularCard.propTypes = {
  plainCard: PropTypes.bool,
  cardTitle: PropTypes.node.isRequired,
  cardSubtitle: PropTypes.node,
  children: PropTypes.node.isRequired,
  footer: PropTypes.node
};

export default RegularCard;
