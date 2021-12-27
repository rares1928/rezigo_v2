import '../App.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Helmet } from 'react-helmet';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import logo from '../poze/logo4.svg';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Fade from '@material-ui/core/Fade';
import rezolva_invata from '../poze/rezolva_invata.svg';
import oriunde_oricand from '../poze/oriunde_oricand.svg';
import statistici from '../poze/statistici.svg';



const useStyles = makeStyles((theme)=>({
    root:{
        display: "flex",
        flexDirection: "column",
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
    textAndImageWrapper1: {
        display: "flex",
        alignItems:"center",
        backgroundColor: theme.palette.primary.main,
        height: 320,
        width: "100%",
    },
    divTextImage: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    divText: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    pozeMici: {
        maxHeight: 220,
        maxWidth: "40vw"
    },
    divTextTitle: {
        paddingBottom: theme.spacing(1),
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
            <div className = 'prezentare_header'>
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
            <hr class="rounded"></hr>
            <div className={classes.textAndImageWrapper1}>
                <Container maxWidth="md">
                    <div className={classes.divTextImage}>
                        <div className={classes.divText}>
                            <Typography variant = "h5" className={classes.divTextTitle}>
                                Rezolvă teste. Învață din greșeli.
                            </Typography>
                            <Typography variant = "h6">
                                Testează-ți cunoștințele rezolvând grile, reparcurge greșelile și aprofundează materia.
                            </Typography>
                        </div>
                        <img src={rezolva_invata} className={classes.pozeMici} />
                    </div>
                </Container>
            </div>
            <hr class="rounded"></hr>
            <div className={classes.textAndImageWrapper1}>
                <Container maxWidth="md">
                    <div className={classes.divTextImage}>
                        <img src={oriunde_oricand} className={classes.pozeMici} />
                        <div className={classes.divText}>
                            <Typography variant = "h5" className={classes.divTextTitle}>
                                Oriunde, oricând.
                            </Typography>
                            <Typography variant = "h6">
                                Folosește Rezigo de pe orice device. Răspunsurile tale sunt salvate, așadar poți continua testele începute în orice moment.
                            </Typography>
                        </div>
                    </div>
                </Container>
            </div>
            <hr class="rounded"></hr>
            <div className={classes.textAndImageWrapper1}>
                <Container maxWidth="md">
                    <div className={classes.divTextImage}>
                        <div className={classes.divText}>
                            <Typography variant = "h5" className={classes.divTextTitle}>
                                Urmărește-ți evoluția prin statistici.
                            </Typography>
                            <Typography variant = "h6">
                                Compară statisticile testelor tale cu media utilizatorilor site-ului.
                            </Typography>
                        </div>
                        <img src={statistici} className={classes.pozeMici} />
                    </div>
                </Container>
            </div>
            <hr class="rounded"></hr>
            
        </div>
    );
}