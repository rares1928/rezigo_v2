import React, {useState} from 'react';
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
    button:{
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(1),
    },
  }));


export default function AdminsDisplayGrile() {
    const [carte, setCarte] = useState('');
    const [capitol, setCapitol] =useState('');
    const [subCapitol, setSubCapitol] =useState('');
    const [ordine, setOrdine] =useState('');
    const [textPartialGrila, setTextPartialGrila] = useState("");

    const handleChangeCarte = (event) => {
        setCarte(event.target.value);
    };
    const handleChangeCapitol = (event) => {
        setCapitol(event.target.value);
    };
    const handleChangeSubCapitol = (event) => {
        setSubCapitol(event.target.value);
    };
    const handleChangeOrdine = (event) => {
        setOrdine(event.target.value);
    };

    const classes=useStyles();
    const TITLE = "admins";
    return(
        <div className={classes.wrapperDiv}>
        <Helmet>
            <title>{TITLE}</title>
        </Helmet>
        <Container className={classes.root} maxWidth="md">
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
                        <MenuItem value={10}>Kumar</MenuItem>
                        <MenuItem value={20}>Sinopsis</MenuItem>
                        <MenuItem value={30}>Medicina clinica</MenuItem>
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
                        <MenuItem value="" disabled>
                            Alege capitolul
                        </MenuItem>
                        <MenuItem value={10}>Cardiologie</MenuItem>
                        <MenuItem value={20}>Dermatologie</MenuItem>
                        <MenuItem value={30}>ATI</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" color="secondary" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Subcapitolul</InputLabel>
                    <Select
                    disabled={capitol === ""}
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={subCapitol}
                    onChange={handleChangeSubCapitol}
                    label="subcapitolul"
                    autoWidth
                    >
                        <MenuItem value="" disabled>
                            Alege subcapitolul
                        </MenuItem>
                        <MenuItem value={10}>Inimioara</MenuItem>
                        <MenuItem value={20}>Pielicica</MenuItem>
                        <MenuItem value={30}>Covid</MenuItem>
                    </Select>
                </FormControl>
                <FormControl variant="outlined" color="secondary" className={classes.formControl}>
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
                        <MenuItem value={10}>Nr. rapoarte</MenuItem>
                        <MenuItem value={20}>Nr. ID</MenuItem>
                    </Select>
                </FormControl>
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
                    disabled={carte === "" || capitol === "" || subCapitol === "" || ordine === "" }
                    variant="contained" 
                    color="secondary" 
                    className={classes.button}>
                        Cauta
                    </Button>
                </div>
            </Paper>
            <Paper className={classes.paper}>
                Aici vor veni grilele
            </Paper>
        </Container>
    </div>
    );
}