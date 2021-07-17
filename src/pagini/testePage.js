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
import Button from "@material-ui/core/Button";
import Slide from "@material-ui/core/Slide";
import DataTable from "../componente/tabel";
import Cookies from 'universal-cookie';
import { callApi } from "../utils/callApi";
import { useHistory } from 'react-router-dom';
import ErrorPopup from '../componente/errorPopup';
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: "calc(100vh - calc(8 * 8px))",
        display: "flex",
        flexDirection: "column",
    },
    containerPart: {
        flex: 1,
    },
    cardGrid: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    instructionsText: {
        padding: theme.spacing(2, 0, 0)
    },
    bookDiv: {
        marginBottom: theme.spacing(11),

    },
    bookLevel: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        minWidth: 340,
        maxWidth: 389,

    },
    bookSubcatDiv: {
        marginTop: theme.spacing(2),
    },
    footer: {
        backgroundColor: theme.palette.primary.main,
        width: "100%",
        padding: theme.spacing(1),
        paddingBottom: "2.5vh",
        paddingTop: "2.5vh",
        position: "fixed",
        bottom: 0,
    },
    footerItem: {
        maxWidth: 300,
    },
    footerButton: {
        padding: theme.spacing(1.5),
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
    const [ready, setReady] = useState(false);
    const [listaCategorii, setListaCategorii] = useState([])
    const [listatTesteNeterm, setListaTesteNeterm] = useState([])
    const [error, setError] = useState(0);
    const [goLoading, setGoLoading] = useState(false);
    
    // delay la grow in milisecunde
    const growTimeout = 700;
    let history = useHistory();

    const handleError = (e) => {
        setError(e);
    }

    const handleCategorii = (e) => {
        setListaCategorii(e.data["lista"]);
    };

    const handleTeste = (e) => {
        setListaTesteNeterm(e.data["lista"]);
    };

    const handleTestId = (testId) => {
        return(history.push({ pathname: "/rezolva_test", state: testId }));
    };

    const handleTestIdNou = (testId) => {
        return(history.push({ pathname: "/rezolva_test", state: testId.data["lista"] }));
    };

    const callApiTestNeterminat = () => {
        const cookies = new Cookies();
        const rememberMe = cookies.get('rememberMe');
        callApi('https://grileapiwin.azurewebsites.net/api/ReturnTestWin?code=a4f9SUIh9j7zkFgmFTeGjiDgWCURrkcaj3uaLWUpoGnTQ/aCJKBkjQ==', { rememberMe }, handleTeste, handleError);
    }

    useEffect(() => {
        const cookies = new Cookies();
        const rememberMe = cookies.get('rememberMe');

        if (ready === false) {
            callApi('https://grileapiwin.azurewebsites.net/api/GetCategoriiWin?code=2PyRLKAmFmY9m2QCC2t3iRuMRwDF58dxkyYavc/eFowHS44pFQgrqA==', { rememberMe }, handleCategorii, handleError);
            setReady(true);
        }

        let lista_temp = [];
        let lista_temp2 = [];

        for (let i = 0; i < listaCategorii.length; ++i) {
            const lista_temp_temp = [];
            for (let j = 0; j < listaCategorii[i].subCategory.length; ++j) {
                lista_temp_temp.push(0);
            }
            lista_temp.push(lista_temp_temp);
            lista_temp2.push(false);
        }
        setListaselectiisubcat(lista_temp);
        setListaselectii(lista_temp2);
    }, [listaCategorii, ready])

    const deleteTest = async (testId) => {
        const cookies = new Cookies();
        const rememberMe = cookies.get('rememberMe');
        await callApi('https://grileapiwin.azurewebsites.net/api/DeleteTestWin?code=E756BkprUyE3sBtZAU8ltkrwRebaSickMOE3NXaIv3cn3Ls8zNYQiA==', { rememberMe, testId }, () => { }, handleError);        
        await callApi('https://grileapiwin.azurewebsites.net/api/ReturnTestWin?code=a4f9SUIh9j7zkFgmFTeGjiDgWCURrkcaj3uaLWUpoGnTQ/aCJKBkjQ==', { rememberMe }, handleTeste, handleError);
    }

    const creeazaTest = async () => {
        setGoLoading(true);
        const cookies = new Cookies();
        const rememberMe = cookies.get('rememberMe');
        const lista_categorii = [];
        for (let i = 0; i < listaselectii.length; i++) {
            for (let j = 0; j < listaselectiisubcat[i].length; j++) {
                if (listaselectiisubcat[i][j] > 0) {
                    lista_categorii.push({
                        nume_categorie: listaCategorii[i]['category_Name'],
                        nume_subcategorie: listaCategorii[i]['subCategory'][j]['name'],
                        numar: listaselectiisubcat[i][j]
                    })
                }
            }
        }
        await callApi('https://grileapiwin.azurewebsites.net/api/CreateTestWin?code=UWWieYZbXJombLLaR12BaLqCxfdBbHEz84QWnVaE/ZCVyCm2Fi9nvg==', { rememberMe, lista_categorii }, handleTestIdNou, handleError)
        setGoLoading(false);
    }

    const displayTestNou = () => {
        return (
            <>
            {!ready? <CircularProgress/> :
                <div className={classes.bookDiv}>
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
                            isSelected={isKumar}
                            setCardSelected={setKumar}
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
                                        data={listaCategorii}
                                        book="Kumar"
                                    />
                                </div>
                            </Grow>
                        }
                    </Grid>
                    <Grid item className={classes.bookLevel}>
                        <TestsBookCard
                            isSelected={isLawrence}
                            setCardSelected={setLawerence}
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

                                        data={listaCategorii}
                                        book="Chirurgie"
                                    />
                                </div>
                            </Grow>
                        }
                    </Grid>
                    <Grid item className={classes.bookLevel}>
                        <TestsBookCard
                            isSelected={isSinopsis}
                            setCardSelected={setSinopsis}
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

                                        data={listaCategorii}
                                        book="Sinopsis"
                                    />
                                </div>
                            </Grow>
                        }
                    </Grid>
                </Grid>
            </div>}
            </>
        );
    }

    const displayTestNeterminat = () => {
        return (
            <>
            {!ready? <CircularProgress/> :
            <div>
                <Typography variant="h6" component="h6" className={classes.instructionsText} >
                    2. Selectează testul pe care dorești să îl continui:
                </Typography>
                <div>
                    {
                        <DataTable rows={listatTesteNeterm} onDelete={(id) => deleteTest(id) } onClick={(id) => handleTestId(id)} />
                    }
                </div>
            </div>}
            </>
        )
    }

    const onClickCategorieMare = (i) => {
        const lista_temp_selectii = [...listaselectii];
        const lista_temporara_mare = [...listaselectiisubcat];
        const lista_temporara = [...listaselectiisubcat[i]];
        if (listaselectiisubcat[i].reduce((acc, value) => acc + value, 0) === listaCategorii[i].subCategory.reduce((acc, subcat) => acc + subcat.Count, 0)) {
            for (let index = 0; index < listaselectiisubcat[i].length; index++) {
                lista_temporara[index] = 0;
            }
            lista_temporara_mare[i] = lista_temporara;
            setListaselectiisubcat(lista_temporara_mare);
        }
        else {
            for (let index = 0; index < listaselectiisubcat[i].length; index++) {
                lista_temporara[index] = listaCategorii[i].subCategory[index].Count;
            }
            lista_temporara_mare[i] = lista_temporara
            setListaselectiisubcat(lista_temporara_mare);
        }
        lista_temp_selectii[i] = !listaselectii[i];
        setListaselectii(lista_temp_selectii);
    }

    const onClickSubCategorie = (i, index, click = true, numGrile ) => {
        const lista_temporara_mare = [...listaselectiisubcat];
        const lista_temporara = [...listaselectiisubcat[i]];
        if (click) {
            if (lista_temporara[index] > 0) {
                lista_temporara[index] = 0;
            }
            else{
                lista_temporara[index] = listaCategorii[i].subCategory[index].Count;
            }
        }
        else {
            lista_temporara[index] = numGrile;
        }
        lista_temporara_mare[i] = lista_temporara;
        setListaselectiisubcat(lista_temporara_mare);
    }

    const sumaElemArr = (array) => {
        return array.reduce((acc, subArray) => acc + subArray.reduce((subAcc, value) => subAcc + value, 0), 0);
    }

    return (
        <div className={classes.root}>
            <ErrorPopup errorStatus={error} />
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
                            isSelected={isCardSelected === "Test nou"}
                            setCardSelected={setCardSelected}
                            imagine={testNouImg}
                            title="Test nou"
                            text="Selectează subcapitolele din care dorești grilele."
                            ready={ready}
                        />
                    </Grid>
                    <Grid item>
                        <TestsCard
                            isSelected={isCardSelected === "Simulare"}
                            setCardSelected={setCardSelected}
                            imagine={simulareImg}
                            title="Simulare"
                            text="50 de întrebări cu CS și 150 de întrebări cu CM."
                        />
                    </Grid>
                    <Grid item>
                        <TestsCard
                            isSelected={isCardSelected === "Teste neterminate"}
                            setCardSelected={setCardSelected}
                            imagine={testNeterminatImg}
                            title="Teste neterminate"
                            text="Selectează unul dintre testele neterminate pe care vrei să le continui."
                            onClick={callApiTestNeterminat}
                        />
                    </Grid>
                    <Grid item>
                        <TestsCard
                            isSelected={isCardSelected === "Reparcurge greșeli"}
                            setCardSelected={setCardSelected}
                            imagine={reparcurgeGreseliImg}
                            title="Reparcurge greșeli"
                            text="Selectează subcapitolele din care ai greșeli pentru a-ți acoperi golurile."
                        />
                    </Grid>
                </Grid>
                <div id="as vrea sa scrolez aici"></div>
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
        
                        <div>{displayTestNeterminat()}</div>
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
            {ready &&
            <>
            {
            sumaElemArr(listaselectiisubcat) !== 0 &&
            <Slide 
            in={(sumaElemArr(listaselectiisubcat)) > 0} 
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
                        
                        <Typography variant="subtitle2" component="p">
                            Tip test: {isCardSelected}
                        </Typography>
                        <Typography variant="subtitle2" component="p">
                            Număr de grile: {sumaElemArr(listaselectiisubcat)}
                        </Typography>
                    </Grid>
                    <Grid className={classes.footerItem} item>
                        <Button 
                        className={classes.footerButton} 
                        color="secondary" variant="contained" 
                        disabled={goLoading}
                        onClick={() => creeazaTest()} >
                            {goLoading? <CircularProgress color="primary" size={25} /> :
                            <Typography >
                                Ready Set GO!
                            </Typography>}
                        </Button>
                    </Grid>
                </Grid>
                </Container>
            </footer>
            </Slide>
            }
            </>
            }
        </div>
    );
}