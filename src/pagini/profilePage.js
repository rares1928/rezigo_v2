import React, {useState} from 'react';
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
import InputBase from '@material-ui/core/InputBase';



const useStyles = makeStyles((theme)=>({
    root: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
        
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    divAccordion: {
        padding: theme.spacing(1),
    },
    textField: {
        padding: theme.spacing(1),
    },
    gridButton: {
        margin: theme.spacing(1),
    },
}));

export default function ProfilePage() {
    let history = useHistory();
    const classes=useStyles();
    const [name, setName] = useState('false');
    const [email, setEmail] = useState('false');
    const [password, setPassword] = useState('false');
    const [premium, setPremium] = useState('false');

    const [changeLastName, setChangeLastName] = useState('');
    const [changeFirstName, setChangeFirstName] = useState('');
    const [verifyPasswordName, setVerifyPasswordName] = useState('');

    const [changeNewPassword, setChangeNewPassword] = useState('');
    const [changeNewPasswordAgain, setChangeNewPasswordAgain] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    const [changeOldEmail, setChangeOldEmail] = useState('');
    const [changeNewEmail, setChangeNewEmail] = useState('');
    const [verifyPasswordEmail, setVerifyPasswordEmail] = useState('');

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
        <Container className={classes.root} maxWidth="sm">
            <Paper>
                <Typography variant="h2">Profil </Typography>
                <Button variant="contained" color="secondary" onClick={() => delogare()}> Logout </Button>
                <div className={classes.divAccordion}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<EditIcon color='secondary'/> }
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            onClick={() => {setName(!name)}}
                        >
                            <Typography className={classes.heading}>Nume</Typography>
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
                                    label="Nume" 
                                    variant="outlined" 
                                    color="secondary" 
                                    onInput={e => setChangeLastName(e.target.value)}/>
                                    <TextField 
                                    className={classes.textField} 
                                    label="Prenume" 
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
                    <Accordion>
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
                                    label="Parolă Veche" 
                                    variant="outlined" 
                                    color="secondary" 
                                    type="password" 
                                    onInput={e => setVerifyPassword(e.target.value)}/>
                                </Grid>
                                <Grid item >    
                                    <TextField 
                                    className={classes.textField} 
                                    label="Parolă Nouă" 
                                    variant="outlined" 
                                    color="secondary" 
                                    type="password" 
                                    onInput={e => setChangeNewPassword(e.target.value)}/>
                                    <TextField 
                                    className={classes.textField} 
                                    label="Reintroducere Parolă" 
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
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<EditIcon color='secondary'/> }
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                            onClick={() => {setName(!password)}}
                        >
                            <Typography className={classes.heading}>Email</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container direction="column">
                                <Grid item >
                                    <TextField 
                                    className={classes.textField} 
                                    label="Parolă" 
                                    variant="outlined" 
                                    color="secondary" 
                                    onInput={e => setVerifyPasswordEmail(e.target.value)}/>
                                </Grid>
                                <Grid item >    
                                    <TextField 
                                    className={classes.textField} 
                                    label="Email Vechi" 
                                    variant="outlined" 
                                    color="secondary" 
                                    onInput={e => setChangeOldEmail(e.target.value)}/>
                                    <TextField 
                                    className={classes.textField} 
                                    label="Email Nou" 
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
                    <Accordion>
                    <AccordionSummary
                    expandIcon={<EditIcon color='secondary'/> }
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                    onClick={() => {setName(!premium)}}
                    >
                        <Typography className={classes.heading}>Tip Cont</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid container direction="row">
                            {premium ?
                                <InputBase
                                    defaultValue="Premium"
                                    inputProps={{ 'aria-label': 'naked' }}
                                /> :
                                <InputBase
                                    defaultValue="Non-Premium"
                                    inputProps={{ 'aria-label': 'naked' }}
                                />
                            }
                            <InputBase
                                defaultValue="25.05.2022"
                                inputProps={{ 'aria-label': 'naked' }}
                            />
                            {!premium ? 
                            <Grid className={classes.gridButton} item>
                                    <Button variant="contained" color="secondary">Cumpără Premium</Button>
                            </Grid> : null
                            }          
                        </Grid>
                    </AccordionDetails>
                </Accordion>
                </div>
            </Paper>
        </Container>
    );
}