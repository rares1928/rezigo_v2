import React, {useState, useEffect} from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';


export default function AnswerOptionCard(props){
    const [bkColor, setBkColor] = useState("");
    useEffect( () => {  
        if(props.items[props.selectedQuestion]["Choices"]>0 && (props.baza2Converter(props.items[props.selectedQuestion]["Choices"], props.index) === 1 && props.items[props.selectedQuestion]['Raspunsuri'][props.index] ===1 )){
            setBkColor("#56DB57"); //green
        };
        if(props.items[props.selectedQuestion]["Choices"]>0 && (props.baza2Converter(props.items[props.selectedQuestion]["Choices"], props.index) === 0 && props.items[props.selectedQuestion]['Raspunsuri'][props.index] ===1 )){
            setBkColor("#EB91B1"); //pink
        };
        if(props.items[props.selectedQuestion]["Choices"]>0 && (props.baza2Converter(props.items[props.selectedQuestion]["Choices"], props.index) === 1 && props.items[props.selectedQuestion]['Raspunsuri'][props.index] ===0 )){
            setBkColor(props.darkMode? "#adadad" : "#7d7d7d"); //grey or whiteish
        };
    }, [props])
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
            backgroundColor: props.showAnswer && bkColor !== "" ? bkColor : (props.isSelected[props.index] || (props.baza2Converter(props.items[props.selectedQuestion]["Choices"], props.index) ===1 ))? theme.palette.secondary.main : (props.darkMode? "#5c5c5c" : "#fafafa"),
        },
        rezolvareDiv: {
            display: "flex",
            flexDirection: "row",
            minWidth: theme.spacing(6),
            alignItems: "center",
            justifyContent: "space-around"
        },
        rezolvareDivIcon:{
            display: "flex",
            justifyContent: "center",
        }
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
                        {abc[props.indexVechi]} {props.items[props.selectedQuestion]['Variante'][props.index]}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {
                props.showAnswer && props.items[props.selectedQuestion]["Choices"]>0 ?
                <>
                    {/* <div className={classes.rezolvareDivIcon}>
                        {
                        props.items[props.selectedQuestion]["Choices"]>0 && (props.baza2Converter(props.items[props.selectedQuestion]["Choices"], props.index) === props.items[props.selectedQuestion]['Raspunsuri'][props.index]) &&
                        <CheckCircleIcon className={classes.checkIcon} />
                        // <div>
                        //     {abc[props.index]} <RadioButtonCheckedIcon/> 
                        // </div>
                        }
                        {
                        props.items[props.selectedQuestion]["Choices"]>0 && (props.baza2Converter(props.items[props.selectedQuestion]["Choices"], props.index) !== props.items[props.selectedQuestion]['Raspunsuri'][props.index]) &&
                        <CancelIcon color="error" />
                        // <div>
                        //     {abc[props.index]} <RadioButtonUncheckedIcon/> 
                        // </div>
                        }
                    </div> */}
                    <div >
                        {
                        props.items[props.selectedQuestion]["Choices"]>0 && props.items[props.selectedQuestion]['Raspunsuri'][props.index] === 1 &&
                        // <CheckCircleIcon className={classes.checkIcon} />
                        <div className={classes.rezolvareDiv}>
                            {abc[props.indexVechi].replace(")","").toUpperCase()} <RadioButtonCheckedIcon/> 
                        </div>
                        }
                        {
                        props.items[props.selectedQuestion]["Choices"]>0 && props.items[props.selectedQuestion]['Raspunsuri'][props.index] === 0 &&
                        // <CancelIcon color="error" />
                        <div className={classes.rezolvareDiv}>
                            {abc[props.indexVechi].replace(")","").toUpperCase()} <RadioButtonUncheckedIcon/> 
                        </div>
                        }
                    </div> 
                </>: 
                
                <div className={classes.rezolvareDiv} ><HelpOutlineIcon/></div>
                }
            </CardActions>
        </Card>
    )
}