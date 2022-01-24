import React from 'react';
import { Helmet } from 'react-helmet';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

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
    const TITLE = "admins";
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
                        href="/admins/conturi"
                    >
                        <Typography>
                            Listă conturi
                        </Typography>
                    </Button>
                </Grid>
                <Grid item>
                    <Button
                        href="/admins/grile"
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