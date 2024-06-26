import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';



export default function AnswerOptionCardLegend(props){
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
            backgroundColor: props.color !== '' ? props.color : (props.darkMode? "#5c5c5c" : "#fafafa"),
        },
    }));

    const classes = useStyles();
    
    return(
        <Card className={classes.root}>
            <CardActionArea 
            className={classes.answerOption}
            disabled = {true}
            >
                <CardContent>
                    <Typography variant="body2">
                        {props.answerOption}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                    {
                        props.isCorrect ===1 &&
                        <RadioButtonCheckedIcon/>
                    }
                    {
                        props.isCorrect ===0 &&
                        <RadioButtonUncheckedIcon/>
                    }
            </CardActions>
        </Card>
    )
}