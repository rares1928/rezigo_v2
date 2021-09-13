import React, { useState} from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { useLocation } from 'react-router-dom'
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
  successText:{
      color: "#388e3c",
  }
}));


export default function ResetareParola() {

  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [codePassword, setCodePassword] = useState("");
  const [error, setError] = useState(0);
  const [error2, setError2] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  let history = useHistory();

  const callChangePassword = async ()=>{
    setIsLoading(true);
    const url="https://prod-87.westeurope.logic.azure.com:443/workflows/877f4b565a394b4ab772e7eb5cc1862a/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=CyJMF0SHPo0ulFZ1C8tpBCeDDJCjLPqS4oJR9P2s8dU"
    const data = {
    email: email
    }
    try{const result = await axios.post(url, data);
    setError(result.status);
    }catch(err){
        console.log(err);
        setError(err.response.status);
    }
    setIsLoading(false);
  }

  const callGeneratePassword = async ()=>{
    if(error2 === 200){
        return(history.push({ pathname: "/login" }));
    }
    setIsLoading(true);
    const url="https://prod-107.westeurope.logic.azure.com:443/workflows/0f09da4b2c674ce28ec36696ee672cad/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=7K_3jpIz_Zq_IUxEMnHXq7D70puu5TLdSbjekFgoHzQ"
    const data = {
    code: codePassword,
    email: email
    }
    try{const result = await axios.post(url, data);
    setError2(result.status);
    }catch(err){
        console.log(err);
        setError2(err.response.status);
    }
    setIsLoading(false);
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
            <Grid item xs={12} >
              <TextField
                color="secondary"
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email_change_password"
                label="email"
                autoFocus
                value={email}
                onInput={e => setEmail(e.target.value)} 
              />
            </Grid>
            
          </Grid>
          <Button
            required
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            disabled = {isLoading || error === 200 || !email.includes("@")}
            onClick={()=>{callChangePassword()}}
          >
            {isLoading? 
            <CircularProgress color="primary" size={25} /> :
            <Typography> Trimite email </Typography>
            }
          </Button>
          <Grid container>
            <div>
                {error === 404 ? 
                <Typography variant="subtitle1" color="error"> Nu există vreun cont pe această adresă de email!</Typography>:
                null
                }
                {
                error === 200 ? 
                <div>
                    <Typography variant="subtitle1" > Te rugăm să introduci mai jos codul de resetare al parolei primit prin email: </Typography>
                    <Grid item xs={12} >
                        <TextField 
                            className = {classes.form}
                            color="secondary"
                            autoComplete="code"
                            name="code"
                            variant="outlined"
                            required
                            fullWidth
                            id="code_password_reset"
                            label="Cod resetare parolă"
                            autoFocus
                            value={codePassword}
                            onInput={e => setCodePassword(e.target.value)} 
                        />
                    </Grid>
                    <Button
                    required
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    disabled = {isLoading || codePassword.length<=6}
                    onClick={()=>{callGeneratePassword()}}
                    >
                    {isLoading? 
                    <CircularProgress color="primary" size={25} /> :
                    error2 === 200? <Typography> Înapoi la autentificare </Typography>:
                    <Typography> Resetează parola </Typography>
                    }
                    </Button>
                    {error2 === 200 ? 
                    <Typography variant="subtitle1" className={classes.successText}> Parola a fost schimbată! În scurt timp vei primi noua ta parola prin email</Typography>:
                    null
                    }
                </div> :
                null
                }
            </div>        
          </Grid>

        </form>
      </div>
      
    </Container>
  );
}