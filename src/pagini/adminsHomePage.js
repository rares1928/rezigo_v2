import React from 'react';
import { Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme)=>({
    wrapperDiv:{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - calc(8 * 8px))",
        justifyContent: "space-between",
    },
    root: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
    buttons: {
        width: theme.spacing(25),
    },
  }));


export default function AdminsHomePage() {
    const classes=useStyles();
    const TITLE = "Acasă";
    return(
        <div className={classes.wrapperDiv}>
        <Helmet>
            <title>{TITLE}</title>
        </Helmet>
        <Container className={classes.root} maxWidth="md">
            <Grid 
                direction = "column"
                justifyContent="center" 
                alignItems="center"
                container 
                spacing={6} >
                <Grid item>
                    <Button
                        className = {classes.buttons}
                        variant="contained"
                        color="secondary" 
                    >
                        <Typography>
                            Listă conturi
                        </Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                    className = {classes.buttons}
                        variant="contained"
                        color="secondary" 
                    >
                        <Typography>
                            Editează grile
                        </Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                    className = {classes.buttons}
                        disabled
                        variant="contained"
                        color="secondary" 
                    >
                        <Typography>
                            Creează grilă
                        </Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                    className = {classes.buttons}
                        disabled
                        variant="contained"
                        color="secondary" 
                    >
                        <Typography>
                            Sales
                        </Typography>
                    </Button>
                </Grid>
                
                
            </Grid>
        </Container>
    </div>
    );
}