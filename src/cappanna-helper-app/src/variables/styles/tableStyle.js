import { warningColor, primaryColor, dangerColor, successColor, grayColor, defaultFont } from "variables/styles";

const tableStyle = (theme) => ({
    warningTableHeader: {
        color: warningColor
    },
    primaryTableHeader: {
        color: primaryColor
    },
    dangerTableHeader: {
        color: dangerColor
    },
    successTableHeader: {
        color: successColor
    },
    grayTableHeader: {
        color: grayColor
    },
    table: {
        marginBottom: "0",
        width: "100%",
        maxWidth: "100%",
        backgroundColor: "transparent",
        borderSpacing: "0",
        borderCollapse: "collapse"
    },
    tableHeadCell: {
        color: "inherit",
        ...defaultFont,
        fontSize: "1em"
    },
    tableCell: {
        ...defaultFont,
        padding: "6px 2px",
        verticalAlign: "middle",
        "&:last-child": {
            paddingRight: "2px"
        }
    },
    tableResponsive: {
        width: "100%",
        overflowX: "auto"
    }
});

export default tableStyle;
