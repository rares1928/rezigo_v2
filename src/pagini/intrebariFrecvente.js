import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';
import Container from '@mui/material/Container';
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
