import React, {useState} from 'react';
import { Typography } from '@mui/material';
import { Collapse } from '@mui/material';
import { Paper } from '@mui/material';
import { Grid } from '@mui/material';
import { Container } from '@mui/material';
import { Card } from '@mui/material';
import { CardActions } from '@mui/material';
import { CardActionArea } from '@mui/material';
import { CardContent } from '@mui/material';
import {Slide} from '@mui/material';
import { FormControlLabel } from '@mui/material';
import { Switch } from '@mui/material';
import { Box } from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
    card:{
        display: "flex",
        flexDirection: "row",
        marginBottom: theme.spacing(0.5),
        width: "100%",
        height: '15vh'
    },
    wrapper:{
        // height: "80vh",
        // width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "start",
        backgroundColor: "black",
    },
    paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(0),
    },
    cardFront: {
        // position: "absolute",
        zIndex: "1",
        backgroundColor:"#B1EEBE"
    }, 
    cardBack: {
        zIndex: "1",
        // position: "absolute",
        backgroundColor:'red'
    },  
    parentCard: {
        position: "relative",
        left: "10vw",
        marginTop: "2%"
    },
    intrebareGrid: {
        width: "100%",
    },
    hintGrid: {
        minWidth: "10%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        marginRight: "10px",
        // backgroundColor: "#DDEEF8"
    },
    raspunsHintGrid: {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:"red"
    }
}));

export default function LibrariePage() {
  
    const classes=useStyles();


    const [checked, setChecked] = useState([true, true, true, true]);

    const handleChange = (index) => {
        const tempCheckedList = checked
        tempCheckedList[index] = !tempCheckedList[index]
        setChecked([...tempCheckedList]);
    };

    return (
    <Container maxWidth="lg"> 
        <Grid container direction="row" sx={{bgcolor:'red', display:'flex', direction:'row'}}>
            <Grid className={classes.intrebareGrid} item>
                <Paper className={classes.paper} >
                    <Card className={classes.card} sx={{height:'40vh'}}>
                        <CardContent className={classes.hintGrid}>
                            <Typography align="center" variant="body2">
                                Nr. Grila:
                            </Typography>
                        </CardContent>
                        <CardActionArea>
                            <CardContent>
                                <Typography variant="body2">
                                    Doi pereti vorbesc
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Paper>
            </Grid>
        </Grid>
        <Grid contianer direction="column">
            <Grid item>
                <Paper className={classes.paper}>
                    <Card className={classes.card}>
                        <CardActions className={classes.hintGrid} onClick={() => handleChange(0)}>
                            <Typography variant="body2" color="textPrimary">
                                Hint:
                            </Typography>
                        </CardActions>
                        {!checked[0] ? 
                        <CardContent className={classes.raspunsHintGrid}>
                            <Typography>Raspuns hint</Typography>
                        </CardContent>    
                            : null}
                        <Slide direction="left" in={checked[0]}>
                            <CardActionArea className={classes.cardFront}>
                                <CardContent>
                                    
                                </CardContent>
                            </CardActionArea>
                        </Slide>
                    </Card>
                    <Card className={classes.card}>
                        <CardActions className={classes.hintGrid} onClick={() => handleChange(1)}>
                            <Typography variant="body2">
                                Raspuns:
                            </Typography>
                        </CardActions>
                        {!checked[1] ? 
                        <CardContent className={classes.raspunsHintGrid}>
                            <Typography>Actual raspuns</Typography>
                        </CardContent>    
                            : null}
                        <Slide direction="left" in={checked[1]}>
                            <CardActionArea className={classes.cardFront}>
                                <CardContent>                            
                                </CardContent>
                            </CardActionArea>
                        </Slide>
                    </Card>
                </Paper>
            </Grid>
        </Grid>
    </Container>
    );
    }