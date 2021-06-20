import React from 'react';
import test from '../poze/test_v4.svg';
import librarie from '../poze/librarie_v5.svg';
import grupuri from '../poze/grupuri_v1.svg';
import profil from '../poze/profil_v1.svg';
import premium from '../poze/premium_v1.svg';
import { makeStyles } from '@material-ui/core/styles';
import HomeCard from '../componente/homeCard';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';



const useStyles = makeStyles((theme)=>({
    root: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
    footer: {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1,10,3),
    },
    footerItem: {
        maxWidth: 300,
    }
  }));

export default function HomePage() {
    const classes=useStyles();

    return(
    <>
        <Container className={classes.root} maxWidth="lg">
            <Grid 
                justify="center" 
                container 
                spacing={6} >
                <Grid item>
                    <HomeCard
                        imagine={test}
                        sendTo="/creeaza-ti_Test" 
                        title="Test"
                        text="Creează-ți un test, încearcă-ți puterile cu o simulare sau reparcurge greșelile"
                    />
                </Grid>
                <Grid item>
                    <HomeCard 
                        imagine={librarie}
                        sendTo="/librarie"
                        title="Librărie"
                        text="învață din materialele speciale, flashcarduri și mnemonics"
                    />
                </Grid>

                <Grid item>
                    <HomeCard 
                        imagine={grupuri}
                        sendTo="/"
                        title="Grupuri"
                        text="împarte cu prietenii tăi grile, întrebari și nelămuriri"
                    />
                </Grid>

                <Grid item>
                    <HomeCard 
                        imagine={profil}
                        sendTo="/profil"
                        title="Profil"
                        text="Configurează setări, vezi statistici legate de teste"
                    />
                </Grid>

                <Grid item>
                    <HomeCard 
                        imagine={premium}
                        sendTo="/"
                        title="Premium"
                        text="Investește în tine! Activează-ți contul premium "
                    />
                </Grid>
                
            </Grid>
        </Container>
        <footer className={classes.footer}>
            <Grid 
                container
                direction="row"
                justify="space-between"
                spacing={4}
            >
                <Grid className={classes.footerItem} item>
                    <Typography variant="h6"  gutterBottom>
                        Contact
                    </Typography>
                <Typography component="p">
                    Pentru orice fel intrebări sau sugestii,
                    vă rugam să ne contactați la adresa de mail:
                    rezigo.contact@gmail.com
                </Typography>
                </Grid>
                <Grid container direction="column" className={classes.footerItem} item>
                    <Typography variant="h6"  gutterBottom>
                        Link-uri utile
                    </Typography>
                    <Link color="secondary" href="/">Despre noi</Link>
                    <Link color="secondary" href="/">Termeni și condiții</Link>
                    <Link color="secondary" href="/">Întrebări frecvente</Link>
                </Grid>
                <Grid className={classes.footerItem} item>
                    <Typography  variant="h6"  gutterBottom>
                        Păstrează legătura
                    </Typography>
                    <IconButton href="/">
                        <FacebookIcon color="secondary"  fontSize="large" />
                    </IconButton>
                    <IconButton href="/">
                        <InstagramIcon color="secondary" fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>
        </footer>
    </>
   );
}