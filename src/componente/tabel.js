import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, makeStyles} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

  
  export default function BasicTable({rows}) {
    
    const useStyles = makeStyles((theme) => ({
        header:{
            backgroundColor: theme.palette.primary.main
        }
    }))
    const classes = useStyles();

    return (
        <div className="selectieGrile_tabel_container">
            <TableContainer style={{maxHeight: "40vh"}}>
                <Table stickyHeader aria-label="simple table">
                <TableHead >
                    <TableRow >
                    <TableCell className={classes.header}> # </TableCell>
                    <TableCell className={classes.header} align="center">Data</TableCell>
                    <TableCell className={classes.header} align="center">Nr. Întrebări</TableCell>
                    <TableCell className={classes.header} align="center">Nr. răspunsuri date</TableCell>
                    <TableCell className={classes.header} align="center">Nr. întrebări rămase</TableCell>
                    <TableCell className={classes.header} align="center">Scor</TableCell>
                    <TableCell className={classes.header} align="center">Terminat</TableCell>
                    <TableCell className={classes.header} align="center">Șterge</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row,index) => (
                    <TableRow key={index}>
                        <TableCell component="th" scope="row">
                        {index+1}
                        </TableCell>
                        <TableCell align="center">{row.CreatedAt}</TableCell>
                        <TableCell align="center">{row.NumAnswered+row.NumUnanswered}</TableCell>
                        <TableCell align="center">{row.NumAnswered}</TableCell>
                        <TableCell align="center">{row.NumUnanswered}</TableCell>
                        <TableCell align="center">{row.Score}</TableCell>
                        <TableCell align="center">{row.Done ? "Da": "Nu"}</TableCell>
                        <TableCell align="center">
                            <IconButton aria-label="delete">
                                <DeleteIcon style={{color:"#d83838"}}/>
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