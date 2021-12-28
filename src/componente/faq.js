import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';



export default function FAQ() {
    const useStyles = makeStyles((theme)=>({
        acordeon: {
            backgroundColor: "rgba(238,238,238,0.35)"
        },
      }));


    const classes=useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return(
    <div>
        <Accordion className={classes.acordeon} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
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
        <Accordion className={classes.acordeon} expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
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
        <Accordion className={classes.acordeon} expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
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
    </div>
   );
}
