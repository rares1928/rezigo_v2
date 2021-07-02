import React from 'react';
import { Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import dataGrile from "../componente/getGrile";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center', 
        width: '70%',
      }
}));

console.log(dataGrile.lista_grile[3])
export default function GrilePage() {
    const classes = useStyles();
    return(
        // <Typography variant="h2">Mu3</Typography>
        <div className={classes.root}>
            <Paper className={classes.paper}>
                {/* <div className="grilePage_question-section">
                <p className="grilePage_question_capitol">
                    Capitol: {dataGrile[3]["Categorie"]}; Subcapitol: {dataGrile[3]["SubCategorie"]}
                </p>
                <p className="grilePage_question_text">
                    {3}. {dataGrile[3]['Intrebare']}
                </p>
                </div> */}
                <div>
                    {3}. {dataGrile.lista_grile[3]['title']}
                </div>
                <div>
                    {dataGrile.lista_grile[3]['choices'].map((answerOption, index) =>(
                        <div>
                            <Card>
                                <CardActionArea>
                                    <CardContent>
                                        {answerOption}
                                    </CardContent>
                                </CardActionArea>
                            </Card>                       
                        </div>
                    ))}
                </div>
            </Paper>
        </div>
    );
}