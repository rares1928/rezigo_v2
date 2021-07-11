import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function ProfilePage() {
    let history = useHistory();
    
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
        <>
            <Typography variant="h2">Profil </Typography>
            <Button variant="contained" color="secondary" onClick={() => delogare()}> Logout </Button>
        </>
    );
}