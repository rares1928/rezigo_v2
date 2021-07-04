import * as React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

  
  export default function BasicTable({rows}) {
  
    return (
        <div className="selectieGrile_tabel_container">
            <TableContainer style={{maxHeight: "40vh"}}>
                <Table stickyHeader aria-label="simple table">
                <TableHead >
                    <TableRow >
                    <TableCell style={{ color: "#fff",backgroundColor:"rgb(0, 42, 105)" }} > # </TableCell>
                    <TableCell style={{ color: "#fff",backgroundColor:"rgb(0, 42, 105)" }} align="center">Data</TableCell>
                    <TableCell style={{ color: "#fff",backgroundColor:"rgb(0, 42, 105)"}} align="center">Nr. Întrebări</TableCell>
                    <TableCell style={{ color: "#fff",backgroundColor:"rgb(0, 42, 105)" }} align="center">Nr. răspunsuri date</TableCell>
                    <TableCell style={{ color: "#fff",backgroundColor:"rgb(0, 42, 105)" }} align="center">Nr. întrebări rămase</TableCell>
                    <TableCell style={{ color: "#fff",backgroundColor:"rgb(0, 42, 105)" }} align="center">Scor</TableCell>
                    <TableCell style={{ color: "#fff",backgroundColor:"rgb(0, 42, 105)" }} align="center">Terminat</TableCell>
                    <TableCell style={{ color: "#fff",backgroundColor:"rgb(0, 42, 105)" }} align="center">Șterge</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row,index) => (
                    <TableRow key={index}>
                        <TableCell style={{ color: "#fff" }} component="th" scope="row">
                        {index+1}
                        </TableCell>
                        <TableCell style={{ color: "#fff" }} align="center">{row.CreatedAt}</TableCell>
                        <TableCell style={{ color: "#fff" }} align="center">{row.NumAnswered+row.NumUnanswered}</TableCell>
                        <TableCell style={{ color: "#fff" }} align="center">{row.NumAnswered}</TableCell>
                        <TableCell style={{ color: "#fff" }} align="center">{row.NumUnanswered}</TableCell>
                        <TableCell style={{ color: "#fff" }} align="center">{row.Score}</TableCell>
                        <TableCell style={{ color: "#fff" }} align="center">{row.Done ? "Da": "Nu"}</TableCell>
                        <TableCell style={{ color: "#fff" }} align="center">
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