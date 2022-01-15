import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles, CircularProgress } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import logo from '../poze/mini_logo4.svg';




export default function DataTable({ rows, onDelete, onClick}) {

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
        goImage: {
            height: 25,
        },
    }))

    const classes = useStyles();

    const [loadingDelete, setLoadingDelete] = useState(false);

    return (
        <div className={classes.body}>
            <TableContainer className={classes.tabel}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell className={classes.header}> # </TableCell>
                            <TableCell className={classes.header}> Continuă </TableCell>
                            <TableCell className={classes.header} align="center">Data</TableCell>
                            <TableCell className={classes.header} align="center">Nr. Întrebări</TableCell>
                            <TableCell className={classes.header} align="center">Nr. răspunsuri date</TableCell>
                            <TableCell className={classes.header} align="center">Nr. întrebări rămase</TableCell>
                            <TableCell className={classes.header} align="center">Nr. răspunsuri corecte</TableCell>
                            <TableCell className={classes.header} align="center">Scor</TableCell>
                            <TableCell className={classes.header} align="center">Terminat</TableCell>
                            <TableCell className={classes.header} align="center">Șterge</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {rows.map((row, index) => (
                            <TableRow key={index} >
                                <TableCell className={classes.tableBody} >{index+1}</TableCell>
                                <TableCell className={classes.tableBody} component="th" onClick={() => onClick(row.TestID)} scope="row">
                                    <IconButton >
                                        <img alt="logo" src={logo} className={classes.goImage} />
                                    </IconButton>
                                </TableCell>
                                <TableCell className={classes.tableBody} align="center">{row.CreatedAt.split('T')[0]} ora: {row.CreatedAt.split('T')[1].replace(':00','')}</TableCell>
                                <TableCell className={classes.tableBody} align="center" >{row.NumAnswered + row.NumUnanswered}</TableCell>
                                <TableCell className={classes.tableBody} align="center" >{row.NumAnswered}</TableCell>
                                <TableCell className={classes.tableBody} align="center" >{row.NumUnanswered}</TableCell>
                                <TableCell className={classes.tableBody} align="center" >{row.Score}</TableCell>
                                <TableCell className={classes.tableBody} align="center" >{row.ScorReziPosibil === 0 ? '-' : <> {row.ScorRezi}/{row.ScorReziPosibil} ({(row.ScorRezi/row.ScorReziPosibil*950).toPrecision(3)}/950) </> }</TableCell>
                                <TableCell className={classes.tableBody} align="center" >{row.Done ? "Da" : "Nu"}</TableCell>
                                <TableCell className={classes.tableBody} align="center">
                                    <IconButton 
                                    aria-label="delete" 
                                    onClick={async () => {setLoadingDelete(true); await onDelete(row.TestID); setLoadingDelete(false)} } >
                                        { loadingDelete? <CircularProgress size={25} /> : <DeleteIcon style={{ color: "#d83838" }} />}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    );
}