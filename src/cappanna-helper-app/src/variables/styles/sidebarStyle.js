import {
  drawerWidth,
  transition,
  boxShadow,
  defaultFont
} from "variables/styles";

const itemLink = {
  width: "auto",
  transition: "all 300ms linear",
  margin: "10px 15px 0",
  borderRadius: "3px",
  position: "relative",
  display: "block",
  padding: "10px 15px",
  ...defaultFont
};

const sidebarStyle = theme => ({
  drawerPaper: {
    border: "none",
    position: "fixed",
    top: "0",
    bottom: "0",
    left: "0",
    zIndex: "1",
    ...boxShadow,
    width: drawerWidth,
    [theme.breakpoints.up("md")]: {
      width: drawerWidth,
      position: "fixed",
      height: "100%"
    },
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
      ...boxShadow,
      position: "fixed",
      display: "block",
      top: "0",
      height: "100vh",
      left: "auto",
      zIndex: "1032",
      visibility: "visible",
      overflowY: "visible",
      borderTop: "none",
      textAlign: "left",
      paddingRight: "0px",
      paddingLeft: "0",
      ...transition
    }
  },
  list: {
    marginTop: "20px",
    paddingLeft: "0",
    paddingTop: "0",
    paddingBottom: "0",
    marginBottom: "0",
    listStyle: "none"
  },
  item: {
    position: "relative",
    display: "block",
    textDecoration: "none"
  },
  itemLink,
  itemIcon: {
    width: "24px",
    height: "30px",
    float: "left",
    marginRight: "15px",
    textAlign: "center",
    verticalAlign: "middle",
    color: "rgb(0, 0, 0)"
  },
  itemText: {
    ...defaultFont,
    margin: "0",
    lineHeight: "30px",
    fontSize: "14px",
    color: "#000000"
  },
  selectedItemLink: {
    ...itemLink,
    backgroundColor: "rgb(225, 225, 225)"
  },
  sidebarWrapper: {
    position: "relative",
    height: "calc(100vh - 75px)",
    overflow: "auto",
    width: "260px",
    zIndex: "4",
    overflowScrolling: "touch"
  }
});

export default sidebarStyle;
