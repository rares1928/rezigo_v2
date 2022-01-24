import React from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';



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