import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Helmet } from 'react-helmet';
import Container from '@material-ui/core/Container';
import FAQ from '../componente/faq';



const useStyles = makeStyles((theme)=>({
    wrapperDiv:{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - calc(8 * 8px))",
    },
    root: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
    titlu: {
        marginBottom: theme.spacing(3),
    },
  }));


export default function IntrebariFrecventePage() {
    const classes=useStyles();

    const TITLE = "FAQ";

    return(
    <div className={classes.wrapperDiv}>
        <Helmet>
            <title>{TITLE}</title>
        </Helmet>
        <Container className={classes.root} maxWidth="lg">
            <Typography variant='h5' className={classes.titlu}>
                Întrebări frecvente:
            </Typography>
            <FAQ/>
        </Container>
    </div>
   );
}
