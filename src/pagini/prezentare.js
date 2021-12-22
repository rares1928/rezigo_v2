import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from '../poze/logo4.svg';
import prezentare from '../poze/prezentare_mic5.png';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';



const useStyles = makeStyles((theme)=>({
    root:{
        display: "flex",
        flexDirection: "column",
    },
    divBackgroundImage:{
        position: "absolute",
        zIndex: -1,

    },
    photo:{
        objectFit: "cover",
        height: 280,
        width: "100vw",
    },
    textFade:{
        textShadow: "text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF",
    },
    divWrapperButoane:{
        
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    divButoane:{
        
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        margin: theme.spacing(2),
    },
    buton:{
        width:theme.spacing(17),
        margin: theme.spacing(1),
    },
    logoBox: {
        margin: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        borderRadius: "25px",
        height: theme.spacing(12),
      },
    logoImage:{
        maxWidth: theme.spacing(17),
      },
    divAnimation: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
  }));


export default function PrezentarePage() {
    const classes=useStyles();

    const TITLE = "Prezentare";
    return(
        <div>
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <div className={classes.divBackgroundImage}>
                <img src={prezentare} alt = 'background' className={classes.photo} />
            </div>
            <div className={classes.divWrapperButoane} >
                <Box className={classes.logoBox}>
                    <img  
                        className={classes.logoImage}
                        src={logo} 
                        alt="logo" 
                    />
                </Box>  
                <div className={classes.divButoane} >
                    <Button className={classes.buton} variant="contained" color = "secondary" >
                        <Typography>
                            Autentificare
                        </Typography>
                    </Button>

                    <Button className={classes.buton} variant="contained" color = "secondary" >
                        <Typography>
                            Creează cont
                        </Typography>
                    </Button>
                </div>
            </div>
            <Container maxWidth="lg">
                    <div className={classes.divAnimation}>
                        <Fade className={classes.slide} in={true} direction='left' timeout={{enter: 1000}}>
                            <Typography className={classes.textFade} variant='h5'>
                                Rezolvă grile.
                            </Typography>
                        </Fade>
                        <Fade className={classes.slide} in={true} direction='left' timeout={{enter: 2500}}>
                            <Typography className={classes.textFade} variant='h5' >
                                Reparcurge-ți greșelile.
                            </Typography>
                        </Fade>
                        <Fade className={classes.slide} in={true} direction='left' timeout={{enter: 4000}}>
                            <Typography className={classes.textFade} variant='h5' >
                                Câștigă locul pe care ți-l dorești.
                            </Typography>
                        </Fade>
                    </div>
                </Container>
        </div>
    );
}