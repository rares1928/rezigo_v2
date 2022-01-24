import React, {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useHistory } from 'react-router-dom';
import makeStyles from '@mui/styles/makeStyles';
import Cookies from 'universal-cookie';
import Container from '@mui/material/Container';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { callApi } from '../utils/callApi';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import { Helmet } from 'react-helmet';
import Placinta from '../componente/pieChart';
import ErrorPopup from '../componente/errorPopup';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Link from '@mui/material/Link';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

export default function ProfilePage(props) {

    const useStyles = makeStyles((theme)=>({
        paper:{
            marginBottom: theme.spacing(3),
        },
        root: {
            paddingTop: theme.spacing(6),
            paddingBottom: theme.spacing(6),
            
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            paddingRight: theme.spacing(1),
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        typographyHeader:{
            padding: theme.spacing(1),
        },
        divAccordion: {
            padding: theme.spacing(1),
        },
        accordion: {
            backgroundColor: props.darkMode? "#5c5c5c" : "#fafafa",
        },
        textField: {
            margin: theme.spacing(1),
        },
        gridButton: {
            margin: theme.spacing(1),
        },
        logoutButtonDiv:{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end"
        },
        listaItemTextLeft:{
            height: 170,
            width: 150,
            display:"flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingRight: theme.spacing(4),
        },
        placinta:{
            display: "flex",
            justifyContent: "flex-end",
        },
        linkNeterminate:{
            cursor: "pointer",
        },
    }));

    let history = useHistory();
    const classes=useStyles();

    const [ready, setReady] = useState(false);
    const [items, setItems] = useState({});
    const [error, setError] = useState(0);
    const [errorPassword, setErrorPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [succes, setSucces] = useState(false);

    const [changeLastName, setChangeLastName] = useState('');
    const [changeFirstName, setChangeFirstName] = useState('');
    const [verifyPasswordName, setVerifyPasswordName] = useState('');

    const [changeNewPassword, setChangeNewPassword] = useState('');
    const [changeNewPasswordAgain, setChangeNewPasswordAgain] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const [changeNewEmail, setChangeNewEmail] = useState('');
    const [verifyPasswordEmail, setVerifyPasswordEmail] = useState('');

    const handleError = (e) => {
        console.log(e.status)
        setError(e.status);
    }

    const handleItems = (e) => {
        setItems(e.data);
        setReady(true);
        setIsLoading(false);
    };

    const handleUpdateInfo = () => {
        setSucces(true);
    }

    useEffect( () => {
        setIsLoading(true);
        const url = "https://grileapiwin.azurewebsites.net/api/GetProfil?code=an7l2kCHdoYlNw006LoBdCzHB5U4qSVbNvpQ1r1V3TgSHtAYuMbkyw==";
        callApi(url, {}, handleItems, handleError);
    }, [])

    const delogare = () => {
        const cookies = new Cookies();
        cookies.remove('estiLogat');
        cookies.remove('accessToken');
        cookies.remove('refreshToken');
        cookies.remove('plan');
        cookies.remove('firstname');
        cookies.remove('lastname');
        history.push('/login')
    }

    const updateProfile = async (whatToUpdate, newFirstName, newLastName, password, newPassword, newEmail) => {
        setIsLoading(true);
        const data = {
            newFirstName,
            newLastName,
            password,
            newPassword,
            newEmail,
            whatToUpdate,
        }
        const url = "https://grileapiwin.azurewebsites.net/api/updatepersonainfo?code=ii/dJ8ix8TdHZc6baLlJ7yLdYy1LeNVG7gRnQZJKzZEZIb9ISQJ8Nw==";
        const url2 = "https://grileapiwin.azurewebsites.net/api/GetProfil?code=an7l2kCHdoYlNw006LoBdCzHB5U4qSVbNvpQ1r1V3TgSHtAYuMbkyw==";
        await callApi(url, data, handleUpdateInfo , handleError);
        await callApi(url2, {}, handleItems, handleError);
        setIsLoading(false);
    }

    const handleCloseAlert = () => {
        setSucces(false);
    };

    const TITLE = 'Profil';

    return(
        <>
        <Snackbar open={succes === true && isLoading === false } autoHideDuration={3000} onClose={handleCloseAlert}>
            <Alert onClose={handleCloseAlert} severity="success">
                <Typography>
                    Informația a fost actualizată cu succes!
                </Typography>
            </Alert>
        </Snackbar>
        <ErrorPopup errorStatus={error} setError={setError} />
        <Container className={classes.root} maxWidth="sm">

            <Helmet>
                <title>{ TITLE }</title>
            </Helmet>

            <ErrorPopup errorStatus={error} />

            <Paper className={classes.paper}>
                <Typography className={classes.typographyHeader} variant="h5">Informații personale:</Typography>
                {!ready? <CircularProgress/> :
                <div className={classes.divAccordion}>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                            expandIcon={<EditIcon color='secondary'/> }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}>Nume: </Typography>
                            <Typography className={classes.secondaryHeading}> {items.LastName} {items.FirstName} </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container direction="column">
                                <Grid item >
                                    <TextField 
                                    size="small"
                                    className={classes.textField} 
                                    label="Parolă" 
                                    error={error === 400}
                                    variant="outlined" 
                                    color="secondary" 
                                    type="password" 
                                    onInput={e => setVerifyPasswordName(e.target.value)}/>
                                </Grid>
                                <Grid item >    
                                    <TextField 
                                    size="small"
                                    className={classes.textField} 
                                    label={items.LastName}
                                    variant="outlined" 
                                    color="secondary" 
                                    onInput={e => setChangeLastName(e.target.value)}/>
                                    <TextField 
                                    size="small"
                                    className={classes.textField} 
                                    label={items.FirstName} 
                                    variant="outlined" 
                                    color="secondary" 
                                    onInput={e => setChangeFirstName(e.target.value)}/>
                                </Grid>
                                <Grid className={classes.gridButton} item>
                                    <Button 
                                    variant="contained" 
                                    disabled={changeLastName === '' || changeFirstName === '' || verifyPasswordName === '' || isLoading} 
                                    color="secondary" 
                                    onClick={() => {updateProfile("name", changeFirstName, changeLastName, verifyPasswordName, null, null)}}
                                    >
                                        {isLoading? <CircularProgress/> :
                                        <>Schimbă Numele</>}
                                    </Button>
                                    {error === 400? <Typography color="error">Nu ai introdus corect parola!</Typography> : null}
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                            expandIcon={<EditIcon color='secondary'/> }
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className={classes.heading}>Parolă</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container direction="column">
                                <Grid item >
                                    <TextField 
                                    size="small"
                                    className={classes.textField} 
                                    error={error === 400}
                                    label="Parolă veche" 
                                    variant="outlined" 
                                    color="secondary" 
                                    type="password" 
                                    onInput={e => setVerifyPassword(e.target.value)}/>
                                </Grid>
                                <Grid item >    
                                    <TextField 
                                    size="small"
                                    className={classes.textField} 
                                    label="Parolă nouă" 
                                    error={errorPassword}
                                    variant="outlined" 
                                    color="secondary" 
                                    type="password" 
                                    onInput={e => setChangeNewPassword(e.target.value)}/>
                                    <TextField 
                                    size="small"
                                    className={classes.textField} 
                                    label="Reintrodu parola nouă" 
                                    error={errorPassword}
                                    variant="outlined" 
                                    color="secondary" 
                                    type="password" 
                                    onInput={e => setChangeNewPasswordAgain(e.target.value)}/>
                                </Grid>
                                <Grid className={classes.gridButton} item>
                                    <Button 
                                    variant="contained" 
                                    disabled={isLoading || verifyPassword === '' || changeNewPassword === '' || changeNewPasswordAgain === ''} 
                                    color="secondary" 
                                    onClick={() => {
                                        if(changeNewPassword === changeNewPasswordAgain){
                                        setErrorPassword(false)
                                        updateProfile("password", null, null, verifyPassword, changeNewPassword, null)
                                        }else{
                                            setErrorPassword(true)
                                        }
                                    }}
                                        >
                                        {
                                        isLoading? <CircularProgress/>:<>Schimbă Parola</> 
                                        }
                                    </Button>
                                    {error === 400? <Typography color="error">Nu ai introdus corect parola!</Typography> : null}
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                            expandIcon={<EditIcon color='secondary'/> }
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className={classes.heading}>Email</Typography>
                            <Typography className={classes.secondaryHeading}> {items.email} </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container direction="column">
                                <Grid item >
                                    <TextField 
                                    size="small"
                                    className={classes.textField} 
                                    label="Parolă" 
                                    error={error === 400}
                                    variant="outlined" 
                                    color="secondary" 
                                    type="password"
                                    onInput={e => setVerifyPasswordEmail(e.target.value)}/>
                                </Grid>
                                <Grid item >    
                                    <TextField 
                                    size="small"
                                    className={classes.textField} 
                                    label="Email nou" 
                                    variant="outlined" 
                                    color="secondary" 
                                    onInput={e => setChangeNewEmail(e.target.value)}/>
                                </Grid>
                                <Grid className={classes.gridButton} item>
                                    <Button 
                                    variant="contained" 
                                    disabled={isLoading || verifyPasswordEmail === '' || changeNewEmail === ''} 
                                    onClick={() => {updateProfile("email", null, null, verifyPasswordEmail, null, changeNewEmail)}} 
                                    color="secondary">
                                        {isLoading? <CircularProgress/>:
                                        <>Schimbă Email</>}
                                    </Button>
                                    {error === 400? <Typography color="error">Nu ai introdus corect parola!</Typography> : null}
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                    <AccordionSummary
                    disabled={!(items["tip_profil"] === "Premium")}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                    >
                        <Typography className={classes.heading}>Tip Cont</Typography>
                        <Typography className={classes.secondaryHeading}>{items["tip_profil"]}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="row">
                            {(items["tip_profil"] === "Premium") ?

                                <Typography> Valabil până la: {items.zi}/{items.luna}/{items.an} </Typography> :
                                null
                            }
                            {!(items["tip_profil"] === "Premium") ?
                            <Grid className={classes.gridButton} item>
                                    <Button variant="contained" color="secondary">Cumpără Premium</Button>
                            </Grid> : null
                            }          
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                </div>
                }
                <div className={classes.logoutButtonDiv}>
                <Button className={classes.gridButton} variant="contained" color="secondary" onClick={() => delogare()}> Delogare </Button>
                </div>
            </Paper>
            <Paper className={classes.paper}>
                <Typography className={classes.typographyHeader} variant="h5">Teste: </Typography>
                {
                !ready? <CircularProgress/> :
                <div className={classes.divAccordion}>
                    <List className={classes.accordion}>
                        <ListItem className={classes.listItem}>
                            <Placinta 
                                className={classes.placinta}
                                data={[
                                    ['Teste', 'număr'],
                                    ['Terminate', items["lista_teste"].filter((test) => test["Done"] === true).length],
                                    ['Neterminate', items["lista_teste"].filter((test) => test["Done"] === false).length]
                                ]}
                                darkMode = {props.darkMode}
                            />
                        </ListItem>
                        <ListItem>
                            <Typography>
                                Începute: {items["lista_teste"].length } 
                            </Typography>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Typography>
                                Terminate: {items["lista_teste"].filter((test) => test["Done"] === true).length } 
                            </Typography>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Typography>
                            <Link className={classes.linkNeterminate} color = "secondary" onClick = {() => {history.push({ pathname: "/creeaza-ti_test", state: {from: "profile"} })}}> 
                                Neterminate
                            </Link>
                            : {items["lista_teste"].filter((test) => test["Done"] === false).length } 
                            </Typography>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Typography>Media scorurilor testelor terminate: {(items["lista_teste"].filter((test) => test["Done"] === true).reduce((acc,val) => acc + val["Score"], 0) / items["lista_teste"].filter((test) => test["Done"] === true).reduce((acc, val) => acc + val["NumAnswered"],0) *100).toPrecision(3) }% (echivalentul a {(items["lista_teste"].filter((test) => test["Done"] === true).reduce((acc,val) => acc + val["Score"], 0) / items["lista_teste"].filter((test) => test["Done"] === true).reduce((acc, val) => acc + val["NumAnswered"],0) *950).toPrecision(2)}/950) </Typography>
                        </ListItem>
                    </List>
                </div>
                }
            </Paper>
            <Paper className={classes.paper}>
                <Typography className={classes.typographyHeader} variant="h5">Grile rezolvate: </Typography>
                {
                !ready? <CircularProgress/> :
                <div className={classes.divAccordion}>
                    <List className={classes.accordion}>
                        <ListItem className={classes.listItem}>
                            <Placinta 
                                className={classes.placinta}
                                data={[
                                    ['Grile', 'număr'],
                                    ['Corecte', items["lista_teste"].reduce((acc, val) => acc + val["Score"] , 0 )],
                                    ['Greșite', items["lista_teste"].reduce((acc, val) => acc + (val["NumAnswered"] - val["Score"]), 0 )]
                                ]}
                                darkMode = {props.darkMode}
                            />
                        </ListItem>
                        <ListItem>
                            <Typography>Total: {items["lista_teste"].reduce((acc, val) => acc + val["NumAnswered"], 0 )} </Typography>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Typography>Corecte: {items["lista_teste"].reduce((acc, val) => acc + val["Score"] , 0 )} </Typography>
                        </ListItem>
                        <Divider />
                        <ListItem>
                            <Typography>Greșite: {items["lista_teste"].reduce((acc, val) => acc + (val["NumAnswered"] - val["Score"]), 0 )} </Typography>
                        </ListItem>
                        <Divider />
                    </List>
                </div>
                }
            </Paper>
        </Container>
        </>
    );
}