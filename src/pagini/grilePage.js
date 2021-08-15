import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AnswerOptionCard from '../componente/answerOptionCard';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import Switch from '@material-ui/core/Switch';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useLocation } from 'react-router-dom'
import Cookies from 'universal-cookie';
import { callApi } from "../utils/callApi";
import ErrorPopup from '../componente/errorPopup';
import { useHistory } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Helmet } from 'react-helmet';
import legendaDark from '../poze/legenda_dark2.png';
import legendaLight from '../poze/legenda_light2.png';

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
    const [showAnswer, setShowAnswer] = useState(true);
    const [showReport, setShowReport] = useState(false);
    const [showLegend, setShowLegend] = useState(false);
    const [reportText, setReportText] = useState("");
    const [reportResponse, setReportResponse] = useState(0);
    
    
    let history= useHistory();

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
        const testId = state;
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
        const testId = state;

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
            if (currentQuestion === items.length - 1) {
                final_question = true
            }

            callApi('https://grileapiwin.azurewebsites.net/api/UpdateQuestionWin?code=/exISg8MBjNHTzNt8dNAonkeqzYsV5Imgh5naOgP/7aPdlR06NS2xw==', { testId, rememberMe, grilaId, choice, correct, final_question }, () => { }, handleError);
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
            marginTop: theme.spacing(3),
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

    }));
    const classes = useStyles();

    const handleCloseAlert = () => {
        setReportResponse(0);
      };
    
    const TITLE = 'Rezolvă testul';

    return (
        <>
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

        <Container maxWidth="lg">
            {   !isReady? <CircularProgress/> :
                <Grid direction="row" spacing={1} >
                    <Grid item >
                        <Paper className={classes.paper}>
                            <div className={classes.slider}>
                                <IconButton
                                    onClick={handlePreviousQuestion}
                                    disabled={selectedQuestion === 0 ? true : false}
                                >

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
                                >
                                    <ChevronRightIcon />
                                </IconButton>
                            </div>
                            
                                <Typography className={classes.questionDetails} variant="body2" color="textSecondary">
                                    Tip Grilă: {items[selectedQuestion]["TipGrile"]}; Capitol: {items[selectedQuestion]["Categorie"]}; Subcapitol: {items[selectedQuestion]["SubCategorie"]}
                                </Typography>
                            <div className="grileQuestionTypography">    
                                <Typography className={classes.question} variant="subtitle1">
                                    {selectedQuestion + 1}. {items[selectedQuestion]['Intrebare']}
                                </Typography>
                            </div>
                            <div>
                                {items[selectedQuestion]['Variante'].map((answerOption, index) => (
                                    <AnswerOptionCard
                                        key={`subcapitol_${items[selectedQuestion]["SubCategorie"]}_intrebare_${selectedQuestion+1}_varianta_${index}`}
                                        index={index}
                                        answerOption={answerOption}
                                        darkMode={props.darkMode}
                                        handleQuestionSelection={handleQuestionSelection}
                                        baza2Converter={baza2Converter}
                                        items={items}
                                        isSelected={isSelected}
                                        selectedQuestion={selectedQuestion}
                                        showAnswer={showAnswer}
                                    />
                                ))}
                            </div>
                            <div className={classes.butonDiv}>
                                <Button 
                                variant="contained" 
                                color="secondary" 
                                onClick={() => trimiteRaspuns(isSelected, selectedQuestion)} 
                                disabled={((isSelected.reduce((a, b) => a + b, 0)) === 0 && items[selectedQuestion]["Choices"] === 0) }>
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
                                <Button variant="contained" color="primary">
                                    <Typography>
                                        Finalizează testul
                                    </Typography>
                                </Button>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item >
                        <Paper className={classes.paperStatistics}>
                            <Grid container justify="space-evenly">
                                <Grid item className={classes.statisticSubdiv}>
                                    <div className={classes.smallPaper}>
                                        <Typography>Afișează răspunsurile</Typography>
                                        <Switch checked={showAnswer} onChange={()=>{setShowAnswer(!showAnswer)}} />
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
                            onClick={() => setShowLegend(!showLegend)}  
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
                                <img alt = "legend" src={props.darkMode? legendaDark : legendaLight } className={classes.legendaImg} />
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
        </Container>
        </>
    );
}