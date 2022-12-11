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
                    <Checkbox
                        onChange={() => {
                            // props.listaSelectiiSimulare.map((element) => setItem(!element));
                            // const lista_temp_selectii = [...props.listaSelectiiSimulare];
                            // lista_temp_selectii.forEach((selectie) => setItem(!selectie));
                            // props.setListaSelectiiSimulare(lista_temp_selectii);

                            setItem(item.map((element) => !element));

                            console.log(item);
                        }}
                        // checked={}
                    ></Checkbox>
                    {props.title}
                </Typography>
            </CardContent>
        </Card>
    );
}
