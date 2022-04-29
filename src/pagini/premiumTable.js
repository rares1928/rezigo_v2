import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CheckBoxRoundedIcon from "@material-ui/icons/CheckBoxRounded";
import ClearRoundedIcon from "@material-ui/icons/ClearRounded";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    fontSize: 16,
    fontWeight: "bold",
    height: 45,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(name, standard, premium) {
  return { name, standard, premium };
}

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  checkBox: {
    color: theme.palette.success.main,
  },
  cancelCross: {
    color: theme.palette.error.main,
  },
  tableDiv: {
    backgroundColor: "rgba(238,238,238,0.2)",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function PremiumTable() {
  const classes = useStyles();

  const rows1 = [
    createData(
      "Numărul de grile care pot fi rezolvate zilnic",
      40,
      "nelimitat"
    ),
  ];

  const rows2 = [
    createData(
      "Test nou",
      <CheckBoxRoundedIcon className={classes.checkBox} />,
      <CheckBoxRoundedIcon className={classes.checkBox} />
    ),
    createData(
      "Grile pe pagini",
      <ClearRoundedIcon className={classes.cancelCross} />,
      <CheckBoxRoundedIcon className={classes.checkBox} />
    ),
    createData(
      "Simulare",
      <ClearRoundedIcon className={classes.cancelCross} />,
      <CheckBoxRoundedIcon className={classes.checkBox} />
    ),
    createData(
      "Teste începute",
      <ClearRoundedIcon className={classes.cancelCross} />,
      <CheckBoxRoundedIcon className={classes.checkBox} />
    ),
    createData(
      "Reparcurge greșeli",
      <ClearRoundedIcon className={classes.cancelCross} />,
      <CheckBoxRoundedIcon className={classes.checkBox} />
    ),
    createData(
      "Examene rezidențiat din anii anteriori",
      <CheckBoxRoundedIcon className={classes.checkBox} />,
      <CheckBoxRoundedIcon className={classes.checkBox} />
    ),
    createData(
      "Simulările ReziGo oficiale ale Examenului de Rezidențiat ",
      <ClearRoundedIcon className={classes.cancelCross} />,
      <CheckBoxRoundedIcon className={classes.checkBox} />
    ),
  ];

  const rows3 = [
    createData(
      "Posibilitatea de randomizare a grilelor",
      <CheckBoxRoundedIcon className={classes.checkBox} />,
      <CheckBoxRoundedIcon className={classes.checkBox} />
    ),
    createData(
      "Posibilitatea de randomizare a variantelor de răspuns",
      <ClearRoundedIcon className={classes.cancelCross} />,
      <CheckBoxRoundedIcon className={classes.checkBox} />
    ),
    createData(
      "Opțiunea „Afișează baremul” la fiecare grilă",
      <ClearRoundedIcon className={classes.cancelCross} />,
      <CheckBoxRoundedIcon className={classes.checkBox} />
    ),
    createData(
      "Statistici generale",
      <CheckBoxRoundedIcon className={classes.checkBox} />,
      <CheckBoxRoundedIcon className={classes.checkBox} />
    ),
    createData(
      "Statistici pe categorii",
      <ClearRoundedIcon className={classes.cancelCross} />,
      <CheckBoxRoundedIcon className={classes.checkBox} />
    ),
  ];

  return (
    <TableContainer className={classes.tableDiv} component={Paper}>
      <Table
        className={classes.table}
        size="small"
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            <StyledTableCell>Tip cont</StyledTableCell>
            <StyledTableCell align="center">Cont Standard</StyledTableCell>
            <StyledTableCell align="center">Cont Premium</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows1.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.standard}</StyledTableCell>
              <StyledTableCell align="center">{row.premium}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableHead>
          <TableRow>
            <StyledTableCell>Tipuri de teste incluse:</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows2.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.standard}</StyledTableCell>
              <StyledTableCell align="center">{row.premium}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
        <TableHead>
          <TableRow>
            <StyledTableCell>Funcții incluse:</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows3.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.standard}</StyledTableCell>
              <StyledTableCell align="center">{row.premium}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
