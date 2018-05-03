import { defaultFont, flex } from "variables/styles";

const headerStyle = theme => ({
  appBar: {
    top: "-30px",
    [theme.breakpoints.down("md")]: {
      top: "-15px"
    },
    backgroundColor: "transparent",
    boxShadow: "none",
    borderBottom: "0",
    marginBottom: "0",
    position: "absolute",
    width: "100%",
    paddingTop: "10px",
    zIndex: "1029",
    color: "#555555",
    border: "0",
    borderRadius: "3px",
    padding: "10px 0",
    transition: "all 150ms ease 0s",
    minHeight: "50px",
    display: "block"
  },
  flex,
  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    top: "10px",
    "&:hover,&:focus": {
      background: "transparent"
    }
  },
  appResponsive: {
    top: "8px"
  }
});

export default headerStyle;
