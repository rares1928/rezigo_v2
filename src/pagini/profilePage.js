import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'universal-cookie';
import Container from '@material-ui/core/Container';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { callApi } from '../utils/callApi';
import CircularProgress from '@material-ui/core/CircularProgress';



export default function ProfilePage(props) {

    const useStyles = makeStyles((theme)=>({
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
            padding: theme.spacing(1),
        },
        gridButton: {
            margin: theme.spacing(1),
        },
        logoutButtonDiv:{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end"
        },
    }));

    let history = useHistory();
    const classes=useStyles();
    const [name, setName] = useState('false');
    const [email, setEmail] = useState('false');
    const [password, setPassword] = useState('false');
    const [premium, setPremium] = useState('false');

    const [ready, setReady] = useState(false);
    const [items, setItems] = useState({});
    const [error, setError] = useState(0);

    const [changeLastName, setChangeLastName] = useState('');
    const [changeFirstName, setChangeFirstName] = useState('');
    const [verifyPasswordName, setVerifyPasswordName] = useState('');

    const [changeNewPassword, setChangeNewPassword] = useState('');
    const [changeNewPasswordAgain, setChangeNewPasswordAgain] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const [changeOldEmail, setChangeOldEmail] = useState('');
    const [changeNewEmail, setChangeNewEmail] = useState('');
    const [verifyPasswordEmail, setVerifyPasswordEmail] = useState('');


    const handleItems = (e) => {
        setItems(e.data);
    };

    const handleError = (e) => {
        setError(e);
    }

    useEffect( () => {
        const url = "https://grileapiwin.azurewebsites.net/api/GetProfil?code=an7l2kCHdoYlNw006LoBdCzHB5U4qSVbNvpQ1r1V3TgSHtAYuMbkyw==";
        callApi(url, {}, handleItems, handleError);
        setReady(true);
    }, [])

    const delogare = () => {
        const cookies = new Cookies();
        cookies.remove('estiLogat');
        cookies.remove('accessToken');
        cookies.remove('plan');
        cookies.remove('firstname');
        cookies.remove('lastname');
        history.push('/login')
    }
    console.log(items["tip_profil"]);
    return(
        <Container className={classes.root} maxWidth="sm">
            <Paper>
                <Typography className={classes.typographyHeader} variant="h5">Informații personale:</Typography>
                {!ready? <CircularProgress/> :
                <div className={classes.divAccordion}>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                            expandIcon={<EditIcon color='secondary'/> }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            onClick={() => {setName(!name)}}
                        >
                            <Typography className={classes.heading}>Nume: </Typography>
                            <Typography className={classes.secondaryHeading}> {items.lastName} {items.firstName} </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container direction="column">
                                <Grid item >
                                    <TextField 
                                    className={classes.textField} 
                                    label="Parolă" 
                                    variant="outlined" 
                                    color="secondary" 
                                    type="password" 
                                    onInput={e => setVerifyPasswordName(e.target.value)}/>
                                </Grid>
                                <Grid item >    
                                    <TextField 
                                    className={classes.textField} 
                                    label={items.lastName}
                                    variant="outlined" 
                                    color="secondary" 
                                    onInput={e => setChangeLastName(e.target.value)}/>
                                    <TextField 
                                    className={classes.textField} 
                                    label={items.firstName} 
                                    variant="outlined" 
                                    color="secondary" 
                                    onInput={e => setChangeFirstName(e.target.value)}/>
                                </Grid>
                                <Grid className={classes.gridButton} item>
                                    <Button 
                                    variant="contained" 
                                    disabled={changeLastName === '' || changeFirstName === '' || verifyPasswordName === ''} 
                                    color="secondary" 
                                    onClick={() => {console.log(verifyPasswordName, changeLastName, changeFirstName,)}}
                                    >
                                        Schimbă Numele
                                    </Button>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                            expandIcon={<EditIcon color='secondary'/> }
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            onClick={() => {setName(!email)}}
                        >
                            <Typography className={classes.heading}>Parolă</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container direction="column">
                                <Grid item >
                                    <TextField 
                                    className={classes.textField} 
                                    label="Parolă veche" 
                                    variant="outlined" 
                                    color="secondary" 
                                    type="password" 
                                    onInput={e => setVerifyPassword(e.target.value)}/>
                                </Grid>
                                <Grid item >    
                                    <TextField 
                                    className={classes.textField} 
                                    label="Parolă nouă" 
                                    variant="outlined" 
                                    color="secondary" 
                                    type="password" 
                                    onInput={e => setChangeNewPassword(e.target.value)}/>
                                    <TextField 
                                    className={classes.textField} 
                                    label="Reintrodu parola nouă" 
                                    variant="outlined" 
                                    color="secondary" 
                                    type="password" 
                                    onInput={e => setChangeNewPasswordAgain(e.target.value)}/>
                                </Grid>
                                <Grid className={classes.gridButton} item>
                                    <Button 
                                    variant="contained" disabled={verifyPassword === '' || changeNewPassword === '' || changeNewPasswordAgain === ''} 
                                    color="secondary" 
                                    onClick={() => {console.log(verifyPassword, changeNewPassword, changeNewPasswordAgain)}}
                                    >
                                        Schimbă Parola
                                    </Button>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                        <AccordionSummary
                            expandIcon={<EditIcon color='secondary'/> }
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            onClick={() => {setName(!password)}}
                        >
                            <Typography className={classes.heading}>Email</Typography>
                            <Typography className={classes.secondaryHeading}> {items.email} </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container direction="column">
                                <Grid item >
                                    <TextField 
                                    className={classes.textField} 
                                    label="Parolă" 
                                    variant="outlined" 
                                    color="secondary" 
                                    type="password"
                                    onInput={e => setVerifyPasswordEmail(e.target.value)}/>
                                </Grid>
                                <Grid item >    
                                    <TextField 
                                    className={classes.textField} 
                                    label="Email nou" 
                                    variant="outlined" 
                                    color="secondary" 
                                    onInput={e => setChangeNewEmail(e.target.value)}/>
                                </Grid>
                                <Grid className={classes.gridButton} item>
                                    <Button 
                                    variant="contained" 
                                    disabled={verifyPasswordEmail === '' || changeOldEmail === '' || changeNewEmail === ''} onClick={() => {console.log(verifyPasswordEmail, changeOldEmail, changeNewEmail)}} 
                                    color="secondary">
                                        Schimbă Email
                                    </Button>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion className={classes.accordion}>
                    <AccordionSummary
                    disabled={!(items["tip_profil"] === "Premium")}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                    onClick={() => {setName(!premium)}}
                    >
                        <Typography className={classes.heading}>Tip Cont</Typography>
                        <Typography className={classes.secondaryHeading}>{items["tip_profil"]}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="row">
                            {(items["tip_profil"] === "Premium") ?

                                <Typography> Valabil până la: {items.createdAt} </Typography> :
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
        </Container>
    );
}