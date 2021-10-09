import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
import home1 from '../poze/homepage1.svg';
import home2 from '../poze/homepage2.svg';
import home3 from '../poze/homepage3.svg';
import home4 from '../poze/homepage4.svg';
import home5 from '../poze/homepage5.svg';
import home6 from '../poze/homepage6.svg';
import home7 from '../poze/homepage7.svg';
import testepage1 from '../poze/testepage1.svg';
import testepage2 from '../poze/testepage2.svg';


const tutorialSteps = [
  {
    label: ' Home',
    imgPath: home1 ,  
  },
  {
    label: ' Home',
    imgPath: home2 ,  
  },
  {
    label: ' Home',
    imgPath: home3 ,  
  },
  {
    label: ' Home',
    imgPath: home4 ,  
  },
  {
    label: ' Home',
    imgPath: home5 ,  
  },
  {
    label: ' Home',
    imgPath: home6 ,  
  },
  {
    label: ' Home',
    imgPath: home7 ,  
  },
  {
    label: ' Teste',
    imgPath: testepage1 ,  
  },
  {
    label: ' Teste',
    imgPath: testepage2 ,  
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  dialog: {
    
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {

    maxWidth: '90vw',
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
                    steps={tutorialSteps.length}
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