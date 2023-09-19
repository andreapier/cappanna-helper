import { defaultFont } from "variables/styles";

const item = {
    textDecoration: "none"
};
const itemIcon = {
    width: "24px",
    height: "30px",
    textAlign: "center",
    color: "rgb(0, 0, 0)"
};
const itemLink = {
    transition: "all 300ms linear",
    borderRadius: "3px",
    ...defaultFont
};
const itemText = {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "14px",
    color: "#000000"
};

const sidebarStyle = {
    item,
    itemLink,
    itemIcon,
    itemText,
};

export default sidebarStyle;

export { item, itemIcon, itemLink, itemText };