import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles } from '@material-ui/core';




export default function AdminsDataTable({rows}) {

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
        tableBody:{
            backgroundColor: theme.palette.background.paper,
        },
    }))

    const classes = useStyles();
    return (
        <div className={classes.body}>
            <TableContainer className={classes.tabel}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell className={classes.header}> Test ID </TableCell>
                            <TableCell className={classes.header} align="center">Data</TableCell>
                            <TableCell className={classes.header} align="center">Nr. Întrebări</TableCell>
                            <TableCell className={classes.header} align="center">Nr. răspunsuri date</TableCell>
                            <TableCell className={classes.header} align="center">Nr. întrebări rămase</TableCell>
                            <TableCell className={classes.header} align="center">Raspunsuri corecte</TableCell>
                            <TableCell className={classes.header} align="center">Terminat</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {rows.map((row, index) => (
                            <TableRow key={index.toString()+'_testAdmins'} >
                                <TableCell className={classes.tableBody} align="center" >{row["TestID"]}</TableCell>
                                <TableCell className={classes.tableBody} align="center" >{row.CreatedAt}</TableCell>
                                <TableCell className={classes.tableBody} align="center" >{row.NumAnswered + row.NumUnanswered}</TableCell>
                                <TableCell className={classes.tableBody} align="center" >{row.NumAnswered}</TableCell>
                                <TableCell className={classes.tableBody} align="center" >{row.NumUnanswered}</TableCell>
                                <TableCell className={classes.tableBody} align="center" >{row.Score}</TableCell>
                                <TableCell className={classes.tableBody} align="center" >{row.Done ? "Da" : "Nu"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}