import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { Grid } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//     wrapperDiv: {
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "calc(100vh - calc(8 * 8px))",
//         justifyContent: "space-between",
//     },
//     root: {
//         paddingTop: theme.spacing(6),
//         paddingBottom: theme.spacing(6),
//     },
//     footer: {
//         backgroundColor: theme.palette.primary.main,
//         padding: theme.spacing(1, 10, 3),
//     },
//     footerItem: {
//         maxWidth: 300,
//     },
//     userHelperDialog: {
//         maxwidth: "80vw",
//     },
//     instructionsText: {
//         // display: "flex",
//         // flexDirection: "row",
//         marginTop: theme.spacing(0),
//         marginBottom: theme.spacing(2),
//         paddingLegt: theme.spacing(2),
//     },
// }));

export default function Carousel() {
    const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

    const tutorialSteps = [
        {
            label: "San Francisco – Oakland Bay Bridge, United States",
            imgPath: "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
            textForImg: "Aici o sa vina textul pentru postar",
        },
        {
            label: "Bird",
            imgPath: "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
            textForImg: "Aici o sa vina textul pentru postare, iada iada, Aici o sa vina textul pentru postare, iada iada",
        },
        {
            label: "Bali, Indonesia",
            imgPath: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80",
            textForImg:
                "Aici o sa vina textul pentru postare, iada iada Aici o sa vina textul pentru postare, iada iada Aici o sa vina textul pentru postare, iada iada",
        },
        {
            label: "NeONBRAND Digital Marketing, Las Vegas, United States",
            imgPath: "https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60",
            textForImg:
                "Aici o sa vina textul pentru postare, iada iada Aici o sa vina textul pentru postare, iada iada Aici o sa vina textul pentru postare, iada iada Aici o sa vina textul pentru postare, iada iada",
        },
        {
            label: "Goč, Serbia",
            imgPath: "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
            textForImg: "Aici o sa vina textul pentru postare, iada iada",
        },
    ];

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        header: {
            display: "flex",
            alignItems: "center",
            height: 50,
            paddingLeft: theme.spacing(4),
            backgroundColor: theme.palette.background.default,
        },
        img: {
            // height: 255,
            display: "block",
            overflow: "hidden",
            width: "100%",
            minWidth: 300,
            padding: theme.spacing(2),
        },
        textForImg: {
            padding: theme.spacing(2),
            display: "flex",
            alignItems: "center",
        },
    }));

    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <div className={classes.root}>
            <AutoPlaySwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"} index={activeStep} onChangeIndex={handleStepChange} enableMouseEvents>
                {tutorialSteps.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <Paper>
                                <Grid container spacing={0} justifyContent="center">
                                    <Grid item xs={6}>
                                        <img className={classes.img} src={step.imgPath} alt={step.label} />
                                    </Grid>
                                    <Grid item xs={6} className={classes.textForImg}>
                                        <Typography className={classes.textForImg}>{step.textForImg}</Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>
            <MobileStepper
                steps={maxSteps}
                position="static"
                variant="text"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                        Next
                        {theme.direction === "rtl" ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === "rtl" ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Back
                    </Button>
                }
            />
        </div>
    );
}
