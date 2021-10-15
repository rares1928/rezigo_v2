import React, {useState} from 'react';
import { Typography } from '@material-ui/core';
import { Collapse } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { Grid } from '@material-ui/core';
import { Container } from '@material-ui/core';
import { Card } from '@material-ui/core';
import { CardActions } from '@material-ui/core';
import { CardActionArea } from '@material-ui/core';
import { CardContent } from '@material-ui/core';
import {Slide} from '@material-ui/core';
import { FormControlLabel } from '@material-ui/core';
import { Switch } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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