import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

export default function TestsCard(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 255,
      display: "flex",
      flexDirection: "column",
      borderRadius: 15,
    },
    media: {
      backgroundColor: props.isSelected
        ? theme.palette.secondary.main
        : theme.palette.background.paper,
      height: "15vh",
      maxHeight: "150px",
      minHeight: 100,
    },
    lowerPart: {
      height: 120,
    },
    textSide: {},
    title: {},
  }));

  const classes = useStyles();
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={async () => {
          if (props.tipCont === "Standard") {
            props.setPremiumPop(true);
          } else {
            props.setCardSelected(props.title);
            if (props.ready) {
              sleep(100).then(() => {
                document
                  .getElementById("as vrea sa scrolez aici")
                  .scrollIntoView(true);
              });
            }
          }
        }}
      >
        <CardMedia className={classes.media} image={props.imagine} />
      </CardActionArea>
      <CardContent className={classes.lowerPart}>
        <Typography
          gutterBottom
          variant="h6"
          component="h3"
          className={classes.title}
        >
          {props.title}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
          className={classes.textSide}
        >
          {props.text}
        </Typography>
      </CardContent>
    </Card>
  );
}
