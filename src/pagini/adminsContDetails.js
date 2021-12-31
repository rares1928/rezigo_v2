import React, {useState, useEffect} from 'react';
import { callApi } from '../utils/callApi';
import { Helmet } from 'react-helmet';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLocation, useHistory } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AdminsDataTable from '../componente/adminsTestsTable';

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
    papper:{
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    inputDiv:{
        display: "flex",
        flexDirection: "row",
        alignItems:"center",
    },
    input: {
        width: 70,
        marginLeft: theme.spacing(1),
    },
    actions: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    button: {
        width: theme.spacing(30),
        margin: theme.spacing(1),
    },
  }));



export default function AdminsContDetails() {
    const [stergeCont, setStergeCont] = useState(false);
    const [ready, setReady] = useState(false);
    const [items, setItems] = useState({});
    const [bonusPremium, setBonusPremium] = useState(0);
    let history = useHistory();
    const { state } = useLocation();

    const handleErrorDeleteCont = (e) => { 
        history.push({ pathname: "/" });
    }

    const adaugaZile = async () => {
        const url = "https://grileapiwin.azurewebsites.net/api/AdaugaPremium?code=OZAIohuveOx7jZrRajoybvxIf5/oHgZqS8lomQY0gx9S1Ttqm5Q4XA==";
        await callApi(url, {email: items.email, zile: bonusPremium}, () => {}, () => {} );
        window.location.reload();
    }

    const deleteCont = async () => {
        const url = "https://grileapiwin.azurewebsites.net/api/DeleteCont?code=zA/JjdpHkS0NCVpMAk3LkGT7BMw5NhHOl5l6yQtPpC4eza7lGXWQsQ==";
        await callApi(url, {email: items.email}, ()=>{}, handleErrorDeleteCont);
        history.push({ pathname: "/admins/conturi" });
    }

    const handleClickOpen = () => {
        setStergeCont(true);
      };
    
      const handleClose = () => {
        setStergeCont(false);
      };

    useEffect( () => {
        if(state === undefined){
            return(history.push({ pathname: "/admins/conturi" }));
        }
        const handleError = (e) => {
            console.log(e);
        }
    
        const handleItems = (e) => {
            setItems(e.data);
            setReady(true);
        };
        const url = "https://grileapiwin.azurewebsites.net/api/GetProfilAdmin?code=4kUVuDFwhhoIo5Mwmt16/O0vjwdo1syvaHvRHrj4TYAD5JGXqiyWVQ==";
        const data = {email: state};
        callApi(url, data , handleItems, handleError);
        }, [history, state])
    const classes=useStyles();
    const TITLE = "Detalii cont";
    console.log(items["lista_teste"]);
    return(
        <div className={classes.wrapperDiv}>
        <Helmet>
            <title>{TITLE}</title>
        </Helmet>
        <Container className={classes.root} maxWidth="md">
           {ready? 
                <div>
                    <Paper className={classes.papper}>
                        <Typography>
                            Email: {items.email}
                        </Typography>
                        <Divider/>
                        <Typography>
                            Nume: {items.LastName} {items.FirstName}
                        </Typography>
                        <Divider/>
                        <Typography>
                            Contul a fost creat la data de: {items.CreatedOn_zi}/{items.CreatedOn_luna}/{items.CreatedOn_an}
                        </Typography>
                        <Divider/>
                        <Typography>
                            Tip Cont: {items.tip_profil}
                        </Typography>
                        <Divider/>
                        <Typography>
                            Premium pana la: {items.ZileRamase_zi}/{items.ZileRamase_luna}/{items.ZileRamase_an}
                        </Typography>
                        <Divider/>
                        <Typography>
                            Ultima activitate: {items.LastOnline_zi}/{items.LastOnline_luna}/{items.LastOnline_an} ora: {items.LastOnline_timp}
                        </Typography>
                        <Divider/>
                        <Typography>
                            Numar de teste incepute: {items['lista_teste'].length}
                        </Typography>
                        <Divider/>
                        <Typography>
                            Numar de teste terminate: {items['lista_teste'].filter(test => test.Done === true).length}
                        </Typography>
                        <Divider/>

                        <div className={classes.actions}>
                            <div className={classes.inputDiv}>
                                <Typography>Adauga zile de premium: </Typography>
                                <Input
                                    value={bonusPremium}
                                    onChange={e => setBonusPremium(Math.min(e.target.value, 300))}
                                    color="secondary"
                                    className={classes.input}
                                    inputProps={{
                                        step: 1,
                                        min: 0,
                                        max: 300,
                                        type: 'number',

                                        'aria-labelledby': 'input-slider',
                                    }}
                                />
                            </div>
                            <Button 
                            disabled={bonusPremium === 0 || items.tip_profil === 'Dio'}
                            onClick={adaugaZile}
                            className={classes.button} 
                            color="secondary" 
                            variant="contained"
                            > 
                            Adauga {bonusPremium} zile! 
                            </Button>
                        </div>
                        <Divider/>
                        <div className={classes.actions}>
                            <div className={classes.inputDiv}>
                                <Typography>Sterge cont forever </Typography>
                            </div>
                            <Button 
                            disabled={items.tip_profil === 'Dio'}
                            onClick={()=> handleClickOpen()}
                            className={classes.button} 
                            color="primary" 
                            variant="contained"> 
                                Sterge contul {items.Email} 
                            </Button>
                        </div>
                    </Paper>
                    <Paper className={classes.papper}>
                        <AdminsDataTable rows ={items["lista_teste"].sort((a,b) => a.Done - b.Done )} />
                    </Paper>
                </div> : <CircularProgress/>
            }
        </Container>
        <Dialog
            open={stergeCont}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Sigur vrei sa stergi contul {items.Email}? </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                Vei sterge din baza de date toate datele despre acest cont, inclusiv testele, intrebarile la care a raspuns si rapoartele.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button variant="contained" onClick={handleClose} color="secondary">
                Nu vreau sa sterg contul
            </Button>
            <Button variant="contained" onClick={deleteCont} color="primary" autoFocus>
                Vreau sa sterg contul
            </Button>
            </DialogActions>
        </Dialog>
    </div>
    );
}