import React, {useEffect, useState} from 'react';
import { Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import CircularProgress  from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { callApi } from '../utils/callApi';
import { useLocation, useHistory } from 'react-router-dom';

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
        width: "85%",
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
    reportsDiv:{
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    }));

export default function AdminsEditGrila() {

    const [items, setItems] = useState({});
    const [ready, setReady] = useState(false);
    const [tipGrila, setTipGrila] = useState("");
    const [intrebare, setIntrebare] = useState("");
    const [varA, setVarA] = useState("");
    const [varB, setVarB] = useState("");
    const [varC, setVarC] = useState("");
    const [varD, setVarD] = useState("");
    const [varE, setVarE] = useState("");
    const [raspA, setRaspA] = useState("");
    const [raspB, setRaspB] = useState("");
    const [raspC, setRaspC] = useState("");
    const [raspD, setRaspD] = useState("");
    const [raspE, setRaspE] = useState("");
    const [showFormular, setShowFormular] = useState(false);
    const [textMail, setTextMail] = useState("");
    const { state } = useLocation();
    let history = useHistory();

    console.log(items.lista);

    useEffect( () => {
        const handleError = (e) => {
            if(e === 403){
                history.push({ pathname: "/" });
            }
            else{
                console.log(e);
            }
            setReady(false);
        }
        const handleItems = (e) => {
            setItems(e.data);
            setTipGrila(e.data.lista["TipGrile"]);
            setIntrebare(e.data.lista["Intrebare"]);
            setVarA(e.data.lista["Variante"][0]);
            setVarB(e.data.lista["Variante"][1]);
            setVarC(e.data.lista["Variante"][2]);
            setVarD(e.data.lista["Variante"][3]);
            setVarE(e.data.lista["Variante"][4]);
            setRaspA(e.data.lista["Raspunsuri"][0]);
            setRaspB(e.data.lista["Raspunsuri"][1]);
            setRaspC(e.data.lista["Raspunsuri"][2]);
            setRaspD(e.data.lista["Raspunsuri"][3]);
            setRaspE(e.data.lista["Raspunsuri"][4]);
            setReady(true);
        }
        if(state === undefined){
            return(history.push({ pathname: "/admins/grile" }));
        }
        const url = "https://grileapiwin.azurewebsites.net/api/GetGrilaAdmin?code=CCuH1t1ZUm70fO52wBiKbTcVFiEjFuZVOH7rBShs0cuJOaI1qdWt9Q==";
        const data = {grilaId: state};
        callApi(url, data , handleItems, handleError);
    }, [history, state])

    const createMail = (indexReport ) => {
        setTextMail("");
        const textInitialMail = "Salutare! \n \nÎn data de " + items.lista["Reports"][indexReport]["CreatedOn"].split("T")[0] + " ai trimis reportul: \n'" + items.lista["Reports"][indexReport]["Complaint"] + "'\npentru grila: \n" + items.lista["Intrebare"] + "\n a) " + items.lista["Variante"][0]+ "\n b) " + items.lista["Variante"][1]+ "\n c) " + items.lista["Variante"][2]+ "\n d) " + items.lista["Variante"][3]+ "\n e) " + items.lista["Variante"][4] + "\n\n\n" + "Toate cele bune!\nEchipa ReziGo!";
        setTextMail(textInitialMail);
        setShowFormular(true);
    }
    
    const deleteReport = (emailReport, complaint) => {
        const handleError = (e) => {
            if(e === 403){
                history.push({ pathname: "/" });
            }
            else{
                console.log(e);
            }
        }
        const url = "https://grileapiwin.azurewebsites.net/api/deletereportadmin?code=haeOuBen/j143Sf5piYPwrf5wOxzaiexasond4uroUaLJsTONKU5MA==";
        const data = {grilaId: state, emailReport: emailReport, complaint: complaint};
        callApi(url, data, succes, handleError);
    }

    const updateGrila = () => {
        const handleError = (e) => {
            if(e === 403){
                history.push({ pathname: "/" });
            }
            else{
                console.log(e);
            }
            setReady(false);
        }
        const url = "https://grileapiwin.azurewebsites.net/api/EditeazaGrila?code=Mik8i81eKx/6UL8G21W3LRpNSgm2naWAT07Ub4FB7rQreyHgm/OkVQ==";
        const data = {
            Intrebare: intrebare,
            GrilaId: state,
            Raspunsuri: [raspA, raspB, raspC, raspD, raspE],
            Raspunsuri_numar: 16 * raspA + 8 *raspB + 4 * raspC + 2*raspD + raspE,
            TipGrile: tipGrila,
            Variante: [varA, varB, varC, varD, varE],
            Explicatii: items.lista["Explicatii"]
        }
        callApi(url, data, succes, handleError);
    }
    const succes = () => {
        window.location.reload();
    }


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
                    <Typography >
                        Autor: {items.lista["Autor"]}
                    </Typography>
                    <Typography >
                        Carte:{items.lista["Carte"]} ; Capitol: {items.lista["Categorie"]} ; Sub capitol: {items.lista["SubCategorie"]}
                    </Typography>
                    <div className={classes.tipGrileDiv}>
                        <Typography>
                            Tip Grila:
                        </Typography>
                        <Button disableElevation variant='contained' color={items.lista["TipGrile"] === "CS" ? "secondary" : "inherit"}>
                            CS
                        </Button>
                        <Button disableElevation variant='contained' color={items.lista["TipGrile"] === "CM" ? "secondary" : "inherit"}>
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
                        Explicatii: {items.lista["Explicatii"]}
                    </Typography>
                    <Typography >
                        Raspunsuri numar: {items.lista["Raspunsuri_numar"]}
                    </Typography>
                    <div className={classes.raspunsuriDiv}>
                        <Typography>
                            Raspunsuri corecte:
                        </Typography>
                        <Button disableElevation variant='contained' color={items.lista["Raspunsuri"][0] === 1 ? "secondary" : "inherit"}>
                            a)
                        </Button>
                        <Button disableElevation variant='contained' color={items.lista["Raspunsuri"][1] === 1 ? "secondary" : "inherit"}>
                            b)
                        </Button>
                        <Button disableElevation variant='contained' color={items.lista["Raspunsuri"][2] === 1 ? "secondary" : "inherit"}>
                            c)
                        </Button>
                        <Button disableElevation variant='contained' color={items.lista["Raspunsuri"][3] === 1 ? "secondary" : "inherit"}>
                            d)
                        </Button>
                        <Button disableElevation variant='contained' color={items.lista["Raspunsuri"][4] === 1 ? "secondary" : "inherit"}>
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
                    <Typography >
                        Autor: {items.lista["Autor"]}
                    </Typography>
                    <Typography >
                        Carte:{items.lista["Carte"]} ; Capitol: {items.lista["Categorie"]} ; Sub capitol: {items.lista["SubCategorie"]}
                    </Typography>
                    <div className={classes.tipGrileDiv}>
                        <Typography>
                            Tip Grila:
                        </Typography>
                        <Button 
                        disableElevation
                        variant="contained"
                        color={tipGrila === "CS" ? "secondary" : "inherit"}
                        onClick={() => {setTipGrila("CS")}}
                        >
                            CS
                        </Button>
                        <Button 
                        disableElevation
                        variant="contained"
                        color={tipGrila === "CM" ? "secondary" : "inherit"}
                        onClick={() => {setTipGrila("CM")}}
                        >
                            CM
                        </Button>
                    </div>
                    <div className={classes.textFieldDiv}> 
                        <TextField
                            color="secondary"
                            name="Intrebare"
                            variant="outlined"
                            required
                            fullWidth
                            id="Intrebare"
                            label="Intrebare"
                            autoFocus
                            value={intrebare}
                            onInput={e => setIntrebare(e.target.value)}
                            multiline
                                
                        />
                    </div>
                    <div className={classes.textFieldDiv}> 
                        <TextField
                            color="secondary"
                            name="varA"
                            variant="outlined"
                            required
                            fullWidth
                            id="varA"
                            label="a)"
                            autoFocus
                            value={varA}
                            onInput={e => setVarA(e.target.value)}
                            multiline
                                
                        />
                    </div>
                    <div className={classes.textFieldDiv}> 
                        <TextField
                            color="secondary"
                            name="varB"
                            variant="outlined"
                            required
                            fullWidth
                            id="varB"
                            label="b)"
                            autoFocus
                            value={varB}
                            onInput={e => setVarB(e.target.value)}
                            multiline
                                
                        />
                    </div>
                    <div className={classes.textFieldDiv}> 
                        <TextField
                            color="secondary"
                            name="varC"
                            variant="outlined"
                            required
                            fullWidth
                            id="varC"
                            label="c)"
                            autoFocus
                            value={varC}
                            onInput={e => setVarC(e.target.value)}
                            multiline
                                
                        />
                    </div>
                    <div className={classes.textFieldDiv}> 
                        <TextField
                            color="secondary"
                            name="varD"
                            variant="outlined"
                            required
                            fullWidth
                            id="varD"
                            label="d)"
                            autoFocus
                            value={varD}
                            onInput={e => setVarD(e.target.value)}
                            multiline
                                
                        />
                    </div>
                    <div className={classes.textFieldDiv}> 
                        <TextField
                            color="secondary"
                            name="varE"
                            variant="outlined"
                            required
                            fullWidth
                            id="varE"
                            label="e)"
                            autoFocus
                            value={varE}
                            onInput={e => setVarE(e.target.value)}
                            multiline
                                
                        />
                    </div>
                    <Typography>
                        Raspunsuri numar: {16 * raspA + 8 *raspB + 4 * raspC + 2*raspD + raspE}
                    </Typography>
                    <div className={classes.raspunsuriDiv}>
                        <Typography>
                            Raspunsuri corecte:
                        </Typography>
                        <Button 
                        variant='contained' 
                        color={raspA === 1 ? "secondary" : "inherit"}
                        onClick={() => setRaspA(raspA === 1 ? 0: 1)}
                        >
                            a)
                        </Button>
                        <Button 
                        variant='contained' 
                        color={raspB === 1 ? "secondary" : "inherit"}
                        onClick={() => setRaspB(raspB === 1 ? 0: 1)}
                        >
                            b)
                        </Button>
                        <Button 
                        variant='contained' 
                        color={raspC === 1 ? "secondary" : "inherit"}
                        onClick={() => setRaspC(raspC === 1 ? 0: 1)}
                        >
                            c)
                        </Button>
                        <Button 
                        variant='contained' 
                        color={raspD === 1 ? "secondary" : "inherit"}
                        onClick={() => setRaspD(raspD === 1 ? 0: 1)}
                        >
                            d)
                        </Button>
                        <Button 
                        variant='contained' 
                        color={raspE === 1 ? "secondary" : "inherit"}
                        onClick={() => setRaspE(raspE === 1 ? 0: 1)}
                        >
                            e)
                        </Button>
                    </div>
                    <div className={classes.divButton}>
                        <div/>
                        <Button 
                        variant="contained" 
                        color="secondary" 
                        className={classes.button}
                        onClick={updateGrila}
                        >
                            Update grila
                        </Button>
                    </div>
                </Paper>
                <Typography variant = "h6" className={classes.typography}>
                   Complaints:
                </Typography>
                <Paper className={classes.paper}>
                    {items.lista["Reports"].length === 0? <Typography>Nu exista niciun report</Typography>: 
                        <div>
                            {items.lista["Reports"].map((report, index) => 
                            <div key={"report_numar_"+ String(index)} className={classes.reportsDiv}>
                                <Typography>
                                    Creat la: {report["CreatedOn"].split('T')[0]} ora: {report["CreatedOn"].split('T')[1].replace('00','')}
                                </Typography>
                                <Typography>
                                    Email: {report["Email"]}
                                </Typography>
                                <Typography>
                                    Complaint: {report["Complaint"]}
                                </Typography>
                                <div className={classes.divButton}>
                                    <Button 
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.button}
                                    onClick={()=>{createMail(index)}}
                                    >
                                        Formular raspuns
                                    </Button>
                                    <Button 
                                    variant="contained" 
                                    color="primary" 
                                    className={classes.button}
                                    onClick={()=>{deleteReport(report["Email"], report["Complaint"])}}
                                    >
                                        Sterge report
                                    </Button>
                                </div>
                                <Divider/>
                            </div>
                            )}
                        </div>
                    }
                </Paper>
                {showFormular ?
                    <Paper className={classes.paper}>
                        <Typography className={classes.reportsDiv}>
                            Scrie mai jos mesajul mailului pe care vrei sa il trimiti:
                        </Typography>
                        <TextField
                            className={classes.textFiled}
                            id="outlined-multiline-static"
                            label={"Raspuns complaint"}
                            multiline
                            
                            value={textMail}
                            variant="outlined"
                            fullWidth
                            onInput={e => setTextMail(e.target.value)}
                            required
                        />
                        <div className={classes.divButton}>
                            <div/>
                            <Button
                                onClick={() => {console.log(textMail)}}  
                                variant="contained" 
                                color="secondary" 
                                className={classes.button}
                                
                            >
                            {/* {loading? <CircularProgress color="secondary" /> : */}
                                <Typography>
                                    Trimite mailul
                                </Typography>
                            
                            </Button>
                        </div>
                    </Paper> : null
                    }
                </> : <CircularProgress/>
                
            }
        </Container>
    </div>
    );
}