import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Helmet } from 'react-helmet';
import Container from '@material-ui/core/Container';



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
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return(
    <div className={classes.wrapperDiv}>
        <Helmet>
            <title>{TITLE}</title>
        </Helmet>
        <Container className={classes.root} maxWidth="lg">
            <Typography variant='h5' className={classes.titlu}>
                Întrebări frecvente:
            </Typography>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography variant = "h6">Pot folosi Rezigo gratis?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Da! 
                    
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
                >
                <Typography variant = "h6">Pot folosi Rezigo de pe telefon? </Typography>

                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Da!
                </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
                >
                <Typography variant = "h6">Pot folosi Rezigo de pe mai multe device-uri in acelasi timp? </Typography>

                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    Nu
                </Typography>
                </AccordionDetails>
            </Accordion>
        </Container>
    </div>
   );
}
