import { React } from 'react';
import { AppBar, Typography, Toolbar, makeStyles, Button, Link, Switch  } from '@material-ui/core';
import logo from '../poze/logo4.svg';

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    logo: {
        height: "65px", 
        cursor: "pointer",
    },
    menuButton: {
      flexGrow: 2,
      justifyContent: 'flex-end',
      display:"flex",
    },
    profile: {
      flexGrow: 1,
      justifyContent: 'flex-end',
      display:"flex",
    },
  }));


export default function Nav(props) {
    const classes = useStyles();

    return(
        <AppBar position="relative" >
            <Toolbar>
                <Link href="/">
                    <img 
                        src={logo} 
                        alt="logo" 
                        className={classes.logo}
                    />
                </Link>
                <div className={classes.menuButton}>
                    <Button href="/creeaza-ti_test" > <Typography variant="h5" > Test </Typography> </Button>
                    <Button href="/librarie"> <Typography variant="h5" > Librărie </Typography> </Button>
                </div>
                <div className = {classes.profile}>
                    <Switch 
                        onChange={()=> {
                            localStorage.setItem("andreeaTheme", !props.andreea);
                            props.setAndreea(!props.andreea);
                        }} 
                    />
                </div>
            </Toolbar>
        </AppBar>
   );
}