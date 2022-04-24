import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Input from "@material-ui/core/Input";

export default function SubcategoryCard(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginBottom: theme.spacing(0.8),
      maxWidth: "100%",
      display: "flex",
    },
    cardActionArea: {
      backgroundColor:
        props.listaselectiisubcat[props.index][props.indexSub] > 0
          ? theme.palette.secondary.main
          : theme.palette.background.paper,
    },
    cardAction: {
      width: 105,
    },
    input: {
      width: 40,
    },
  }));

  const classes = useStyles();
  const handleInputChange = (event) => {
    if (
      (event.target.value === "" ? 0 : Number(event.target.value)) >
      props.number
    ) {
      props.onClickSubCategorie(
        props.index,
        props.indexSub,
        false,
        props.number
      );
    } else {
      props.onClickSubCategorie(
        props.index,
        props.indexSub,
        false,
        event.target.value === "" ? 0 : Number(event.target.value)
      );
    }
  };

  return (
    <Card className={classes.root}>
      <CardActionArea
        className={classes.cardActionArea}
        onClick={() => {
          props.onClickSubCategorie(props.index, props.indexSub, true, 0);
        }}
      >
        <CardMedia component="div" title={props.text} />
        <CardContent>
          <Typography variant="subtitle2">{props.text}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing className={classes.cardAction}>
        <Input
          value={props.listaselectiisubcat[props.index][props.indexSub]}
          onChange={handleInputChange}
          color="secondary"
          className={classes.input}
          inputProps={{
            step: 1,
            min: 0,
            max: props.number,
            type: "number",

            "aria-labelledby": "input-slider",
          }}
        />
        <Typography variant="subtitle2" color="textSecondary">
          /{`${props.number}`}
        </Typography>
      </CardActions>
    </Card>
  );
}
