import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 370,
    display: "flex",
    flexDirection: "column",
    borderRadius: 15,
  },
  media: {
    height: "25vh",
    maxHeight: "200px",
    minHeight: 170,
  },
  textSide: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    padding: theme.spacing(2, 2, 0),
    minHeight: 110,
  },
  title: {
    margin: theme.spacing(1, 3, 0),
  },
}));

export default function TutorialCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea
        onClick={() => {
          props.setUserHelper(true);
        }}
      >
        <CardMedia className={classes.media} image={props.imagine} />
      </CardActionArea>
      <CardContent className={classes.textSide}>
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          className={classes.title}
        >
          {props.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.text}
        </Typography>
      </CardContent>
    </Card>
  );
}
