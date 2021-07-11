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



export default function GrilePage(props) {

    const [selectedQuestion, setNextQuestion] = useState(0);
    let isQuestionSelected = [false, false, false, false, false]
    const [isSelected, setIsSelected] = useState(isQuestionSelected);
    const [items, setItems] = useState([]);
    const [isReady, setReady] = useState(false);
    const { state } = useLocation()
    const testId = state;

    const handleItems = (e) => {
        console.log(e)
        setItems(e);
        setReady(true);
    };

    useEffect(() => {
        const cookies = new Cookies();
        const rememberMe = cookies.get('rememberMe');
        callApi('https://grileapiwin.azurewebsites.net/api/GetGrileWin?code=PrwHilYKYJLV46PoT12sMacgZkpYr7XsWKrjeZF3Hc9aSIZSqnsipQ==', { rememberMe, testId }, handleItems)
    }, [testId])

    const handleNextQuestion = () => {
        const nextQuestion = selectedQuestion + 1;
        setNextQuestion(nextQuestion);
        setIsSelected(isQuestionSelected);
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
        setNextQuestion(newValue - 1);
    };

    const baza2Converter = (numar, pozitie) => {
        return (parseInt(numar / Math.pow(2, 4 - pozitie)) % 2)
    }

    const trimiteRaspuns = (listaRaspunsuri, currentQuestion) => {
        const cookies = new Cookies();
        const rememberMe = cookies.get('rememberMe');

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

            callApi('https://grileapiwin.azurewebsites.net/api/UpdateQuestionWin?code=/exISg8MBjNHTzNt8dNAonkeqzYsV5Imgh5naOgP/7aPdlR06NS2xw==', { testId, rememberMe, grilaId, choice, correct, final_question }, () => { });
            setItems(tempItems.slice());
        }
        else {
            handleNextQuestion();
        }
    }

    const getIntrebariCorecte = () => {
        let count = 0;
        items.forEach(element => { if (element["Correct"] > 0) { ++count } })
        return count;
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
        question: {
            paddingTop: theme.spacing(3),
            padding: theme.spacing(1),
            paddingBottom: theme.spacing(3),
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

    }));
    const classes = useStyles();
    return (
        <Container maxWidth="lg">
            {isReady &&
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
                                >
                                </Slider>
                                <IconButton
                                    onClick={handleNextQuestion}
                                    disabled={selectedQuestion + 1 === items.length ? true : false}
                                >
                                    <ChevronRightIcon />
                                </IconButton>
                            </div>
                            <div className={classes.question}>
                                <Typography variant="body2" color="textSecondary">
                                    Capitol: {items[selectedQuestion]["Categorie"]}; Subcapitol: {items[selectedQuestion]["SubCategorie"]}
                                </Typography>
                                <Typography variant="subtitle1" className="grileQuestionTypography">
                                    {selectedQuestion + 1}. {items[selectedQuestion]['Intrebare']}
                                </Typography>
                            </div>
                            <div>
                                {items[selectedQuestion]['Variante'].map((answerOption, index) => (
                                    <AnswerOptionCard
                                        key={index}
                                        index={index}
                                        answerOption={answerOption}
                                        darkMode={props.darkMode}
                                        handleQuestionSelection={handleQuestionSelection}
                                        baza2Converter={baza2Converter}
                                        items={items}
                                        isSelected={isSelected}
                                        selectedQuestion={selectedQuestion}
                                    />
                                ))}
                            </div>
                            <div className={classes.butonDiv}>
                                <Button variant="contained" color="secondary" onClick={() => trimiteRaspuns(isSelected, selectedQuestion)} disabled={(isSelected.reduce((a, b) => a + b, 0)) === 0 && items[selectedQuestion]["Choices"] === 0}>
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
                        <Paper>
                            <Grid container justify="space-evenly">
                                <Grid item className={classes.statisticSubdiv}>
                                    <div className={classes.smallPaper}>
                                        <Typography>Afișează răspunsurile</Typography>
                                        <Switch />
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
                    </Grid>
                </Grid>
            }
        </Container>
    );
}