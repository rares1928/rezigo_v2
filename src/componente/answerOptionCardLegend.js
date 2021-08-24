import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';


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
            backgroundColor: props.isSelected ? theme.palette.secondary.main : (props.darkMode? "#5c5c5c" : "#fafafa"),
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
                        props.isCorrect ?
                        <CheckCircleIcon className={classes.checkIcon} /> : <CancelIcon color="error" />
                    }
            </CardActions>
        </Card>
    )
}