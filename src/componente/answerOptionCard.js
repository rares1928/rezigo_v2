import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';


export default function AnswerOptionCard(props){
    const useStyles = makeStyles((theme) => ({
        root:{
            backgroundColor: props.darkMode? "#5c5c5c" : "#fafafa",
            display: "flex",
            flexDirection: "row",
            marginBottom: theme.spacing(0.5),
        },
        checkIcon:{
            color: theme.palette.success.main,
        },
        answerOption:{
            backgroundColor: (props.isSelected[props.index] || (props.baza2Converter(props.items[props.selectedQuestion]["Choices"], props.index) ===1 ))? theme.palette.secondary.main : (props.darkMode? "#5c5c5c" : "#fafafa"),
        },
    }));
    const classes = useStyles();
    const abc = ['a)','b)','c)','d)','e)'];
    return(
        <Card className={classes.root}>
            <CardActionArea 
            className={classes.answerOption}
            disabled = {props.items[props.selectedQuestion]["Choices"] > 0}
            onClick={()=> {props.handleQuestionSelection(props.index)}}
            >
                <CardContent>
                    <Typography variant="body2">
                        {abc[props.index]} {props.answerOption}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {
                props.showAnswer && props.items[props.selectedQuestion]["Choices"]>0 ?
                <div >
                    {
                    props.items[props.selectedQuestion]["Choices"]>0 && (props.baza2Converter(props.items[props.selectedQuestion]["Choices"], props.index) === props.items[props.selectedQuestion]['Raspunsuri'][props.index]) &&
                    <CheckCircleIcon className={classes.checkIcon} />
                    }
                    {
                    props.items[props.selectedQuestion]["Choices"]>0 && (props.baza2Converter(props.items[props.selectedQuestion]["Choices"], props.index) !== props.items[props.selectedQuestion]['Raspunsuri'][props.index]) &&
                    <CancelIcon color="error" />
                    }
                </div> : <HelpOutlineIcon/>
                }
            </CardActions>
        </Card>
    )
}