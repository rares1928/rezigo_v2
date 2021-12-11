import React, {useEffect, useState} from 'react';
import { Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import { callApi } from '../utils/callApi';
import { useLocation, useHistory } from 'react-router-dom';
import { CircularProgress, Divider } from '@material-ui/core';


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
    raspunsuriDiv:{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: "70%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    tipGrileDiv:{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
        width: "30%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    paper:{
        marginBottom: theme.spacing(3),
        padding: theme.spacing(1),
    },
    textFieldDiv: {
        width: "95%",
        margin: theme.spacing(1),
    },
    typography:{
        marginBottom: theme.spacing(1),
    },
    selectInstructions: {
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
    divButton:{
        margin: theme.spacing(1),
        width: "95%",
        display: "flex",
        justifyContent: "space-between",
    },
    grileListDiv:{
        margin:theme.spacing(1),
    },
    grilaDiv:{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    button:{
        width: theme.spacing(20),
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
  }));


export default function AdminsEditGrila() {
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState({});
    const [itemsModificate, setItemsModificate] = useState({});
    const [ready, setReady] = useState(false);
    const { state } = useLocation();
    let history = useHistory();

    useEffect( () => {
        if(state === undefined){
            return(history.push({ pathname: "/admins/grile" }));
        }
        const url = "https://grileapiwin.azurewebsites.net/api/GetGrilaAdmin?code=CCuH1t1ZUm70fO52wBiKbTcVFiEjFuZVOH7rBShs0cuJOaI1qdWt9Q==";
        const data = {grilaId: state};
        callApi(url, data , handleItems, handleError);
    }, [])

    const handleError = (e) => {
        if(e === 403){
            history.push({ pathname: "/" });
        }
        else{
            console.log(e);
        }
        setLoading(false);
    }
    const handleItems = (e) => {
        setItems(e.data);
        setItemsModificate(e.data);
        sleep(100).then(() => setReady(true));
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    console.log(items.lista);
    const classes=useStyles();
    const TITLE = "admins";
    return(
        <div className={classes.wrapperDiv}>
        <Helmet>
            <title>{TITLE}</title>
        </Helmet>
        <Container className={classes.root} maxWidth="md">
            {ready?
                <>
                <Typography variant = "h6" className={classes.typography}>
                    Cum apare grila in baza de date:
                </Typography>
                <Paper className={classes.paper}>
                    <Typography >
                        Id grila: {state}
                    </Typography>
                    <div className={classes.tipGrileDiv}>
                        <Typography>
                            Tip Grila:
                        </Typography>
                        <Button variant='contained' color={items.lista["TipGrile"] === "CS" ? "secondary" : ""}>
                            CS
                        </Button>
                        <Button variant='contained' color={items.lista["TipGrile"] === "CM" ? "secondary" : ""}>
                            CM
                        </Button>
                    </div>
                    <Typography >
                        {items.lista["Intrebare"]}
                    </Typography>
                    <Typography >
                        a){items.lista["Variante"][0]}
                    </Typography>
                    <Typography >
                        b){items.lista["Variante"][1]}
                    </Typography>
                    <Typography >
                        c){items.lista["Variante"][2]}
                    </Typography>
                    <Typography >
                        d){items.lista["Variante"][3]}
                    </Typography>
                    <Typography >
                        e){items.lista["Variante"][4]}
                    </Typography>
                    <Typography >
                        Explicatii: {/* e) {grilaPrimita.Variante_e} */}
                    </Typography>
                    <Typography >
                        Raspunsuri numar: {items.lista["Raspunsuri_numar"]}
                    </Typography>
                    <div className={classes.raspunsuriDiv}>
                        <Typography>
                            Raspunsuri corecte:
                        </Typography>
                        <Button variant='contained' color={items.lista["Raspunsuri"][0] === 1 ? "secondary" : ""}>
                            a)
                        </Button>
                        <Button variant='contained' color={items.lista["Raspunsuri"][1] === 1 ? "secondary" : ""}>
                            b)
                        </Button>
                        <Button variant='contained' color={items.lista["Raspunsuri"][2] === 1 ? "secondary" : ""}>
                            c)
                        </Button>
                        <Button variant='contained' color={items.lista["Raspunsuri"][3] === 1 ? "secondary" : ""}>
                            d)
                        </Button>
                        <Button variant='contained' color={items.lista["Raspunsuri"][4] === 1 ? "secondary" : ""}>
                            e)
                        </Button>
                    </div>
                </Paper>
                <Typography variant = "h6" className={classes.typography}>
                   Cum vrei sa schimbi grila:
                </Typography>
                <Paper className={classes.paper}>
                    <Typography >
                        Id grila: {state}
                    </Typography>
                    <div className={classes.tipGrileDiv}>
                        <Typography>
                            Tip Grila:
                        </Typography>
                        <Button variant='contained' color={itemsModificate.lista["TipGrile"] === "CS" ? "secondary" : ""}>
                            CS
                        </Button>
                        <Button variant='contained' color={itemsModificate.lista["TipGrile"] === "CM" ? "secondary" : ""}>
                            CM
                        </Button>
                    </div>
                    <Typography >
                        
                    </Typography>
                    <Typography >
                        a){/* a) {grilaPrimita.Variante_a} */}
                    </Typography>
                    <Typography >
                        b){/* b) {grilaPrimita.Variante_b} */}
                    </Typography>
                    <Typography >
                        c){/* c) {grilaPrimita.Variante_c} */}
                    </Typography>
                    <Typography >
                        d){/* d) {grilaPrimita.Variante_d} */}
                    </Typography>
                    <Typography >
                        e){/* e) {grilaPrimita.Variante_e} */}
                    </Typography>
                    <div className={classes.raspunsuriDiv}>
                        <Typography>
                            Raspunsuri corecte:
                        </Typography>
                        <Button variant='contained' disabled>
                            a)
                        </Button>
                        <Button variant='contained' disabled>
                            b)
                        </Button>
                        <Button variant='contained' disabled>
                            c)
                        </Button>
                        <Button variant='contained' disabled>
                            d)
                        </Button>
                        <Button variant='contained' disabled>
                            e)
                        </Button>
                    </div>
                    <div className={classes.divButton}>
                        <div/>
                        <Button 
                        variant="contained" 
                        color="secondary" 
                        className={classes.button}
                        
                        >
                            Update grila
                        </Button>
                    </div>
                </Paper>
                <Typography variant = "h6" className={classes.typography}>
                   Complaints:
                </Typography>
                <Paper className={classes.paper}>
                    aici vor veni reports-urile
                </Paper>
                </> : null
            }
        </Container>
    </div>
    );
}