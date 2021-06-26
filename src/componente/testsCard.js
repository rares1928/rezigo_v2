import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

export default function TestsCard(props) {

    const useStyles = makeStyles((theme)=>({
        root: {
            maxWidth: 285,
            display: "flex",
            flexDirection: "column",
            borderRadius: 15,
            
        },
        media: {
            backgroundColor: props.isSelected? theme.palette.secondary.main : theme.palette.background.paper,
            height: "20vh",
            minHeight: 150,
        },
        lowerPart:{       
            height: 105,
        },
        textSide: {

        },
        title: {

        },
      }));

    const classes = useStyles();
  return (
    <Card className={classes.root}>
        <CardActionArea onClick={()=>{
                props.setCardSelected(props.title);
                var objDiv = document.getElementById("testCard_div");
                objDiv.scrollTop = objDiv.scrollHeight;
            }}>
            <CardMedia 
                className={classes.media}
                image={props.imagine}
            />
        </CardActionArea>
        <CardContent className={classes.lowerPart}>
            <Typography gutterBottom variant="h6" component="h3" className={classes.title}>
                {props.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p" className={classes.textSide}>
                {props.text}
            </Typography>
        </CardContent>
    </Card>
  );
}