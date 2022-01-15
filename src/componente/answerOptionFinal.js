import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';


export default function AnswerOptionFinal(props){
    const [bkColor, setBkColor] = useState("");
    useEffect( () => {  
        if(props.question["Choices"]>0 && (props.baza2Converter(props.question["Choices"], props.index) === 1 && props.question['Raspunsuri'][props.index] ===1 )){
            setBkColor("#56DB57"); //green
        };
        if(props.question["Choices"]>0 && (props.baza2Converter(props.question["Choices"], props.index) === 0 && props.question['Raspunsuri'][props.index] ===1 )){
            setBkColor("#EB91B1"); //pink
        };
        if(props.question["Choices"]>0 && (props.baza2Converter(props.question["Choices"], props.index) === 1 && props.question['Raspunsuri'][props.index] ===0 )){
            setBkColor(props.darkMode? "#adadad" : "#7d7d7d"); //grey or whiteish
        };
    }, [props])
    const useStyles = makeStyles((theme) => ({
        root:{
            width:"100%",
            backgroundColor: props.darkMode? "#5c5c5c" : "#fafafa",
            display: "flex",
            flexDirection: "row",
            marginBottom: theme.spacing(0.5),
        },
        checkIcon:{
            color: theme.palette.success.main,
        },
        answerOption:{
            backgroundColor: bkColor !== ''? bkColor : (props.baza2Converter(props.question["Choices"], props.index) ===1 )? theme.palette.secondary.main : (props.darkMode? "#5c5c5c" : "#fafafa"),
        },
    }));
    const classes = useStyles();
    const abc = ['a)','b)','c)','d)','e)'];
    return(
        <Card className={classes.root}>
            <CardActionArea 
            className={classes.answerOption}
            disabled
            >
                <CardContent>
                    <Typography variant="body2">
                        {abc[props.index]} {props.answerOption}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {/* <div >
                    {
                    props.question["Choices"]>0 && (props.baza2Converter(props.question["Choices"], props.index) === props.question['Raspunsuri'][props.index]) &&
                    <CheckCircleIcon className={classes.checkIcon} />
                    }
                    {
                    props.question["Choices"]>0 && (props.baza2Converter(props.question["Choices"], props.index) !== props.question['Raspunsuri'][props.index]) &&
                    <CancelIcon color="error" />
                    }
                </div> */}
                <div >
                    {
                    props.question["Choices"]>0 && 1 === props.question['Raspunsuri'][props.index] &&
                    <RadioButtonCheckedIcon />
                    }
                    {
                    props.question["Choices"]>0 && 0 === props.question['Raspunsuri'][props.index] &&
                    <RadioButtonUncheckedIcon />
                    }
                </div>
            </CardActions>
        </Card>
    )
}