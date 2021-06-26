import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';


export default function SubcategoryCard(props) {
  const useStyles = makeStyles((theme)=>({
    root: {
      marginBottom: theme.spacing(0.8),
      maxWidth: '100%',
      display:"flex",
      
    },
    cardActionArea: {
      backgroundColor: props.listaselectiisubcat[props.index][props.indexSub]? theme.palette.secondary.main : theme.palette.background.paper,
    },
    input:{
      width: 25,
    },
  }));

  const classes = useStyles();

  console.log(props.listaselectiisubcat[props.index][props.indexSub]);

  return (
    <Card className={classes.root}>
      <CardActionArea 
      className={classes.cardActionArea} 
      onClick={() => { props.onClickSubCategorie(props.index, props.indexSub) }}
      >
        <CardMedia
          component="div"
          title={props.text}
        />
        <CardContent>
          <Typography variant="subtitle2" >
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Input 
            color="secondary"
            className={classes.input}
            inputProps={{
            step: 1,
            min: 0,
            max: props.number ,
            type: 'tel',
            
            'aria-labelledby': 'input-slider',}}
        />
        <Typography variant="h6" color="textSecondary">
          /{`${props.number}`}
        </Typography>
      </CardActions>
    </Card>
  );
}