import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';

const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bird',
    imgPath:
      'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80',
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath:
      'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    maxWidth: 500,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
  },
  dialogContent: {
      width: '100%',
  },
  dots: {
      width: '100%',
  },
  dialogActions:{
    display:"flex",
    flexDirection:"column",
    alignItems:"flex-start",
  },
}));

export default function UserHelper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  return (
    <div className={classes.root}>
        <Grid container direction="column">
            <Dialog
                open={true}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                className={classes.dialog}
            >
                <DialogContent className={classes.dialogContent}>
                    <Paper square elevation={0} className={classes.header}>
                        <Typography>{tutorialSteps[activeStep].label}</Typography>
                    </Paper>
                    <img
                        className={classes.img}
                        src={tutorialSteps[activeStep].imgPath}
                        alt={tutorialSteps[activeStep].label}
                    />
                </DialogContent>
                <DialogActions className={classes.dialogActions}>
                    <MobileStepper
                        variant="dots"
                        steps={5}
                        position="static"
                        activeStep={activeStep}
                        className={classes.dots}
                        nextButton={
                        <Button 
                            size="small" 
                            onClick={activeStep === tutorialSteps.length-1 ? props.lastClick : handleNext} 
                            disabled={activeStep === tutorialSteps.length}
                        >
                            {activeStep === tutorialSteps.length-1 ? <div>Închide</div>: <div>Următorul </div>}
                            {activeStep === tutorialSteps.length-1 ? null : <KeyboardArrowRight />}
                        </Button>
                        }
                        backButton={
                        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                            <KeyboardArrowLeft /> Înapoi
                        </Button>
                        }
                    />
                   
                </DialogActions>
            </Dialog>
        </Grid>
    </div>
  );
}