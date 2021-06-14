import { React } from 'react';
import { AppBar, Typography, Toolbar } from '@material-ui/core';


export default function Nav() {
    return(
        <AppBar position="relative">
            <Toolbar>
                <Typography variant="h6">Aici e un text care va intra in appbar</Typography>
            </Toolbar>
        </AppBar>
   );
}