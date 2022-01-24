import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const useStyles = makeStyles((theme)=>({
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
        <CardActionArea href={props.sendTo} disabled = {props.disabled}>
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