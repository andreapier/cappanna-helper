import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import React from "react";
import { warningColor, primaryColor, dangerColor, successColor, grayColor, defaultFont } from "variables/styles";

const PREFIX = 'CustomTable';

const classes = {
    warningTableHeader: `${PREFIX}-warningTableHeader`,
    primaryTableHeader: `${PREFIX}-primaryTableHeader`,
    dangerTableHeader: `${PREFIX}-dangerTableHeader`,
    successTableHeader: `${PREFIX}-successTableHeader`,
    grayTableHeader: `${PREFIX}-grayTableHeader`,
    table: `${PREFIX}-table`,
    tableHeadCell: `${PREFIX}-tableHeadCell`,
    tableCell: `${PREFIX}-tableCell`,
    tableResponsive: `${PREFIX}-tableResponsive`
};

const Root = styled('div')({
    [`& .${classes.warningTableHeader}`]: {
        color: warningColor
    },
    [`& .${classes.primaryTableHeader}`]: {
        color: primaryColor
    },
    [`& .${classes.dangerTableHeader}`]: {
        color: dangerColor
    },
    [`& .${classes.successTableHeader}`]: {
        color: successColor
    },
    [`& .${classes.grayTableHeader}`]: {
        color: grayColor
    },
    [`& .${classes.table}`]: {
        marginBottom: "0",
        width: "100%",
        maxWidth: "100%",
        backgroundColor: "transparent",
        borderSpacing: "0",
        borderCollapse: "collapse"
    },
    [`& .${classes.tableHeadCell}`]: {
        color: "inherit",
        ...defaultFont,
        fontSize: "1em"
    },
    [`& .${classes.tableCell}`]: {
        ...defaultFont,
        padding: "6px 2px",
        verticalAlign: "middle",
        "&:last-child": {
            paddingRight: "2px"
        }
    },
    [`&.${classes.tableResponsive}`]: {
        width: "100%",
        overflowX: "auto"
    }
});

const CustomTable = (props) => {
    const { tableHead, tableData } = props;

    return (
        <Root className={classes.tableResponsive}>
            <Table className={classes.table}>
                {tableHead !== undefined ? (
                    <TableHead className={classes.infoTableHeader}>
                        <TableRow>
                            {tableHead.map((prop, key) => {
                                return (
                                    <TableCell className={classes.tableCell + " " + classes.tableHeadCell} key={key}>
                                        {prop}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                ) : null}
                <TableBody>
                    {tableData.map((item, itemKey) => {
                        const isArray = Array.isArray(item);
                        const itemKeys = isArray ? item : Object.keys(item);

                        return (
                            <TableRow key={itemKey}>
                                {itemKeys.map((prop, key) => {
                                    if (React.isValidElement(prop)) {
                                        const Prop = prop;
                                        return (
                                            <TableCell className={classes.tableCell} key={key}>
                                                {Prop}
                                            </TableCell>
                                        );
                                    } else if (isArray) {
                                        return (
                                            <TableCell className={classes.tableCell} key={key}>
                                                {prop}
                                            </TableCell>
                                        );
                                    } else {
                                        return (
                                            <TableCell className={classes.tableCell} key={key}>
                                                {item[prop]}
                                            </TableCell>
                                        );
                                    }
                                })}
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Root>
    );
};

CustomTable.propTypes = {
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.array).isRequired
};

export default CustomTable;
