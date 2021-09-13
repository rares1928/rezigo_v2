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
        403 : "Acest cont este sau a fost folosit de pe alt dsipozitiv, pentru a putea folosi site-ul de pe dispozitivul actula te rugăm să te autentifici din nou. În cazul în care nu ai folosit acest cont pe alt dispozitiv te rugăm să îți schimbi parola, sau să ne contactezi prin e-mail.",
        409 : "Există deja un cont pe această adresă de email.",
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