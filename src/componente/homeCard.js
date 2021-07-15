import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme)=>({
  root: {
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    borderRadius: 15,
  },
  media: {
    height: "30vh",
    maxHeight: "250px",
  },
  textSide:{
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing(2, 2, 2),
  },
  title: {
      margin: theme.spacing(1,3,0),
  }
}));

export default function HomeCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
        <CardActionArea href={props.sendTo}>
            <CardMedia 
                className={classes.media}
                image={props.imagine}
            />
        </CardActionArea>
        <CardContent className={classes.textSide}>
            <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {props.text}
            </Typography>
        </CardContent>
    </Card>
  );
}