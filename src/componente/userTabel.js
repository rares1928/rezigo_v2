import * as React from 'react';
import Paper from '@mui/material/Paper';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
} from '@mui/material';


import makeStyles from '@mui/styles/makeStyles';


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function BasicTable() {
    const useStyles = makeStyles((theme) => ({
        body : {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            marginBottom: theme.spacing(4),
            display:"flex",
            justifyContent: "center",
        },
        tabel:{
            height: "40vh",
            minHeight: 320,
            width: "60vw",
        },
        header: {
            backgroundColor: theme.palette.primary.main
        },
        goImage: {
            height: 25,
        },
    }))

    const classes = useStyles();

    return (
        <div className={classes.body}>
            <TableContainer className={classes.tabel} component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell className={classes.header} align="center">Nume</TableCell>
                    <TableCell className={classes.header} align="center">Prenume</TableCell>
                    <TableCell className={classes.header} align="center">Email</TableCell>
                    <TableCell className={classes.header} align="center">Premium</TableCell>
                    <TableCell className={classes.header} align="center">Zile Ramase</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                    key={row.name}
                    >
                    <TableCell align="center">
                        {row.name}
                    </TableCell>
                    <TableCell align="center">{row.calories}</TableCell>
                    <TableCell align="center">{row.fat}</TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>
                    <TableCell align="center">{row.protein}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
    </div>
  );
}