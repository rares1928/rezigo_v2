import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import home1 from '../poze/homepage1.svg';
import home2 from '../poze/homepage2.svg';
import home3 from '../poze/homepage3.svg';
import home4 from '../poze/homepage4.svg';
import home5 from '../poze/homepage5.svg';
import home6 from '../poze/homepage6.svg';
import home7 from '../poze/homepage7.svg';
import testepage1 from '../poze/testepage1.svg';
import testepage2 from '../poze/testepage2.svg';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";


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
  cancelButton:{
    color: "#f44336",
  },
  buttons:{
    width: theme.spacing(14),
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: "space-between",
    height: 50,
    paddingLeft: theme.spacing(1),
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
              fullWidth
              maxWidth = "md"
              open={true}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              className={classes.dialog}
            >
              <DialogContent className={classes.dialogContent}>
                <Paper square elevation={0} className={classes.header}>
                    <Typography>{tutorialSteps[activeStep].label}</Typography>
                    <IconButton className={classes.cancelButton} onClick={props.lastClick} size="large">
                      <CloseIcon/>
                    </IconButton>
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
                      className={classes.buttons}
                      size="small" 
                      onClick={activeStep === tutorialSteps.length-1 ? props.lastClick : handleNext} 
                      disabled={activeStep === tutorialSteps.length}
                    >
                        {activeStep === tutorialSteps.length-1 ? <div>Închide</div>: <div>Următorul </div>}
                        {activeStep === tutorialSteps.length-1 ? null : <KeyboardArrowRight />}
                    </Button>
                    }
                    backButton={
                    <Button className={classes.buttons} size="small" onClick={handleBack} disabled={activeStep === 0}>
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