import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  withStyles
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";
import tableStyle from "variables/styles/tableStyle";

const CustomTable = props => {
  const { classes, tableHead, tableData, tableHeaderColor } = props;

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((item, itemKey) => {
            const itemKeys = item.map ? item : Object.keys(item);

            return (
              <TableRow key={itemKey}>
                {itemKeys.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {item.map ? prop : item[prop]}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.array)
};

export default withStyles(tableStyle)(CustomTable);
