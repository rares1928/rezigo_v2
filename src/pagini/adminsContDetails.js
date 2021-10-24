import React, {useState, useEffect} from 'react';
import { callApi } from '../utils/callApi';
import { Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme)=>({
    wrapperDiv:{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - calc(8 * 8px))",
        justifyContent: "space-between",
    },
    root: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
    buttons: {
        width: theme.spacing(25),
    },
  }));



export default function AdminsContDetails() {
    const [error, setError] = useState(0);
    const [ready, setReady] = useState(false);
    const [items, setItems] = useState({});


    const handleError = (e) => {
        setError(e);
    }

    const handleItems = (e) => {
        setItems(e.data);
        setReady(true);
    };
    console.log(error);
    console.log(items);
    useEffect( () => {
        const url = "https://grileapiwin.azurewebsites.net/api/GetProfil?code=an7l2kCHdoYlNw006LoBdCzHB5U4qSVbNvpQ1r1V3TgSHtAYuMbkyw==";
        callApi(url, {}, handleItems, handleError);
    }, [])
    const classes=useStyles();
    const TITLE = "Detalii cont";
    return(
        <div className={classes.wrapperDiv}>
        <Helmet>
            <title>{TITLE}</title>
        </Helmet>
        <Container className={classes.root} maxWidth="md">
           {ready? 
                <div>
                    {items['lastName']}
                </div> : <CircularProgress/>
            }
        </Container>
    </div>
    );
}