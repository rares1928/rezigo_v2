import React, { useState, useEffect, useRef } from 'react';
import makeStyles from '@mui/styles/makeStyles';
import AnswerOptionCard from '../componente/answerOptionCard';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useLocation } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { callApi } from "../utils/callApi";
import ErrorPopup from '../componente/errorPopup';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Helmet } from 'react-helmet';
import AnswerOptionCardLegend from '../componente/answerOptionCardLegend';
import FinalizareTest from '../componente/finalizareTest';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


export default function GrilePage(props) {

    const [selectedQuestion, setNextQuestion] = useState(0);
    let isQuestionSelected = [false, false, false, false, false]
    const [isSelected, setIsSelected] = useState(isQuestionSelected);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [error, setError] = useState(0);
    const [isReady, setReady] = useState(false);
    const { state } = useLocation();
    const [showAnswer, setShowAnswer] = useState(localStorage.getItem("showAnswer") === "false" ? false : true);
    const [showReport, setShowReport] = useState(false);
    const [showLegend, setShowLegend] = useState(localStorage.getItem("showLegend") ==="false"? false: true );
    const [reportText, setReportText] = useState("");
    const [reportResponse, setReportResponse] = useState(0);
    const [testDone, setTestDone] = useState(false);
    // const [listaRandom, setListaRandom] = useState([0,1,2,3,4]);
    const [randomOrder, setRandomOrder] = useState(localStorage.getItem("randomOrder") === "false"? false : true );
    //const [darkMode, setDarkMode] = useState( localStorage.getItem("darkMode") === "false"? false: true);
    
    
    let history= useHistory();

    const randomCompare = (a ,b) => {
        const coin = Math.random();
        if(coin >= 0.5 ){
            return a-b;
        }
        else{
        return b-a;
        }
    }

    const listaAranjata = [0,1,2,3,4];
    // useRef il face sa tina minte listaRandom initiala si nu se re-randomizeaza la fiecare apasare de buton
    const listaRandom = useRef(listaAranjata.sort(randomCompare));

    const handleItems = (e) => {
        setItems(e.data["lista"]);
        setReady(true);
    };

    const handleResponse = (e) => {
        setReportResponse(e.status);
    };

    const handleError = (e) => {
        setError(e);
    };
    
    useEffect(() => {
        const testId = state.testId;
        if(!testId){
            history.push("/creeaza-ti_test")
        }else{
        const cookies = new Cookies();
        const rememberMe = cookies.get('rememberMe');
        callApi('https://grileapiwin.azurewebsites.net/api/GetGrileWin?code=PrwHilYKYJLV46PoT12sMacgZkpYr7XsWKrjeZF3Hc9aSIZSqnsipQ==', { rememberMe, testId }, handleItems, handleError)
        }
    }, [history, state])

    const handleNextQuestion = () => {
        if(!(selectedQuestion + 1 === items.length)){
            const nextQuestion = selectedQuestion + 1;
            setNextQuestion(nextQuestion);
            setIsSelected(isQuestionSelected);
        }
    };

    const handlePreviousQuestion = () => {
        if (selectedQuestion > 0) {
            const previousQuestion = selectedQuestion - 1;
            setNextQuestion(previousQuestion);
            setIsSelected(isQuestionSelected);
        }
    };

    const handleQuestionSelection = (index) => {
        const temporaryList = isSelected
        temporaryList[index] = !temporaryList[index];
        setIsSelected([...temporaryList]);
    }
    const handleSliderChange = (_event, newValue) => {
        setIsSelected(isQuestionSelected);
        setNextQuestion(newValue - 1);
    };

    const baza2Converter = (numar, pozitie) => {
        return (parseInt(numar / Math.pow(2, 4 - pozitie)) % 2)
    }

    const trimiteRaspuns = (listaRaspunsuri, currentQuestion) => {
        const cookies = new Cookies();
        const rememberMe = cookies.get('rememberMe');
        const testId = state.testId;

        if (items[selectedQuestion]["Choices"] === 0) {
            let choice = 0;
            let tempItems = items;
            let correct = 0;

            for (let i = 0; i < listaRaspunsuri.length; i++) {
                choice += listaRaspunsuri[i] * Math.pow(2, 4 - i);
                if ((listaRaspunsuri[i] === true && items[currentQuestion]['Raspunsuri'][i] === 1) || (listaRaspunsuri[i] === false && items[currentQuestion]['Raspunsuri'][i] === 0)) {
                    correct += Math.pow(2, 4 - i);
                }
            }
            tempItems[currentQuestion]["Choices"] = choice;
            tempItems[currentQuestion]["Correct"] = correct;

            const grilaId = items[currentQuestion]["GrilaID"];
            let final_question = false;
            let scorReziTestPosibil = 0;
            let scorReziTestObtinut = 0;
            if (currentQuestion === items.length - 1) {
                final_question = true
                scorReziTestPosibil = items.reduce((acc, val) => calculeazaScorPosibil(acc, val), 0);
                scorReziTestObtinut = items.reduce((acc, val) => calculeazaScorAcumulat(acc, val), 0);
            }

            const scorReziPosibilGrila = calculeazaScorPosibil(0, items[currentQuestion]);
            const scorReziObtinutGrila = calculeazaScorAcumulat(0, items[currentQuestion]);


            let url = 'https://grileapiwin.azurewebsites.net/api/UpdateQuestionWin?code=/exISg8MBjNHTzNt8dNAonkeqzYsV5Imgh5naOgP/7aPdlR06NS2xw==';
            let data = { testId, rememberMe, grilaId, choice, correct, final_question, scorReziPosibilGrila, scorReziObtinutGrila };
            if(final_question){
                data = {...data, scorReziTestObtinut, scorReziTestPosibil}
            }
            callApi(url, data, () => { }, handleError);
            setItems(tempItems.slice());
        }
        else {
            handleNextQuestion();
        }
    }

    
    const sendReport = async () => {
        if(reportText.length >1 ){
            setLoading(true);
            const data = {
                grilaId: items[selectedQuestion]["GrilaID"],
                report: reportText,
            };
            const url = "https://grileapiwin.azurewebsites.net/api/ReportGrila?code=aEvkH5jiGEsHUPt0/rAePmAtmihgiOuSs3JFZ1JWU2aCTIxTfBDVcg=="
            await callApi(url, data, handleResponse, handleError);
            setLoading(false);
            setShowReport(false);
        }
    }


    const useStyles = makeStyles((theme) => ({

        paper: {
            padding: theme.spacing(2),
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(4),
        },
        smallPaper: {
            padding: theme.spacing(2),
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
        },
        questionDetails: {
            paddingTop: theme.spacing(3),
            padding: theme.spacing(1),
            paddingBottom: theme.spacing(2),
        },
        question: {
            paddingLeft: theme.spacing(1),
            paddingBottom: theme.spacing(0.5),
        },
        cardVariante: {
            display: "flex",
            flexDirection: "row",
            marginBottom: theme.spacing(0.5),
        },
        butonDiv: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: theme.spacing(3),
            justifyContent: "space-between",
        },
        paperDivRandomOrder: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginTop: theme.spacing(3),
            marginLeft: theme.spacing(2),
            marginRight: theme.spacing(2),
            justifyContent: "space-between",
        },
        slider: {
            marginTop: theme.spacing(3),
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
        },
        paperStatistics :{
            marginBottom: theme.spacing(3),
        },
        buttonReport:{
            marginBottom: theme.spacing(2),
            marginRight: theme.spacing(1),
        },
        textFiled:{
            margin: theme.spacing(1),
            marginBottom: theme.spacing(2),
            paddingRight: theme.spacing(2),    
        },
        textReport:{
            padding: theme.spacing(1),
        },
        reportButtonDiv:{
            display: "flex",
            width: "100%",
            justifyContent: "flex-end",
            
        },
        legendaImg:{
            margin: 2,
            marginLeft: 8,
        },
        enuntSpaceDiv:{
            display: "flex",
            justifyContent: "space-between",
        },
        rezolvareDiv: {
            display: "flex",
            justifyContent: "center",
            minWidth: theme.spacing(8),
        },

    }));
    const classes = useStyles();

    const handleCloseAlert = () => {
        setReportResponse(0);
      };
    const TITLE = 'Rezolvă testul';
    const calculeazaScorAcumulat = (acc, value) => {
        if(value["TipGrile"] === "CS"){
            if(value["Correct"] === 31){
                return acc + 4;
            }else{
                return acc;
            }
        }else{
            if(value["Correct"] === 31){
                return acc + 5;
            }
            if([15, 23, 27, 29, 30].includes(value["Correct"])){
                return acc + 4;
            }
            if([7, 11, 13, 19, 21, 25, 14, 22, 26, 28].includes(value["Correct"])){
                return acc + 3;
            }
            if([3, 5, 9, 17, 6, 10, 18, 12, 20, 24].includes(value["Correct"])){
                return acc + 2;
            }
            if([1, 23, 4, 8, 16].includes(value["Correct"])){
                return acc + 1;
            }
            if(value["Correct"] === 0){
                return acc;
            }

        }
    }
    const calculeazaScorPosibil = (acc, value) => {
        if(value["TipGrile"] === "CS"){
            return acc + 4;
        }else{
            return acc + 5;
        }
    }

    return <>
    <ErrorPopup errorStatus={error} />
    <Helmet>
        <title>{ TITLE }</title>
    </Helmet>

    <Snackbar open={reportResponse === 200} autoHideDuration={3000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="success">
            <Typography>
                Raportul tău a fost trimis cu succes!
            </Typography>
        </Alert>
    </Snackbar>

    {testDone? 
        <>
            <FinalizareTest 
                testDone={testDone}
                setTestDone={setTestDone}
                resultScor={items.reduce((acc, val) => calculeazaScorAcumulat(acc, val), 0)}
                scorPosibil={items.reduce((acc, val) => calculeazaScorPosibil(acc, val), 0)}
                raspunsuriCorecte={items.reduce((acc, val) => acc + (val["Correct"] === 31), 0)}
                numarIntrebari={items.length}
                numQuestions={items.length}
                questions={items}
                darkMode={props.darkMode}
                baza2Converter={baza2Converter}
            />
        </> :
        <Container maxWidth="lg">
        {   !isReady? <CircularProgress/> :
            <Grid >
                <Grid item >
                    <Paper className={classes.paper}>
                        <div className={classes.slider}>
                            <IconButton
                                onClick={handlePreviousQuestion}
                                disabled={selectedQuestion === 0 ? true : false}
                                size="large">

                                <ChevronLeftIcon />
                            </IconButton>

                            <Slider
                                onChange={handleSliderChange}
                                value={selectedQuestion + 1}
                                marks
                                step={1}
                                min={1}
                                max={items.length}
                                valueLabelDisplay="auto"
                                color="secondary"
                            >
                            </Slider>
                            <IconButton
                                onClick={handleNextQuestion}
                                disabled={selectedQuestion + 1 === items.length ? true : false}
                                size="large">
                                <ChevronRightIcon />
                            </IconButton>
                        </div>
                        <div className={classes.questionDetails}>
                            <Typography  variant="body2" color="textSecondary">
                                Tip Grilă: {items[selectedQuestion]["TipGrile"]};
                            </Typography>
                            {items[selectedQuestion]["Carte"] === "Rezidențiat 2021" ?
                                <Typography variant="body2" color="textSecondary">
                                    Examen {items[selectedQuestion]["Carte"]}; 
                                </Typography> :
                                <Typography variant="body2" color="textSecondary">
                                    Carte {items[selectedQuestion]["Carte"]}; 
                                </Typography>
                                }
                            {items[selectedQuestion]["Carte"] === "Rezidențiat 2021" ?
                                null :
                                <Typography variant="body2" color="textSecondary">
                                    Capitol: {items[selectedQuestion]["Categorie"]}; Subcapitol: {items[selectedQuestion]["SubCategorie"]}
                                </Typography>}
                        </div>
                        <div className={classes.enuntSpaceDiv}>
                            <div className="grileQuestionTypography">    
                                <Typography className={classes.question} variant="subtitle1">
                                    {selectedQuestion + 1}. {items[selectedQuestion]['Intrebare']}
                                </Typography>
                            </div>
                            <Typography className={classes.rezolvareDiv} color="textSecondary">
                                Barem
                            </Typography>
                        </div>
                        <div>
                            { !randomOrder? items[selectedQuestion]['Variante'].map((answerOption, index) => (
                                <AnswerOptionCard
                                    key={`subcapitol_${items[selectedQuestion]["SubCategorie"]}_intrebare_${selectedQuestion+1}_varianta_${index}`}
                                    index={index}
                                    indexVechi = {index}
                                    answerOption={answerOption}
                                    darkMode={props.darkMode}
                                    handleQuestionSelection={handleQuestionSelection}
                                    baza2Converter={baza2Converter}
                                    items={items}
                                    isSelected={isSelected}
                                    selectedQuestion={selectedQuestion}
                                    showAnswer={showAnswer}
                                />
                            )) :

                            listaRandom.current.map((answerOption, index) => (
                                <AnswerOptionCard
                                    key={`subcapitol_${items[selectedQuestion]["SubCategorie"]}_intrebare_${selectedQuestion+1}_varianta_${answerOption}`}
                                    index = {answerOption}
                                    indexVechi = {index}
                                    answerOption={answerOption}
                                    darkMode={props.darkMode}
                                    handleQuestionSelection={handleQuestionSelection}
                                    baza2Converter={baza2Converter}
                                    items={items}
                                    isSelected={isSelected}
                                    selectedQuestion={selectedQuestion}
                                    showAnswer={showAnswer}
                                />
                            ))
                            
                            }
                        </div>
                        <div className={classes.butonDiv}>
                            <div></div>
                            {showAnswer &&
                                <Typography>
                                    Punctajul obținut pe această grilă: {calculeazaScorAcumulat(0, items[selectedQuestion])} /{calculeazaScorPosibil(0, items[selectedQuestion])}
                                </Typography>
                            }
                        </div>

                        <div className={classes.butonDiv}>
                            <Button 
                            variant="contained" 
                            color="secondary" 
                            onClick={() => trimiteRaspuns(isSelected, selectedQuestion)} 
                            disabled={((isSelected.reduce((a, b) => a + b, 0)) === 0  && items[selectedQuestion]["Choices"] === 0) || ((isSelected.reduce((a, b) => a + b, 0)) === 5  && items[selectedQuestion]["Choices"] === 0) }>
                                {
                                    (items[selectedQuestion]["Choices"] === 0) &&
                                    <Typography>
                                        Trimite răspuns
                                    </Typography>
                                }
                                {
                                    (items[selectedQuestion]["Choices"] > 0) && 
                                    <Typography>
                                        Următoarea grilă
                                    </Typography>
                                }
                            </Button>
                            <Button
                            disabled={!(items.every((question) => (question['Choices'] > 0) ))}
                            variant="contained" color="primary" onClick={()=>{setTestDone(true)}}>
                                <Typography>
                                    Finalizează testul
                                </Typography>
                            </Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item>
                    <Paper className={classes.paperStatistics}>
                        <div className={classes.paperDivRandomOrder} >
                            <div>
                            <Typography >
                                Ordinea variantelor de răspuns aleatoare.
                            </Typography>
                            <Typography>
                                Dacă selectezi această opțiune, de fiecare dată când selectezi un test, 
                                ordinea variantelor de răspuns va fi diferită. 
                                În felul acesta, dacă parcurgi aceeași grilă în două teste diferite, este posibil ca varianta corectă să apară prima dată la punctul a) și a doua oară la punctul d).
                            </Typography>
                            </div>
                            <Switch color="secondary" checked={randomOrder} onChange={() => {localStorage.setItem("randomOrder", !randomOrder); setRandomOrder(!randomOrder)}}/>
                        </div>
                    </Paper>
                </Grid>
                <Grid item >
                    <Paper className={classes.paperStatistics}>
                        <Grid container justifyContent="space-evenly">
                            <Grid item className={classes.statisticSubdiv}>
                                <div className={classes.smallPaper}>
                                    <Typography>Afișează răspunsurile</Typography>
                                    <Switch color="secondary" checked={showAnswer} onChange={()=>{localStorage.setItem("showAnswer", !showAnswer); setShowAnswer(!showAnswer)}} />
                                </div>
                            </Grid>
                            <Grid item className={classes.statisticSubdiv}>
                                <div className={classes.smallPaper}>
                                    <Typography>Răspunsuri date</Typography>
                                    <Typography>{items.reduce((acc, val) => acc + (val["Choices"] > 0), 0)}/{items.length}</Typography>
                                </div>
                            </Grid>
                            <Grid item className={classes.statisticSubdiv}>
                                <div className={classes.smallPaper}>
                                    <Typography>Răspunsuri corecte</Typography>
                                <Typography>{items.reduce((acc, val) => acc + (val["Correct"] === 31), 0)}/{items.length}</Typography>
                                </div>
                            </Grid>
                            <Grid item className={classes.statisticSubdiv}>
                                <div className={classes.smallPaper}>
                                    <Typography>Răspunsuri greșite</Typography>
                                <Typography>{items.reduce((acc, val) => acc + (val["Correct"] !== 31 && val["Choices"] > 0), 0)}/{items.length}</Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Button
                        onClick={() => {localStorage.setItem("showLegend", !showLegend); setShowLegend(!showLegend)}}  
                        variant="contained" 
                        color="primary" 
                        className={classes.buttonReport}>
                            <Typography>
                                {showLegend? "Închide legenda" : "Deschide legenda"}
                            </Typography>
                    </Button>
                    <Button
                    onClick={() => setShowReport(!showReport)}  
                    variant="contained" 
                    color="primary" 
                    className={classes.buttonReport}>
                        <Typography>
                            Raportează grila
                        </Typography>
                    </Button>
                    {   
                        showLegend?
                        <Paper className={classes.paperStatistics}>
                            <AnswerOptionCardLegend
                                isSelected = {true}
                                darkMode = {props.darkMode}
                                answerOption = "Grilă selectată ce trebuia selectată"
                                isCorrect = {1}
                                color ="#56DB57" //green
                            />
                            <AnswerOptionCardLegend
                                isSelected = {false}
                                darkMode = {props.darkMode}
                                answerOption = "Grilă neselectată ce trebuia selectată"
                                isCorrect = {1}
                                color = "#EB91B1" //pink
                            />
                            <AnswerOptionCardLegend
                                isSelected = {true}
                                darkMode = {props.darkMode}
                                answerOption = "Grilă selectată ce nu trebuia selectată"
                                isCorrect = {0}
                                color = {props.darkMode? "#bfbfbf" : "#7d7d7d"} //grey or whiteish
                            />
                            <AnswerOptionCardLegend
                                isSelected = {false}
                                darkMode = {props.darkMode}
                                answerOption = "Grilă neselectată ce nu trebuia selectată"
                                isCorrect = {0}
                                color = '' //nema
                            />
                        </Paper> : null
                    }
                    {showReport ?
                    <Paper className={classes.paperStatistics}>
                        <Typography className={classes.textReport}>
                            Scrie mai jos motivul pentru care consideri că grila este greșită:
                        </Typography>
                        <TextField
                            className={classes.textFiled}
                            id="outlined-multiline-static"
                            label={"Număr de caractere: ".concat(" ", reportText.length.toString(), "/500")}
                            multiline
                            error={reportText.length>500}
                            rows={4}
                            variant="outlined"
                            fullWidth
                            onInput={e => setReportText(e.target.value)}
                            required
                        />
                        <div className={classes.reportButtonDiv}>
                            <Button
                                onClick={() => sendReport()}  
                                variant="contained" 
                                color="primary" 
                                className={classes.buttonReport}
                                disabled={reportText.length <=1 }
                            >
                            {loading? <CircularProgress color="secondary" /> :
                                <Typography>
                                    Trimite raportul
                                </Typography>}
                            </Button>
                        </div>
                    </Paper> : null
                    }
                </Grid>
            </Grid>
        }
    </Container>}
    </>;
}