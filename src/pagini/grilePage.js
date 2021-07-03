import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import dataGrile from "../componente/getGrile";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';


export default function GrilePage(props) {
    console.log(dataGrile["lista"]);

    const useStyles = makeStyles((theme) => ({
    
        paper: {
            padding: theme.spacing(2),
            marginTop: theme.spacing(8),
        },
        question:{
            paddingTop: theme.spacing(3),
            padding: theme.spacing(1),
            paddingBottom: theme.spacing(3),
        },
        cardVariante:{
            backgroundColor: props.darkMode? "#5c5c5c" : "#fafafa",
            display: "flex",
            flexDirection: "row",
            marginBottom: theme.spacing(0.5),
        },
    
    }));

    const [selectedQuestion, setNextQuestion] = useState(0);
    let isQuestionSelected = [false, false, false, false, false]
    const [isSelected, setIsSelected]=useState(isQuestionSelected);
    const [items, setItems] = useState([]);
    const [isReady, setReady] = useState(false);
    const [arataRaspuns, setArataRaspuns] = useState(false);

    useEffect(()=>{
        setItems(dataGrile["lista"]);
        console.log("sunt in fucking useEffect");
    },[])
    console.log("items= ", items);
    console.log(isReady);

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
    
    const abc = ['a)','b)','c)','d)','e)'];
    const classes = useStyles();
    return(
        <Container maxWidth="lg">
        <Grid >
            <Grid item>
            <Paper className={classes.paper}>
                <div className={classes.question}>
                    <Typography variant="subtitle1">
                        Capitol: {items[selectedQuestion]["Categorie"]}; Subcapitol: {items[selectedQuestion]["SubCategorie"]}
                    </Typography>
                    <Typography  variant="subtitle1" >
                        {selectedQuestion+1}. {items[selectedQuestion]['Intrebare']}
                    </Typography>
                </div>
                <div>
                    {items[selectedQuestion]['Variante'].map((answerOption, index) =>(
                        <Card key={index} className={classes.cardVariante}>
                            <CardActionArea>
                                <CardContent>
                                    <Typography variant="subtitle1">
                                        {abc[index]} {answerOption}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                Corect/Gresit
                            </CardActions>
                        </Card>                       
                    ))}
                </div>
            </Paper>
            </Grid>
        </Grid>
        </Container>
    );
}