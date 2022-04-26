import React from "react";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import AnswerOptionFinal from "./answerOptionFinal";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import AnswerOptionCardLegend from "../componente/answerOptionCardLegend";

export default function FinalizareTest(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(8),
    },
    title: {
      margin: theme.spacing(1),
      marginLeft: theme.spacing(2),
      marginBottom: theme.spacing(2),
      paddingTop: theme.spacing(2),
    },
    checkIcon: {
      color: theme.palette.success.main,
    },

    accordionDiv: {
      margin: theme.spacing(1),
    },
    answerOptionsDiv: {
      display: "flex",
      flexDirection: "column",
    },
    divButon: {
      marginTop: theme.spacing(2),
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    linkAici: {
      cursor: "pointer",
    },
    textZone: {
      marginBottom: theme.spacing(2),
    },
    paperStatistics: {
      marginBottom: theme.spacing(3),
      marginTop: theme.spacing(4),
    },
  }));

  const classes = useStyles();
  let history = useHistory();
  return (
    <Container maxWidth="lg">
      <Paper className={classes.root}>
        <div className={classes.title}>
          <Typography variant="h5">
            Felicitări! Scorul tău este: {props.resultScor}/{props.scorPosibil},
            echivalent cu{" "}
            {Math.round((props.resultScor / props.scorPosibil) * 950)}/950
          </Typography>
          <Typography variant="h5" className={classes.textZone}>
            Ai răspuns corect la {props.raspunsuriCorecte} întrebări din{" "}
            {props.numarIntrebari}.
          </Typography>
          {props.raspunsuriCorecte !== props.numarIntrebari && (
            <Typography variant="h6" className={classes.textZone}>
              Toate întrebările din acest test la care ai răspuns greșit sunt
              puse într-un test nou din secțiunea reparcurge greșeli. Îl poți
              găsi la secțiunea Reparcurge greșeli.
              {/* <Link onClick = {() => {history.push({ pathname: "/creeaza-ti_test", state: {from: "rezolva_test"} })}} className={classes.linkAici} color = 'secondary'>aici</Link>. */}
            </Typography>
          )}
          <Typography variant="subtitle1" className={classes.textZone}>
            Dacă dorești să raportezi o grilă, te rugăm să te întorci la meniul
            de reolvare a testului.
          </Typography>
          <div className={classes.divButon}>
            <Button
              onClick={() => {
                props.setTestDone(false);
              }}
              variant="contained"
              color="secondary"
            >
              Întoarce-te la test
            </Button>
            <Button href="/" variant="contained" color="secondary">
              Înapoi acasă
            </Button>
          </div>
        </div>
        <div className={classes.accrodionDiv}>
          {props.questions.map((question, indexQuestion) => (
            <Accordion
              key={`question_index_${indexQuestion}`}
              className={classes.accordion}
            >
              <AccordionSummary
                className={classes.accordionSummary}
                key={`question-actions${indexQuestion}`}
                expandIcon={<ExpandMoreIcon />}
                aria-label="Expand"
                aria-controls={`testDone-additional-actions${indexQuestion}-content`}
                id={`testDone-additional-actions${indexQuestion}-header`}
              >
                {question["Choices"] === question["Raspunsuri_numar"] ? (
                  <CheckCircleIcon className={classes.checkIcon} />
                ) : (
                  <CancelIcon color="error" />
                )}
                <Typography variant="subtitle1">
                  {indexQuestion + 1}) [{question["TipGrile"]},{" "}
                  {question["Carte"]}] {question["Intrebare"]}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <div className={classes.answerOptionsDiv}>
                  {question["Variante"].map((answerOption, indexVariant) => (
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
          ))}
        </div>
      </Paper>
      <Paper className={classes.paperStatistics}>
        <Typography className={classes.title}>Lengendă</Typography>
        <AnswerOptionCardLegend
          isSelected={true}
          darkMode={props.darkMode}
          answerOption="Grilă selectată ce trebuia selectată"
          isCorrect={1}
          color="#56DB57" //green
        />
        <AnswerOptionCardLegend
          isSelected={false}
          darkMode={props.darkMode}
          answerOption="Grilă neselectată ce trebuia selectată"
          isCorrect={1}
          color="#EB91B1" //pink
        />
        <AnswerOptionCardLegend
          isSelected={true}
          darkMode={props.darkMode}
          answerOption="Grilă selectată ce nu trebuia selectată"
          isCorrect={0}
          color={props.darkMode ? "#bfbfbf" : "#7d7d7d"} //grey or whiteish
        />
        <AnswerOptionCardLegend
          isSelected={false}
          darkMode={props.darkMode}
          answerOption="Grilă neselectată ce nu trebuia selectată"
          isCorrect={0}
          color="" //nema
        />
      </Paper>
    </Container>
  );
}
