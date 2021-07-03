import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';


export default function AnswerOptionCard(props){
    const useStyles = makeStyles((theme) => ({
        root:{
            backgroundColor: props.darkMode? "#5c5c5c" : "#fafafa",
            display: "flex",
            flexDirection: "row",
            marginBottom: theme.spacing(0.5),
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
            onClick={()=> {props.handleQuestionSelection(props.index)}}
            >
                <CardContent>
                    <Typography variant="body2">
                        {abc[props.index]} {props.answerOption}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <HelpOutlineIcon/>
            </CardActions>
        </Card>
    )
}