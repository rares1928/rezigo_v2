import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

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
            maxHeight: 250,
        },
        mediaImg: {
            height: "15vh",
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
            <Typography gutterBottom variant="h6" className={classes.title}>
                {props.title}
            </Typography>
        </CardContent>
    </Card>
  );
}