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
import red from "@material-ui/core/colors/red";
import green from "@material-ui/core/colors/green";
import { palette } from "@material-ui/system";
import { orange } from "@material-ui/core/colors";

const accent = orange["A200"];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: orange[500],
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

const rows1 = [
  createData("Numărul de grile care pot fi rezolvate zilnic", 30, "nelimitat"),
];

const rows2 = [
  createData(
    "Test nou",
    <CheckBoxRoundedIcon style={{ color: green[500] }} />,
    <CheckBoxRoundedIcon style={{ color: green[500] }} />
  ),
  createData(
    "Grile pe pagini",
    <ClearRoundedIcon style={{ color: red[500] }} />,
    <CheckBoxRoundedIcon style={{ color: green[500] }} />
  ),
  createData(
    "Simulare",
    <ClearRoundedIcon style={{ color: red[500] }} />,
    <CheckBoxRoundedIcon style={{ color: green[500] }} />
  ),
  createData(
    "Teste începute",
    <ClearRoundedIcon style={{ color: red[500] }} />,
    <CheckBoxRoundedIcon style={{ color: green[500] }} />
  ),
  createData(
    "Reparcurge greșeli",
    <ClearRoundedIcon style={{ color: red[500] }} />,
    <CheckBoxRoundedIcon style={{ color: green[500] }} />
  ),
  createData(
    "Examene rezidențiat din anii anteriori",
    <CheckBoxRoundedIcon style={{ color: green[500] }} />,
    <CheckBoxRoundedIcon style={{ color: green[500] }} />
  ),
  createData(
    "Simulările ReziGo oficiale ale Examenului de Rezidențiat ",
    <ClearRoundedIcon style={{ color: red[500] }} />,
    <CheckBoxRoundedIcon style={{ color: green[500] }} />
  ),
];

const rows3 = [
  createData(
    "Posibilitatea de randomizare a grilelor",
    <CheckBoxRoundedIcon style={{ color: green[500] }} />,
    <CheckBoxRoundedIcon style={{ color: green[500] }} />
  ),
  createData(
    "Posibilitatea de randomizare a variantelor de răspuns",
    <ClearRoundedIcon style={{ color: red[500] }} />,
    <CheckBoxRoundedIcon style={{ color: green[500] }} />
  ),
  createData(
    "Opțiunea „Afișează baremul” la fiecare grilă",
    <ClearRoundedIcon style={{ color: red[500] }} />,
    <CheckBoxRoundedIcon style={{ color: green[500] }} />
  ),
  createData(
    "Statistici generale",
    <CheckBoxRoundedIcon style={{ color: green[500] }} />,
    <CheckBoxRoundedIcon style={{ color: green[500] }} />
  ),
  createData(
    "Statistici pe categorii",
    <ClearRoundedIcon style={{ color: red[500] }} />,
    <CheckBoxRoundedIcon style={{ color: green[500] }} />
  ),
];

const useStyles = makeStyles({
  table: {},
});

export default function CustomizedTables() {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
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
