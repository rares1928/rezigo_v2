import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default function TestsBookCard(props) {

    const useStyles = makeStyles((theme)=>({
        root: {
            
            display: "flex",
            flexDirection: "column",
            borderRadius: 15,
            
        },
        media: {
            backgroundColor: props.isSelected? theme.palette.secondary.main : theme.palette.background.paper,
            display:"flex",
            justifyContent:"center",
        },
        mediaImg: {
            height: "20vh",
            minHeight: 150,
        },
        lowerPart:{       
            height: 80,
            textAlign: "center",
        },
      }));

    const classes = useStyles();
  return (
    <Card className={classes.root}>
        <CardActionArea onClick={()=>{props.setCardSelected(!props.isSelected)}}>
            <CardMedia className={classes.media}>
                <img src={props.imagine} className={classes.mediaImg} alt=""></img>
            </CardMedia>
        </CardActionArea>
        <CardContent className={classes.lowerPart}>
            <Typography gutterBottom variant="h6" component="h3" className={classes.title}>
                {props.title}
            </Typography>
        </CardContent>
    </Card>
  );
}