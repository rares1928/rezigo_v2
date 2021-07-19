import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme)=>({
    root: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
}));

export default function ProfilePage() {
    let history = useHistory();
    const classes=useStyles();
    
    const delogare = () => {
        const cookies = new Cookies();
        cookies.remove('estiLogat');
        cookies.remove('accessToken');
        cookies.remove('plan');
        cookies.remove('firstname');
        cookies.remove('lastname');
        history.push('/login')
    }
    
    return(
        <Container className={classes.root} maxWidth="lg">
            <Typography variant="h2">Profil </Typography>
            <Button variant="contained" color="secondary" onClick={() => delogare()}> Logout </Button>
        </Container>
    );
}