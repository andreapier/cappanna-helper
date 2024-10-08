const drawerWidth = "260px";

const transition = {
    transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
};

const container = {
    paddingRight: "5px",
    paddingLeft: "5px",
    marginRight: "auto",
    marginLeft: "auto"
};

const boxShadow = {
    boxShadow: "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
};

const card = {
    display: "inline-block",
    position: "relative",
    width: "100%",
    margin: "25px 0",
    boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
    borderRadius: "3px",
    color: "rgba(0, 0, 0, 0.87)",
    background: "#fff"
};

const defaultFont = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.5em"
};

const primaryColor = "#1e2a9c";
const warningColor = "#ff9800";
const dangerColor = "#f44336";
const successColor = "#4caf50";
const grayColor = "#999999";

const primaryBoxShadow = {
    boxShadow: "0 14px 26px -12px rgba(30, 0, 191, 0.42), 0 4px 23px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 188, 212, 0.2)"
};
const successBoxShadow = {
    boxShadow: "0 12px 20px -10px rgba(76, 175, 80, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(76, 175, 80, 0.2)"
};
const warningBoxShadow = {
    boxShadow: "0 12px 20px -10px rgba(255, 152, 0, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(255, 152, 0, 0.2)"
};
const dangerBoxShadow = {
    boxShadow: "0 12px 20px -10px rgba(244, 67, 54, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(244, 67, 54, 0.2)"
};

const blueCardHeader = {
    background: "#1e2a9c",
    ...primaryBoxShadow
};
const cardActions = {
    margin: "0 20px 10px",
    paddingTop: "10px",
    borderTop: "1px solid #eeeeee",
    height: "auto",
    ...defaultFont
};
const cardHeader = {
    borderRadius: "3px",
    padding: "15px"
};

const defaultBoxShadow = {
    border: "0",
    borderRadius: "3px",
    boxShadow: "0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    padding: "10px 0",
    transition: "all 150ms ease 0s"
};

const flex = {
    root: {
        flexGrow: 1
    },
    flex: {
        flex: 1
    },
    alignCenter: {
        display: "flex",
        alignItems: "center"
    }
};

export {
    drawerWidth,
    transition,
    container,
    boxShadow,
    card,
    defaultFont,
    primaryColor,
    warningColor,
    dangerColor,
    successColor,
    grayColor,
    primaryBoxShadow,
    successBoxShadow,
    warningBoxShadow,
    dangerBoxShadow,
    blueCardHeader,
    cardActions,
    cardHeader,
    defaultBoxShadow,
    flex
};
