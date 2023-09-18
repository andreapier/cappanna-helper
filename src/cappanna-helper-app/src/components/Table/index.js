import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { withStyles } from '@mui/styles';
import PropTypes from "prop-types";
import React from "react";
import tableStyle from "variables/styles/tableStyle";

const CustomTable = (props) => {
    const { classes, tableHead, tableData } = props;

    return (
        <div className={classes.tableResponsive}>
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
        </div>
    );
};

CustomTable.propTypes = {
    classes: PropTypes.object.isRequired,
    tableHead: PropTypes.arrayOf(PropTypes.string),
    tableData: PropTypes.arrayOf(PropTypes.array).isRequired
};

export default withStyles(tableStyle)(CustomTable);
