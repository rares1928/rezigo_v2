import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';





export default function BasicTable({ rows, onClick}) {

    const useStyles = makeStyles((theme) => ({
        body : {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            marginBottom: theme.spacing(4),
        },
        tabel:{
            height: "40vh",
            minHeight: 320,
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
            <TableContainer className={classes.tabel}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell className={classes.header}> # </TableCell>
                            <TableCell className={classes.header} align="center">Email</TableCell>
                            <TableCell className={classes.header} align="center">Tip cont</TableCell>
                            <TableCell className={classes.header} align="center">Premium până la:</TableCell>
                            <TableCell className={classes.header} align="center">Ultima activitate</TableCell>
                            <TableCell className={classes.header} align="center">Nr. teste începute</TableCell>
                            <TableCell className={classes.header}> Detalii </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} >
                                <TableCell >{index+1}</TableCell>
                                <TableCell align="center">{row.CreatedAt}</TableCell>
                                <TableCell align="center" >{row.tipCont}</TableCell>
                                <TableCell align="center" >{row.premiumUntil}</TableCell>
                                <TableCell align="center" >{row.lastActivity}</TableCell>
                                <TableCell align="center" >{row.numTests}</TableCell>
                                <TableCell align="center">
                                    <Button
                                    variant="contained" 
                                    aria-label="details" 
                                    onClick={ () => {onClick()} }
                                    >
                                        <Typography>Detalii</Typography>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}