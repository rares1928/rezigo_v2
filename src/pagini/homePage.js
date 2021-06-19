import React from 'react';
import test from '../poze/test_v4.svg';
import librarie from '../poze/librarie_v3.svg';
import grupuri from '../poze/grupuri_v1.svg';
import profil from '../poze/profil_v1.svg';
import premium from '../poze/premium_v1.svg';
import { makeStyles } from '@material-ui/core/styles';
import HomeCard from '../componente/homeCard';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme)=>({
    root: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
    },
  }));

export default function HomePage() {
    const classes=useStyles();

    return(
        <Container className={classes.root} maxWidth="lg">
            <Grid justify="center" container spacing={3} >
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
   );
}