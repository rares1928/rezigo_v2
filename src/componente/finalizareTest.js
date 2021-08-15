import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import AnswerOptionFinal from './answerOptionFinal';


export default function FinalizareTest(props) {
    const useStyles = makeStyles((theme) => ({
        root:{
            width:"100%",
        },
        checkIcon:{
            color: theme.palette.success.main,
        },
        accordionSummary:{
        },
        answerOptionsDiv:{
            display:"flex",
            flexDirection:"column",
        },
    }));

    const classes = useStyles();
    return(
        <Dialog
            open={props.testDone}
            aria-labelledby="finalizareTest-title"
            aria-describedby="finalizareTest-description"
        >
            <DialogTitle id="finalizareTest-title">
                Felicitări! Scorul tău este: {props.result}/{props.numQuestions}, echivalent cu {Math.round(props.result/props.numQuestions*950)}/950
            </DialogTitle>
            <DialogContent>
                {
                    props.questions.map((question, indexQuestion) => (
                        <Accordion key={`question_index_${indexQuestion}`} className={classes.root}>
                            <AccordionSummary
                                className={classes.accordionSummary}
                                key={`question-actions${indexQuestion}`}
                                expandIcon={<ExpandMoreIcon />}
                                aria-label="Expand"
                                aria-controls={`testDone-additional-actions${indexQuestion}-content`}
                                id={`testDone-additional-actions${indexQuestion}-header`}
                            >
                                {
                                    question["Choices"] === question["Raspunsuri_numar"]? 
                                    <CheckCircleIcon className={classes.checkIcon} /> :
                                    <CancelIcon color="error" />
                                }
                                <Typography variant="subtitle1">{indexQuestion + 1}) {question["Intrebare"]}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className={classes.answerOptionsDiv}>
                                    {question["Variante"].map((answerOption, indexVariant)=>(
                                        <AnswerOptionFinal
                                        key={`textDone_subCapitol_${question["SubCategorie"]}_intrebare_${indexQuestion}_varianta_${indexVariant}`}
                                        index={indexVariant}
                                        answerOption={answerOption}
                                        darkMode={props.darkMode}
                                        baza2Converter={props.baza2Converter}
                                        question={question}
                                    />
                                    ))}
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    ))
                }
            </DialogContent>
            <DialogActions>
            <Button href="/" variant="contained" color="secondary" >
                Înapoi acasă
            </Button>
            </DialogActions>
        </Dialog>

    );
}