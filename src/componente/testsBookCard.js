import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

export default function TestsBookCard(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            display: "flex",
            flexDirection: "column",
            borderRadius: 15,
        },
        media: {
            backgroundColor: props.isSelected ? theme.palette.secondary.main : theme.palette.background.paper,
            display: "flex",
            justifyContent: "center",
            maxHeight: 250,
        },
        mediaImg: {
            height: "15vh",
            minHeight: 150,
        },
        lowerPart: {
            height: 100,
            textAlign: "center",
        },
    }));

    const classes = useStyles();
    const [item, setItem] = useState(props.listaSelectiiSimulare);
    return (
        <Card className={classes.root}>
            <CardActionArea
                onClick={
                    props.grilePePagini
                        ? () => {
                              props.setCardSelected(props.title);
                          }
                        : () => {
                              props.setCardSelected(!props.isSelected);
                          }
                }
            >
                <CardMedia className={classes.media}>
                    <img src={props.imagine} className={classes.mediaImg} alt=""></img>
                </CardMedia>
            </CardActionArea>
            <CardContent className={classes.lowerPart}>
                <Typography gutterBottom variant="h6" component="h3" className={classes.title}>
                    {props.isCardSelected === "Simulare" ? (
                        <Checkbox
                            // checked={() => {
                            //     let chechIfAllSelected = props.listaCategorii.foreach((element, index) => {
                            //         if (element["book"] === props.book) {
                            //             return props.listaSelectiiSimulare[index];
                            //         }
                            //     });
                            //     chechIfAllSelected.includes(!false);
                            //     // props.listaCategorii.foreach((element, index) => {
                            //     //     if (element["book"] === props.book)
                            //     //     {if (props.listaSelectiiSimulare[index] === false)
                            //     //     return false;}
                            //     //     else if (element["book"] === props.book) return true;
                            //     // });
                            // }}
                            onChange={() => {
                                // props.listaSelectiiSimulare.foreach((element, index) =>
                                //     props.listaCategorii[index]["book"] === props.book
                                //         ? props.listaSelectiiSimulare[index] === false
                                //             ? props.setListaSelectiiSimulare(props.listaSelectiiSimulare.map((element) => true))
                                //             : props.setListaSelectiiSimulare(props.listaSelectiiSimulare.map((element) => false))
                                //         : props.setListaSelectiiSimulare(props.listaSelectiiSimulare)
                                // );
                                // props.listaSelectiiSimulare.map(
                                //         (element, index) => {
                                //             props.listaCategorii[index]["book"] === props.book && props.listaSelectiiSimulare[index] === false ? true : false;
                                //         }
                                props.setListaSelectiiSimulare(
                                    props.listaSelectiiSimulare.map((element, index) =>
                                        props.listaCategorii[index]["book"] === props.book
                                            ? props.listaSelectiiSimulare[index] === false
                                                ? true
                                                : false
                                            : props.listaSelectiiSimulare[index]
                                    )
                                );

                                console.log(props.listaSelectiiSimulare);
                            }}
                        ></Checkbox>
                    ) : null}
                    {props.title}
                </Typography>
            </CardContent>
        </Card>
    );
}
