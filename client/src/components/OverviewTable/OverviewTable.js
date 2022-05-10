import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styles from "./OverviewTable.module.css";

function OverviewTable({ products }) {
  return (
    <TableContainer component={Paper} style={{ borderRadius: "18px" }}>
      <Table aria-label="games table" size="small">
        <TableHead sx={{ borderBottom: "1px solid white" }}>
          <TableRow>
            <TableCell align="left" className={styles.thead}>
              Product
            </TableCell>
            <TableCell align="right" className={styles.thead}>
              Quantity
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((row, index) => {
            return (
              <TableRow key={`${row.product.title}_${index}`}>
                <TableCell align="left">{row.product.title}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default OverviewTable;
