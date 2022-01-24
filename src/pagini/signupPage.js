import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import logo from '../poze/logo4.svg';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';


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
  activareDiv:{
    marginTop: theme.spacing(3),
  },
  textContDiv: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
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
  const [errorMail, setErrorMail] = useState(false);
  const [error, setError] = useState(0);
  const [IP, setIP] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activateField, setActivateField] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get('https://geolocation-db.com/json/')
      setIP(res.data.IPv4);
    }  ;

    getData();
  },[]);


  const callSigupApi = async ()=>{
    if(firstName === "" || lastName === "" || email === ""){
        setIncompleteFields(true);
    }else{
        setErrorMail(false);
        setErrorPwd(false);
        setIncompleteFields(false);
        if(password !== repeatPassword || password.length < 8){
          setErrorPwd(true);
          return ;
        }else{
          setErrorPwd(false);
        }
        if(!validateEmail(email)){
          setErrorMail(true);
          return; 
        }else{
          setErrorMail(false);
        }
        if(!errorPwd && !errorMail ){
          setIsLoading(true);
          const url="https://grileapiwin.azurewebsites.net/api/SingUpEncrypt?code=y8RZs3SfCrHH67iTLoYW4vhr/n4Hbu1l6P62EsTDGR3s7bPOk48DKw==";
          const data = {
            email: email,
            nume: lastName,
            prenume: firstName,
            parola: password,
            ip: IP,
          }
          try {await axios.post(url, data);
          setActivateField(true);
          }
          catch(err){
            console.log(err);
            setError(err.response.status);
          }
          setIsLoading(false);
        }
    }
  }

  function validateEmail(mail) 
    {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(mail);
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
                disabled = {activateField}
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
                disabled = {activateField}
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
                disabled = {activateField}
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
                error={error === 400 || validateEmail(email) }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                disabled = {activateField}
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
                disabled = {activateField}
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
            disabled = {isLoading || activateField}
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
                    Există deja un cont cu acest email!
                </Typography>
              </Grid>
            }
            {
              (error === 419) &&
              <Grid item>
                <Typography variant="subtitle1" color="error" >
                    Există un cont neactivat pe acest email. Te rugăm să îți verifici emailul, inclusiv in spam. În cazul în care nu ai primit link-ul de activare, te rugăm să ne contactezi pe Facebook, Instagram sau la adresa rezigo.contact@gmail.com.
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
            {errorMail &&
            <Grid item>
              <Typography variant="subtitle1" color="error" >
                Adresa de mail introdusă nu este corectă.
              </Typography>
            </Grid>
            }
          </Grid>
          <Grid container className={classes.textContDiv}>
            <div></div>
            {!isLoading && !activateField &&
            <>
              <Link href="/login" variant="body2" color="secondary">
                Deja ai cont? Autentifică-te
              </Link>
            </>
            }
          </Grid>

          {activateField &&
            <div className={classes.activareDiv}>
              {isLoading? <CircularProgress/>:
                <Typography>
                Am trimis un link de activare la adresa specificată de tine mai sus. E posibil ca mailul să intre în spam.
              </Typography>}
              {/* <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={ ()=> setActivateField(false)}
              >
                <Typography href="/login" > Vreau sa introduc alte date </Typography>
              </Button> 
              <Grid item xs={12} >
                <TextField
                  color="secondary"
                  autoComplete="code"
                  name="activare"
                  variant="outlined"
                  required
                  fullWidth
                  id="activare"
                  label="Cod activare"
                  autoFocus
                  value={activare}
                  onInput={e => setActivare(e.target.value)} 
                />
              </Grid>
              
                <Button
                  fullWidth
                  variant="contained"
                  color="secondary"
                  className={classes.submit}
                  disabled = {loadingActivare}
                  onClick={()=>{callActivareApi()}}
                >
                  {
                  loadingActivare? 
                  <CircularProgress color="primary" size={25} /> : 
                  <Typography>Activează contul!</Typography>
                  }
                </Button>
              <Grid container >
                {(errorActivare === 400) &&
                <Grid item>
                  <Typography variant="subtitle1" color="error" >
                    Codul introdus nu este corect!
                  </Typography>
                </Grid>
                }
              </Grid> */}
            </div>
          }
        </form>
      </div>
      
    </Container>
  );
}