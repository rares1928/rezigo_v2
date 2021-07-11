import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom';



export default function ErrorPopup(props) {
    let history = useHistory();
    const delogare = () => {
        const cookies = new Cookies();
        cookies.remove('estiLogat');
        cookies.remove('accessToken');
        cookies.remove('plan');
        cookies.remove('firstname');
        cookies.remove('lastname');
        history.push('/login')
    };
    
    const dictionarText = {
        0 : "Erroare Test",
        401 : "A apărut o eroare de conectivitate. Te rugăm să te autentifici din nou.",
        403 : "Acest cont este momentan folosit de pe alt dsipozitiv. În cazul în care nu recunoști această autentificare, te rugăm să îți schimbi parola. Dacă vrei să folosești în continuare aplicația de pe acest device, te rugăm să te autentifici din nou.",
        500 : "Se pare că serverul nostru are o problema momentan, te rugăm să încerci din nou mai târziu.",
    }
    return(
        <Dialog
            open={props.errorStatus>0? true: false}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Eroare: {props.errorStatus}
            </DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description">
                {dictionarText[props.errorStatus]}
            </DialogContentText>
            </DialogContent>
            <DialogActions>

            <Button onClick={()=> delogare()} variant="contained" color="secondary" >
                Delogare
            </Button>
            </DialogActions>
        </Dialog>

    );
}