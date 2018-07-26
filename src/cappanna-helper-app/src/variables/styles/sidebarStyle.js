import {
  drawerWidth,
  transition,
  boxShadow,
  defaultFont
} from "variables/styles";

const itemLink = {
  transition: "all 300ms linear",
  borderRadius: "3px",
  ...defaultFont
};

const sidebarStyle = theme => ({
  drawerPaper: {
    border: "none",
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
      height: "100vh",
      zIndex: "1032",
      visibility: "visible",
      overflowY: "visible",
      borderTop: "none",
      textAlign: "left",
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
    textDecoration: "none"
  },
  itemLink,
  itemIcon: {
    width: "24px",
    height: "30px",
    textAlign: "center",
    color: "rgb(0, 0, 0)"
  },
  itemText: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "14px",
    color: "#000000"
  },
  selectedItemLink: {
    ...itemLink,
    backgroundColor: "rgb(225, 225, 225)"
  },
  sidebarWrapper: {
    height: "calc(100vh - 75px)",
    overflow: "auto",
    width: "260px",
    zIndex: "4",
    overflowScrolling: "touch"
  }
});

export default sidebarStyle;
