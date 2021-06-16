import React, {useState, useEffect} from 'react';
import { AppBar, Typography, Toolbar, makeStyles, Button, ButtonGroup, IconButton, Link, Box, Grid  } from '@material-ui/core';
import logo from '../poze/logo4.svg';
import { useLocation } from 'react-router';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import LibraryBooksRoundedIcon from '@material-ui/icons/LibraryBooksRounded';
import MenuBookRoundedIcon from '@material-ui/icons/MenuBookRounded';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';

const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
    },
    logoGroup:{
        flexGrow:1
    },
    logo: {
        height: "60px", 
        cursor: "pointer",
    },
    menuButton: {
      flexGrow: 1,
      justifyContent: 'flex-end',
      alignItems:"center",
      display:"flex",
    },
  }));


export default function LayoutSite(props) {
    let location = useLocation();

    const classes = useStyles();
    const [mobileView, setMobileView] = useState(false);

    useEffect(() => {
    const setResponsiveness = () => {
        return window.innerWidth < 750
        ? setMobileView(true)
        : setMobileView(false);
    };

    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());

    return () => {
        window.removeEventListener("resize", () => setResponsiveness());
    }
    }, []);

    const displayDesktop = ()=>{
        return(
            <Toolbar>
                <div className={classes.logoGroup}>
                    <Link href="/">
                        <img 
                            src={logo} 
                            alt="logo" 
                            className={classes.logo}
                        />
                    </Link>
                </div>
                <div className = {classes.menuButton}>
                    <ButtonGroup aria-label="outlined secondary button group">
                        <Button disableElevation variant="outlined" onClick={()=> {
                                localStorage.setItem("andreeaTheme", !props.andreea);
                                props.setAndreea(!props.andreea);
                            }}  >
                            {
                                props.andreea && 
                                <Brightness7Icon />
                            }
                            {
                                !props.andreea && 
                                <>
                                    <Brightness2Icon/>
                                </>
                            }
                        </Button>
                        <Button 
                        disableElevation
                        startIcon={<MenuBookRoundedIcon/>}
                        variant={(location.pathname === "/creeaza-ti_test")? "contained": "outlined"} 
                        href="/creeaza-ti_test" > 
                            <Typography variant="h6" > 
                                Test 
                            </Typography> 
                        </Button>
                        <Button
                        disableElevation
                        startIcon= {<LibraryBooksRoundedIcon/>}
                        variant={(location.pathname === "/librarie")? "contained": "outlined"} 
                        href="/librarie"> 
                            <Typography variant="h6" > 
                                Librărie 
                            </Typography> 
                        </Button>
                        <Button 
                        startIcon={<AccountBoxRoundedIcon/>}
                        disableElevation 
                        variant={location.pathname === "/profil"? "contained":"outlined"} 
                        href="/profil">
                            <Typography variant="h6" align="center">Nume Prenume</Typography>  
                        </Button>        
                    </ButtonGroup>
                </div>
            </Toolbar>
        )
    }
    const displayMobileView = ()=>{
        return(
            <Toolbar>
                <Link href="/">
                    <img 
                        src={logo} 
                        alt="logo" 
                        className={classes.logo}
                    />
                </Link>
                <div className={classes.menuButton}>
                    <IconButton >
                        <MenuRoundedIcon/>
                    </IconButton>
                </div>
            </Toolbar>
        )
    }
    return(
        <Box 
            component="main"            
        >
            <AppBar position="relative" elevation={0}>
                {mobileView ? displayMobileView() : displayDesktop()} 
            </AppBar>
            <Grid>
                {props.children}
            </Grid>
            
        </Box>
    );
}