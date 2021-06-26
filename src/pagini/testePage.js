import React, { useEffect, useState } from 'react';
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
import preData from "../componente/getCategorii";
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";


const useStyles = makeStyles((theme)=>({
    root:{
        minHeight: "calc(100vh - calc(8 * 8px))",
        display: "flex",
        flexDirection: "column",
    },
    containerPart: {
        flex:1,
    },
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
        width: "100%",
        padding: theme.spacing(2)
    },
    footerItem: {
        maxWidth: 300,
    },
    footerButton:{
        padding: theme.spacing(2),
    },
}));

export default function TestePage() {
    
    const classes = useStyles();
    const [isCardSelected, setCardSelected] = useState("");
    const [isKumar, setKumar] = useState(false);
    const [isLawrence, setLawerence] = useState(false);
    const [isSinopsis, setSinopsis] = useState(false);
    const [listaselectiisubcat, setListaselectiisubcat] = useState([{}]);
    const [listaselectii, setListaselectii] = useState([]);
    const [countSelected, setCountSelected] = useState(0);
    const data=preData["lista_finala"];
    const listaCategorii = data; 
    // delay la grow in milisecunde
    const growTimeout = 700;

    useEffect(()=>{
        let lista_temp = [];
        let lista_temp2 = [];

        for (let i = 0; i < data.length; ++i) {
            const lista_temp_temp = [];
            for (let j = 0; j < data[i].subCategory.length; ++j)
                lista_temp_temp.push(false);
            lista_temp.push(lista_temp_temp);
            lista_temp2.push(false);
            }
            setListaselectiisubcat(lista_temp);
            setListaselectii(lista_temp2);
    },[data])

    const displayTestNou = ()=>{
        return(
            <>
                <Typography variant="h6" component="h6" className={classes.instructionsText}>
                    2. Selectează cărțile, capitolele și subcapitolele:
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
                            <Grow in={isKumar} timeout={growTimeout}>
                                <div className={classes.bookSubcatDiv}>
                                    <CategoryAcordion
                                    onClickCategorieMare={onClickCategorieMare}
                                    onClickSubCategorie={onClickSubCategorie}
                                    listaselectii={listaselectii}
                                    listaselectiisubcat={listaselectiisubcat}
                                    setListaselectii={setListaselectii}
                                    setListaselectiisubcat={setListaselectiisubcat}
                                    setCountSelected={setCountSelected}
                                    data={listaCategorii} 
                                    book="Kumar" 
                                    />
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
                            <Grow 
                            in={isLawrence}
                            timeout={growTimeout}
                            >
                                <div className={classes.bookSubcatDiv}>
                                    <CategoryAcordion
                                    onClickCategorieMare={onClickCategorieMare}
                                    onClickSubCategorie={onClickSubCategorie}
                                    listaselectii={listaselectii}
                                    listaselectiisubcat={listaselectiisubcat}
                                    setListaselectii={setListaselectii}
                                    setListaselectiisubcat={setListaselectiisubcat}
                                    setCountSelected={setCountSelected}
                                    data={listaCategorii} 
                                    book="Chirurgie" 
                                    />
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
                            <Grow in={isSinopsis} timeout={growTimeout}>
                                <div className={classes.bookSubcatDiv}>
                                    <CategoryAcordion
                                    onClickCategorieMare={onClickCategorieMare}
                                    onClickSubCategorie={onClickSubCategorie}
                                    listaselectii={listaselectii}
                                    listaselectiisubcat={listaselectiisubcat}
                                    setListaselectii={setListaselectii}
                                    setListaselectiisubcat={setListaselectiisubcat}
                                    setCountSelected={setCountSelected}
                                    data={listaCategorii} 
                                    book="Sinopsis" 
                                    />
                                </div>
                            </Grow>
                        }
                    </Grid>
                </Grid>
            </>
        );
    }
    
    const onClickCategorieMare = (i) => {
        const lista_temp_selectii = [...listaselectii];
        const lista_temporara_mare = [...listaselectiisubcat];
        const lista_temporara = [...listaselectiisubcat[i]];
        let count_temporar = 0;
        if (listaselectiisubcat[i].reduce((acc,value) => acc && value, true)) {
            for (let index = 0; index < listaselectiisubcat[i].length; index++) {
                lista_temporara[index] = false;
                count_temporar+=data[i]['subCategory'][index]['count'];
            }
            setCountSelected(countSelected-count_temporar);
            lista_temporara_mare[i] = lista_temporara;
            setListaselectiisubcat(lista_temporara_mare);
        }
        else {
            for (let index = 0; index < listaselectiisubcat[i].length; index++) {
                lista_temporara[index] = true;
                if(!listaselectiisubcat[i][index]){
                  count_temporar+=data[i]['subCategory'][index]['count'];
                }
            }
            setCountSelected(countSelected+count_temporar);
            lista_temporara_mare[i] = lista_temporara
            setListaselectiisubcat(lista_temporara_mare);
        }
        lista_temp_selectii[i] = !listaselectii[i];
        setListaselectii(lista_temp_selectii);
    }

    const onClickSubCategorie = (i, index) => {
        const lista_temporara_mare = [...listaselectiisubcat];
        const lista_temporara = [...listaselectiisubcat[i]];
        lista_temporara[index] = !lista_temporara[index];
        if(lista_temporara[index]){
          setCountSelected(countSelected+data[i]['subCategory'][index]['count']);
        }
        else{
          setCountSelected(countSelected-data[i]['subCategory'][index]['count']);
        }
        lista_temporara_mare[i] = lista_temporara;
        setListaselectiisubcat(lista_temporara_mare);
    }

    return(
        <div className={classes.root}>
            <Container maxWidth="lg" className={classes.containerPart}>

            <Typography variant="h6" component="h6" className={classes.instructionsText}>
                1. Selectează tipul testului pe care vrei să îl începi:
            </Typography>
                <Grid 
                className={classes.cardGrid}
                justify="center" 
                container 
                spacing={3} 
                id="testCard_div"
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
                    <Grow 
                    id="bookCard_div" 
                    in={isCardSelected === "Test nou"}
                    timeout={growTimeout}
                    >
                        <div>{displayTestNou()}</div>
                    </Grow>
                }
                {
                (isCardSelected === "Simulare") && 
                    <Grow 
                    id="bookCard_div" 
                    in={isCardSelected === "Simulare"}
                    timeout={growTimeout}
                    >
                    <Typography>
                        {isCardSelected}
                    </Typography>
                    </Grow>
                }
                {
                (isCardSelected === "Teste neterminate") && 
                    <Grow 
                    id="bookCard_div" 
                    in={isCardSelected === "Teste neterminate"}
                    timeout={growTimeout}
                    >
                    <Typography>
                        {isCardSelected}
                    </Typography>
                    </Grow>
                }
                {
                (isCardSelected === "Reparcurge greșeli") && 
                    <Grow 
                    id="bookCard_div" 
                    in={isCardSelected === "Reparcurge greșeli"}
                    timeout={growTimeout}
                    >
                    <Typography>
                        {isCardSelected}
                    </Typography>
                    </Grow>
                }
            </Container>
            { 
            countSelected !== 0 &&
            <Slide 
            in={(countSelected !== 0)} 
            direction= "up" 
            className={classes.footer}>
            <footer >
                <Container maxWidth="lg">
                <Grid 
                    container
                    direction="row"
                    justify="space-between"
                    spacing={4}
                >
                    <Grid className={classes.footerItem} item>
                        <Typography variant="h6"  gutterBottom>
                            Detaliile testului tau:
                        </Typography>
                        <Typography variant="p" component="p">
                            Tipul testului: {isCardSelected}
                        </Typography>
                        <Typography variant="p" component="p">
                            Număr total de grile: {countSelected}
                        </Typography>
                    </Grid>
                    <Grid container direction="column" className={classes.footerItem} item>
                        <Typography variant="h6"  gutterBottom>
                            Continut: 
                        </Typography>
                    </Grid>
                    <Grid className={classes.footerItem} item>
                        <Button className={classes.footerButton} color="secondary" variant="contained">
                            ReadySetGO!
                        </Button>
                    </Grid>
                </Grid>
                </Container>
            </footer>
            </Slide>
            }
        </div>
    );
}