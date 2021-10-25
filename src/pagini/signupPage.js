import React, {useEffect, useState} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import logo from '../poze/logo4.svg';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingBottom: theme.spacing(3),
  },
  logoBox: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "25px",
    paddingLeft: "10px",
    marginBottom: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignUp() {

  const classes = useStyles();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [incompleteFields, setIncompleteFields] = useState(false);
  const [errorPwd, setErrorPwd] = useState(false);
  const [error, setError] = useState(0);
  const [IP, setIP] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('https://geolocation-db.com/json/')
      setIP(res.data.IPv4);
    }  ;

    getData();
  },[]);

  let history = useHistory();

  const callSigupApi = async ()=>{
    if(firstName === "" || lastName === "" || email === ""){
        setIncompleteFields(true);
    }else{
        setIncompleteFields(false);
        if(password !== repeatPassword || password.length < 8){
            setErrorPwd(true);
        }else{
            setErrorPwd(false);
        }
        if(!errorPwd){
          setIsLoading(true);
          const url="https://prod-245.westeurope.logic.azure.com:443/workflows/58bf6fa43cc54dacb74a5dea876d9807/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=M0m9frlvaNS4nFKP41w3vDJb4KoMLMUeBzh6k0CzEqk"
          const data = {
            email: email,
            nume: lastName,
            prenume: firstName,
            parola: password,
            ip: IP,
          }
          try {const result = await axios.post(url, data);
          console.log(result);
          setError(result.status);
          return(history.push({ pathname: "/signup/activare", state: {email: email, password: password} }));
          }
          catch(err){
            console.log(err);
            setError(err.response.status);
          }
          setIsLoading(false);
        }
    }
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Box className={classes.logoBox}>
            <img 
                src={logo} 
                alt="logo" 
            />
        </Box>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Prenume"
                autoFocus
                value={firstName}
                onInput={e => setFirstName(e.target.value)} 
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                color="secondary"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Nume"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onInput={e => setLastName(e.target.value)} 
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                value={email}
                onInput={e => setEmail(e.target.value)} 
                error={error === 400}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Parolă"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onInput={e => setPassword(e.target.value)} 
                error={errorPwd}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                color="secondary"
                variant="outlined"
                required
                fullWidth
                name="repeatPassword"
                label="Repetă parola"
                type="password"
                id="repeatPassword"
                value={repeatPassword}
                onInput={e => setRepeatPassword(e.target.value)}
                error={errorPwd} 
              />
            </Grid>
            
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={()=>{callSigupApi()}}
            disabled = {isLoading}
          >
            {isLoading? 
            <Typography>Trimitem email <CircularProgress color="primary" size={25} /></Typography> : 
            <Typography>Creează cont!</Typography>}
          </Button>
          <Grid container >
            {
              (error === 418) &&
              <Grid item>
                <Typography variant="subtitle1" color="error" >
                    Există deja un cont activat cu acest email!
                </Typography>
              </Grid>
            }
            {incompleteFields &&
              <Grid item>
                    <Typography variant="subtitle1" color="error" >
                        Nu ai completat toate câmpurile!
                    </Typography>
              </Grid>
            }
            {errorPwd &&
            <Grid item>
              <Typography variant="subtitle1" color="error" >
                Parolele nu coincid sau lungimea parolei este mai mică de 8 caractere.
              </Typography>
            </Grid>
            }
          </Grid>
          <Grid container justify="flex-end">
            {!isLoading &&
            <Grid item>
              <Link  href="/login" variant="body2" color="secondary">
                Deja ai cont? Autentifică-te
              </Link>
            </Grid>
            }
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}