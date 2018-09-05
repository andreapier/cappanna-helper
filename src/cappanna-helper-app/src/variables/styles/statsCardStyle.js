import {
  card,
  cardHeader,
  defaultFont,
  blueCardHeader,
  grayColor
} from "variables/styles";

const statsCardStyle = {
  card,
  cardHeader: {
    ...cardHeader,
    float: "left",
    textAlign: "center"
  },
  blueCardHeader,
  cardContent: {
    textAlign: "right",
    paddingTop: "10px",
    padding: "15px 20px"
  },
  cardIcon: {
    width: "40px",
    height: "36px",
    fill: "#fff"
  },
  cardAvatar: {
    margin: "8px"
  },
  cardCategory: {
    marginBottom: "0",
    color: grayColor,
    margin: "0 0 10px",
    ...defaultFont
  },
  cardTitle: {
    margin: "0",
    ...defaultFont,
    fontSize: "1.625em"
  }
};

export default statsCardStyle;
