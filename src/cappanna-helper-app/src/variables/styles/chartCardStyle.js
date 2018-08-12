import {
  card,
  cardHeader,
  defaultFont,
  blueCardHeader,
  cardActions,
  grayColor,
  primaryColor
} from "variables/styles";

const chartCardStyle = {
  card,
  cardHeader: {
    ...cardHeader,
    padding: "0",
    minHeight: "160px",
    ...defaultFont
  },
  blueCardHeader,
  cardContent: {
    padding: "15px 20px"
  },
  cardTitle: {
    marginTop: "0",
    marginBottom: "5px",
    ...defaultFont,
    fontSize: "1.175em"
  },
  cardCategory: {
    marginBottom: "0",
    color: grayColor,
    ...defaultFont,
    fontSize: "0.9em"
  },
  cardActions: {
    ...cardActions,
    padding: "0!important"
  },
  cardStats: {
    lineHeight: "22px",
    color: grayColor,
    fontSize: "12px",
    display: "inline-block",
    margin: "0!important"
  },
  cardStatsIcon: {
    position: "relative",
    top: "4px",
    width: "16px",
    height: "16px"
  },
  grayCardStatsIcon: {
    color: grayColor
  },
  cardStatsLink: {
    color: primaryColor,
    textDecoration: "none",
    ...defaultFont
  }
};

export default chartCardStyle;
