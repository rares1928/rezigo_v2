import React, {useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import dataGrile from "../componente/getGrile";
import AnswerOptionCard from '../componente/answerOptionCard';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/core/Slider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


export default function GrilePage(props) {

    const [selectedQuestion, setNextQuestion] = useState(0);
    let isQuestionSelected = [false, false, false, false, false]
    const [isSelected, setIsSelected]=useState(isQuestionSelected);
    const [items, setItems] = useState([]);
    const [isReady, setReady] = useState(false);

    useEffect(()=>{
        setItems(dataGrile["lista"]);
        setReady(true);
    },[isReady])

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
    const handleSliderChange = (event, newValue) => {
        setNextQuestion(newValue-1);
    };
    const baza2Converter = (numar, pozitie) => {
        return(parseInt(numar/Math.pow(2,4-pozitie)) %2)
    }
    
    const useStyles = makeStyles((theme) => ({
    
        paper: {
            padding: theme.spacing(2),
            marginTop: theme.spacing(8),
            marginBottom: theme.spacing(8),
        },
        question:{
            paddingTop: theme.spacing(3),
            padding: theme.spacing(1),
            paddingBottom: theme.spacing(3),
        },
        cardVariante:{
            display: "flex",
            flexDirection: "row",
            marginBottom: theme.spacing(0.5),
        },
        butonRaspuns:{
            marginTop: theme.spacing(3),
        },
        slider:{
            marginTop: theme.spacing(3),
            display:"flex",
            flexDirection:"row",
            alignItems:"center",
        },
    
    }));
    const classes = useStyles();
    return(
        <Container maxWidth="lg">
        {isReady &&
        <Grid >
            <Grid item>
            <Paper className={classes.paper}>
                <div className={classes.question}>
                    <Typography variant="body2" color="textSecondary">
                        Capitol: {items[selectedQuestion]["Categorie"]}; Subcapitol: {items[selectedQuestion]["SubCategorie"]}
                    </Typography>
                    <Typography  variant="subtitle1" className="grileQuestionTypography">
                        {selectedQuestion+1}. {items[selectedQuestion]['Intrebare']}
                    </Typography>
                </div>
                <div>
                    {items[selectedQuestion]['Variante'].map((answerOption, index) =>(
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
                <Button 
                    variant="contained" 
                    color="secondary" 
                    className={classes.butonRaspuns}
                    disabled={(isSelected.reduce((a,b)=> a+b ,0)) === 0}
                >
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
                <div className={classes.slider}>
                    <IconButton
                        onClick={ handlePreviousQuestion}
                        disabled={selectedQuestion   === 0 ? true : false}
                        >
                        
                        <ChevronLeftIcon/>
                    </IconButton>
                    
                    <Slider
                        onChange={handleSliderChange}
                        value={selectedQuestion+1}
                        marks
                        step={1}
                        min={1}
                        max={items.length}
                        valueLabelDisplay="auto"
                    >          
                    </Slider>
                    <IconButton
                        onClick={handleNextQuestion}
                        disabled={selectedQuestion +1  === items.length ? true : false}
                    >
                        <ChevronRightIcon/>
                    </IconButton>
                </div>
            </Paper>
            </Grid>
        </Grid>
        }
        </Container>
    );
}