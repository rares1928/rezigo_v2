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
import { useHistory } from 'react-router-dom';
import { CircularProgress, Divider } from '@material-ui/core';


const useStyles = makeStyles((theme)=>({
    wrapperDiv:{
        display: "flex",
        flexDirection: "column",
        minHeight: "calc(100vh - calc(8 * 8px))",
        justifyContent: "space-between",
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: theme.spacing(16),
      },
    root: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
    selectDiv:{
        marginBottom: theme.spacing(1),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    paper:{
        marginBottom: theme.spacing(3),
    },
    textFieldDiv: {
        width: "95%",
        margin: theme.spacing(1),
    },
    typography:{
        marginLeft: theme.spacing(1),
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


export default function AdminsDisplayGrile() {
    const [carte, setCarte] = useState('');
    const [capitol, setCapitol] =useState(-1);
    const [subCapitol, setSubCapitol] =useState(-1);
    // const [ordine, setOrdine] =useState('');
    const [textPartialGrila, setTextPartialGrila] = useState("");
    const [listaCat, setListaCat] = useState([]);
    const [items, setItems] = useState({});
    const [loading, setLoading] = useState(false);
    const [showGrileList, setShowGrileList] = useState(false);
    const [ready, setReady] = useState(false);
    let history = useHistory();

    useEffect( () => {
        const handleError1 = (e) => {
            if(e === 403){
                history.push({ pathname: "/" });
            }
            else{
                console.log(e);
            }
            setLoading(false);
        }
        const url = "https://grileapiwin.azurewebsites.net/api/GetCategoriiAdmin?code=S5MkCQa6aai1rR47PEL1AB3QwiaG2Fe522pJLONtsmhHGmPj6re45w==";
        const data = {};
        callApi(url, data , handleListaCat, handleError1);
    }, [history])

    const handleError = (e) => {
        if(e === 403){
            history.push({ pathname: "/" });
        }
        else{
            console.log(e);
        }
        setLoading(false);
    }

    const handleListaCat = (e) => {
        setListaCat(e.data["lista"]);
        setReady(true);
    };
    const handleItems = (e) => {
        setItems(e.data);
        setLoading(false);
    }

    const handleChangeCarte = (event) => {
        setCarte(event.target.value);
        setShowGrileList(false);
        setItems({});
        setCapitol(-1);
        setSubCapitol(-1);
    };
    const handleChangeCapitol = (event) => {
        setCapitol(event.target.value);
        setShowGrileList(false);
        setItems({});
        setSubCapitol(-1);
    };
    const handleChangeSubCapitol = (event) => {
        setShowGrileList(false);
        setItems({});
        setSubCapitol(event.target.value);
    };
    // const handleChangeOrdine = (event) => {
    //     setOrdine(event.target.value);
    // };
    
    const cautaGrile = async () => {
        setLoading(true);
        setShowGrileList(false);
        setItems({});
        const data = {
            carte: carte, 
            capitol: listaCat[capitol]["category_Name"], 
            subcapitol: listaCat[capitol]["subCategory"][subCapitol]["Name"],
            textPartialGrila: textPartialGrila,
        }
        const url = "https://grileapiwin.azurewebsites.net/api/CautaGrileAdmin?code=ip64oSUrfBheQN110qwIjK/jQsx7hmxgQrb0Tpy6BDmIG8TBPE/nag==";
        await callApi(url, data, handleItems, handleError);
        //sleep(1000).then(() => setShowGrileList(true));
        setShowGrileList(true);
        setLoading(false);
    }

    const editGrila = (id) => {
        return(history.push({ pathname: "/admins/grile/id"+id, state: id }));
    }

    const classes=useStyles();
    const TITLE = "admins";
    return(
        <div className={classes.wrapperDiv}>
        <Helmet>
            <title>{TITLE}</title>
        </Helmet>
        <Container className={classes.root} maxWidth="md">
            {!ready? <CircularProgress/>:
                <>
                <Typography className={classes.selectInstructions}>Alege, in aceasta ordine cartea, capitolul, subcapitolul. Ordinea repriznta modul in care vor fi afisate grilele.</Typography>
                <Paper className={classes.paper}>
                    <div className={classes.paper}>
                    <FormControl variant="outlined" color="secondary" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Cartea</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={carte}
                        onChange={handleChangeCarte}
                        label="cartea"
                        autoWidth
                        >
                            <MenuItem value="" disabled>
                                Alege cartea
                            </MenuItem>
                            <MenuItem value={"Kumar"}>Kumar</MenuItem>
                            <MenuItem value={"Sinopsis"}>Sinopsis</MenuItem>
                            <MenuItem value={"Chirurgie"}>Chirurgie</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" color="secondary" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Capitolul</InputLabel>
                        <Select
                        disabled={carte === ""}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={capitol}
                        onChange={handleChangeCapitol}
                        label="capitolul"
                        autoWidth
                        >
                            <MenuItem value={-1} disabled>
                                Alege capitolul
                            </MenuItem>
                            {listaCat.map((categorie, index) => carte !== categorie["book"]? null : <MenuItem key={carte+"."+String(index)} value={index}>{categorie["category_Name"]}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" color="secondary" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Subcapitolul</InputLabel>
                        <Select
                        disabled={capitol === "" || capitol === -1}
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={subCapitol}
                        onChange={handleChangeSubCapitol}
                        label="subcapitolul"
                        autoWidth
                        >
                            <MenuItem value={-1} disabled>
                                Alege subcapitolul
                            </MenuItem>
                            {capitol === -1? null : listaCat[capitol]["subCategory"].map((subcategorie, index) => <MenuItem key={carte+"."+String(capitol)+"."+String(index)} value={index}>{subcategorie["Name"]}</MenuItem>)}
                        </Select>
                    </FormControl>
                    {/* <FormControl variant="outlined" color="secondary" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Ordoneaza</InputLabel>
                        <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={ordine}
                        onChange={handleChangeOrdine}
                        label="Ordoneaza"
                        autoWidth
                        >
                            <MenuItem value="" disabled>
                                Ordoneaza dupa
                            </MenuItem>
                            <MenuItem value={"NumReport"}>Nr. rapoarte</MenuItem>
                            <MenuItem value={"GrilaID"}>Nr. ID</MenuItem>
                        </Select>
                    </FormControl> */}
                    </div>
                    <Typography className={classes.typography}>
                        Vreau ca enuntul grilei sa contina acest pasaj: (lasa necompletat daca doresti sa vezi toate grilele)
                    </Typography>
                    <div className={classes.textFieldDiv}>
                        <TextField
                            color="secondary"
                            variant="outlined"
                            fullWidth
                            name="enuntPartialGrile"
                            label="Enunt partial grila"
                            id="enunt_partial_grila"
                            value={textPartialGrila}
                            onInput={e => setTextPartialGrila(e.target.value)}
                            
                        />
                    </div>
                    <div className={classes.divButton}>
                        <div/>
                        <Button 
                        disabled={carte === "" || capitol === "" || subCapitol === "" }
                        variant="contained" 
                        color="secondary" 
                        className={classes.button}
                        onClick={cautaGrile}
                        >
                            Cauta
                        </Button>
                    </div>
                </Paper>
                {
                    loading? <CircularProgress/> :
                    <Paper className={classes.paper}>
                    {
                        showGrileList?
                        <div className={classes.grileListDiv}>
                        {
                            items["lista"].sort((a,b) => b["NumReport"] - a["NumReport"]).map((grilaPrimita, index)=> 
                                <div className={classes.grilaDiv} key= {"capitolul_"+capitol+"_grila:"+String(index)}>
                                    <Typography variant = "h6">
                                        Numar reports: {grilaPrimita.NumReport}
                                    </Typography>
                                    <Typography variant = "h6">
                                        Id grila: {grilaPrimita.GrilaID}
                                    </Typography>
                                    <Typography >
                                        {grilaPrimita.Intrebare}
                                    </Typography>
                                    <Typography >
                                        a) {grilaPrimita.Variante_a}
                                    </Typography>
                                    <Typography >
                                        b) {grilaPrimita.Variante_b}
                                    </Typography>
                                    <Typography >
                                        c) {grilaPrimita.Variante_c}
                                    </Typography>
                                    <Typography >
                                        d) {grilaPrimita.Variante_d}
                                    </Typography>
                                    <Typography >
                                        e) {grilaPrimita.Variante_e}
                                    </Typography>
                                    <div className={classes.divButton}>
                                        <div/>
                                        <Button 
                                        variant="contained" 
                                        color="secondary" 
                                        className={classes.button}
                                        onClick={() => editGrila(grilaPrimita.GrilaID)}
                                        
                                        >
                                            Editeaza grila
                                        </Button>
                                    </div>
                                    <Divider/>
                                </div>
                            )
                        }
                        </div> : null
                    }
                    </Paper> 
                    }
                </>
            }
        </Container>
    </div>
    );
}