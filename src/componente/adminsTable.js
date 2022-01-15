import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';





export default function AdminsTable({ rows}) {

    const useStyles = makeStyles((theme) => ({
        body : {
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            marginBottom: theme.spacing(4),
        },
        tabel:{
            height: "70vh",
            minHeight: 320,
        },
        header: {
            backgroundColor: theme.palette.primary.main
        },
        goImage: {
            height: 25,
        },
    }))
    let history = useHistory();

    const detailsCont = (mail) => {
        return(history.push({ pathname: "/admins/conturi/"+mail, state: mail }));
    }


    const classes = useStyles();

    return (
        <div className={classes.body}>
            <TableContainer className={classes.tabel}>
                <Table stickyHeader aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell className={classes.header}> # </TableCell>
                            <TableCell className={classes.header} align="center">Email</TableCell>
                            <TableCell className={classes.header} align="center">Nume</TableCell>
                            <TableCell className={classes.header} align="center">Tip cont</TableCell>
                            <TableCell className={classes.header} align="center">Creat la:</TableCell>
                            <TableCell className={classes.header} align="center">Premium până la:</TableCell>
                            <TableCell className={classes.header} align="center">Ultima activitate</TableCell>
                            <TableCell className={classes.header}> Detalii </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index} >
                                <TableCell >{index+1}</TableCell>
                                <TableCell align="center">{row.Email}</TableCell>
                                <TableCell align="center">{row.LastName} {row.FirstName}</TableCell>
                                <TableCell align="center" >{row.Premium}</TableCell>
                                <TableCell align="center">{row.CreatedOn.split('T')[0]} ora: {row.CreatedOn.split('T')[1].replace(':00','')}</TableCell>
                                <TableCell align="center" >{row.ZileRamase.split('T')[0]} </TableCell>
                                <TableCell align="center" >{row.LastOnline.split('T')[0]} ora: {row.LastOnline.split('T')[1].replace(':00','')}</TableCell>
                                <TableCell align="center">
                                    <Button
                                    variant="contained" 
                                    color="secondary"
                                    aria-label="details" 
                                    onClick={ () => {detailsCont(row.Email)} }
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