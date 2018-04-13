import {
  card,
  cardHeader,
  defaultFont,
  primaryBoxShadow
} from "variables/styles";

const tasksCardStyle = theme => ({
  card,
  cardHeader: {
    flex: "none",
    ...cardHeader,
    ...defaultFont,
    background: "linear-gradient(60deg, #ab47bc, #8e24aa)",
    ...primaryBoxShadow
  },
  cardTitle: {
    ...defaultFont,
    float: "left",
    padding: "10px 10px 10px 0",
    lineHeight: "24px",
    fontSize: "14px",
    color: "#FFFFFF"
  },
  tabWrapper: {
    width: "auto",
    display: "inline-flex",
    alignItems: "inherit",
    flexDirection: "row",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      display: "flex"
    }
  },
  tabIcon: {
    float: "left",
    [theme.breakpoints.down("sm")]: {
      marginTop: "-2px"
    }
  },
  displayNone: {
    display: "none"
  },
  tabsContainer: {
    marginTop: "4px",
    color: "#FFFFFF",
    [theme.breakpoints.down("sm")]: {
      display: "grid"
    }
  },
  tabs: {
    width: "110px",
    minWidth: "70px",
    paddingLeft: "12px"
  },
  cardHeaderContent: {
    flex: "none"
  },
  label: {
    lineHeight: "19px",
    textTransform: "uppercase",
    fontSize: "12px",
    fontWeight: "400",
    marginLeft: "-10px"
  }
});

export default tasksCardStyle;
