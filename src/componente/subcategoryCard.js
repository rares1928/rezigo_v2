import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

const useStyles = makeStyles((theme)=>({
  root: {
    marginBottom: theme.spacing(0.8),
    maxWidth: '100%',
    display:"flex",
    borderBlockStyle: "solid",
    borderWidth: theme.spacing(0.2),
  },
  input:{
    width: 42,
  },
}));

export default function SubcategoryCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          title={props.text}
        />
        <CardContent>
          <Typography variant="body2" >
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Input 
            color="secondary"
            className={classes.input} 
            inputProps={{
            step: 1,
            min: 0,
            max: props.number ,
            type: 'number',
            'aria-labelledby': 'input-slider',}}
        />
      </CardActions>
    </Card>
  );
}