import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { FormattedMessage } from "react-intl";
import styles from "./ReportTable.module.css";

function ReportTable({ products }) {
  console.log("table", products);
  return (
    <TableContainer component={Paper} style={{ borderRadius: "18px" }}>
      <Table aria-label="games table" size="small">
        <TableHead style={{ backgroundColor: "#064960" }}>
          <TableRow>
            <TableCell
              align="left"
              className={styles.thead}
              width="80%"
              style={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
            >
              <FormattedMessage
                id="reports.page.table.product"
                defaultMessage="Product"
              />
            </TableCell>
            <TableCell align="center" className={styles.thead} width="20%">
              <FormattedMessage
                id="reports.page.table.quantity"
                defaultMessage="Quantity"
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row, index) => {
            return (
              <TableRow key={`${row.product.title}_${index}`}>
                <TableCell
                  align="left"
                  style={{ borderRight: "1px solid rgba(224, 224, 224, 1)" }}
                >
                  {row.product.title}
                </TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ReportTable;
