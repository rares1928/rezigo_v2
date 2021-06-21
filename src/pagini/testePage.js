import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import testNouImg from '../poze/test_nou_v2.svg';
import simulareImg from '../poze/simulare_v1.svg';
import testNeterminatImg from '../poze/test_neterminat_v2.svg';
import reparcurgeGreseliImg from '../poze/reparcurge_greseli_v2.svg';
import kumar from '../poze/kumar.svg';
import lawrence from '../poze/lawrence.svg';
import sinopsis from '../poze/sinopsis.svg';
import TestsCard from '../componente/testsCard';
import TestsBookCard from '../componente/testsBookCard';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CategoryAcordion from '../componente/categoryAcordion';
import Grow from '@material-ui/core/Grow';
import data from "../componente/getCategorii";


const useStyles = makeStyles((theme)=>({
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    instructionsText: {
        padding: theme.spacing(2,0,0)
    },
    bookDiv :{
        flex:1,
    },
    bookLevel :{
        flex:1,
        display:"flex",
        flexDirection:"column",
        alignContent:"center",
        minWidth: 340,
        maxWidth: 389,
        
    },
    bookSubcatDiv :{
        marginTop: theme.spacing(2),
    },
    footer: {
        backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1,10,3),
    },
    footerItem: {
        maxWidth: 300,
    }
}));

export default function TestePage() {
    
    const classes = useStyles();
    const [isCardSelected, setCardSelected] = useState("");
    const [isKumar, setKumar] = useState(false);
    const [isLawrence, setLawerence] = useState(false);
    const [isSinopsis, setSinopsis] = useState(false);
    const listaCategorii = data["lista_finala"]; 

    
    const displayTestNou = ()=>{
        return(
            <>
                <Typography variant="h6" component="h6" className={classes.instructionsText}>
                    2. Selectează cărțile:
                </Typography>
                <Grid 
                className={classes.cardGrid}
                container 
                justify="center"
                spacing={4}
                >
                    <Grid item className={classes.bookLevel}>
                        <TestsBookCard
                            isSelected = {isKumar}
                            setCardSelected = {setKumar}
                            imagine={kumar} 
                            title="Kumar și Clark Medicină Clinică"
                        />
                        {
                            isKumar &&
                            <Grow in={isKumar}>
                                <div className={classes.bookSubcatDiv}>
                                    <CategoryAcordion  data={listaCategorii} book="Kumar" />
                                </div>
                            </Grow>
                        }
                    </Grid>
                    <Grid item className={classes.bookLevel}>
                        <TestsBookCard
                            isSelected = {isLawrence}
                            setCardSelected = {setLawerence}
                            imagine={lawrence} 
                            title="Chirurgie generală și specialități chirurgicale"
                        />
                        {
                            isLawrence &&
                            <Grow in={isLawrence}>
                                <div className={classes.bookSubcatDiv}>
                                    <CategoryAcordion  data={listaCategorii} book="Chirurgie" />
                                </div>
                            </Grow>
                        }
                    </Grid>
                    <Grid item className={classes.bookLevel}>
                        <TestsBookCard
                            isSelected = {isSinopsis}
                            setCardSelected = {setSinopsis}
                            imagine={sinopsis} 
                            title="Sinopsis de medicină"
                        />
                        {
                            isSinopsis &&
                            <Grow in={isSinopsis}>
                                <div className={classes.bookSubcatDiv}>
                                    <CategoryAcordion  data={listaCategorii} book="Sinopsis" />
                                </div>
                            </Grow>
                        }
                    </Grid>
                </Grid>
            </>
        );
    }

    return(
        <Container maxWidth="lg">

        <Typography variant="h6" component="h6" className={classes.instructionsText}>
            1. Selectează tipul testului pe care vrei să îl începi:
        </Typography>
            <Grid 
            className={classes.cardGrid}
            justify="center" 
            container 
            spacing={3} 
            >
                <Grid item >
                    <TestsCard
                        isSelected = {isCardSelected === "Test nou"}
                        setCardSelected = {setCardSelected}
                        imagine={testNouImg} 
                        title="Test nou"
                        text="Selectează subcapitolele din care dorești grilele."
                    />
                </Grid>
                <Grid item>
                    <TestsCard
                        isSelected = {isCardSelected === "Simulare"}
                        setCardSelected = {setCardSelected}
                        imagine={simulareImg} 
                        title="Simulare"
                        text="50 de întrebări cu CS și 150 de întrebări cu CM."
                    />
                </Grid>
                <Grid item>
                    <TestsCard
                        isSelected = {isCardSelected === "Teste neterminate"}
                        setCardSelected = {setCardSelected}
                        imagine={testNeterminatImg} 
                        title="Teste neterminate"
                        text="Selectează unul dintre testele neterminate pe care vrei să le continui."
                    />
                </Grid>
                <Grid item>
                    <TestsCard
                        isSelected = {isCardSelected === "Reparcurge greșeli"}
                        setCardSelected = {setCardSelected}
                        imagine={reparcurgeGreseliImg} 
                        title="Reparcurge greșeli"
                        text="Selectează subcapitolele din care ai greșeli pentru a-ți acoperi golurile."
                    />
                </Grid>
            </Grid>
            {
            (isCardSelected === "Test nou") &&  
                <Grow in={isCardSelected === "Test nou"}>
                    <div>{displayTestNou()}</div>
                </Grow>
            }
            {(isCardSelected === "Simulare") && <Typography>{isCardSelected}</Typography>}
            {(isCardSelected === "Teste neterminate") && <Typography>{isCardSelected}</Typography>}
            {(isCardSelected === "Reparcurge greșeli") && <Typography>{isCardSelected}</Typography>}
        </Container>
    );
}