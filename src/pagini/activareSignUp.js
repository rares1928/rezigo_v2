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


export default function ActivareSignUpPage() {

  const classes = useStyles();

  const [activare, setActivare] = useState("");
  const [error, setError] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { state } = useLocation();
  let history = useHistory();

  const callSigupApi = async ()=>{
    if(error === 200){
        return(history.push({ pathname: "/login" }));
    }
    setIsLoading(true);
    const url="https://prod-131.westeurope.logic.azure.com:443/workflows/e3dc56acb65443d7a3ede5493a82a3e9/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=xJXnIq7-MqvccRwFdsm98RyiOmd3iOw5wcpg7-sYiHs"
    const data = {
    email: state.email,
    code: activare,
    }
    try{const result = await axios.post(url, data);
    setError(result.status);
    }catch(err){
        console.log(err);
        setError(err.response.status);
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
            
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            disabled = {isLoading}
            onClick={()=>{callSigupApi()}}
          >
            {error === 200 ? 
            <Typography href="/login" > Mergi la autentificare </Typography>:
            isLoading? 
            <CircularProgress color="primary" size={25} /> : 
            <Typography>Creează cont!</Typography>
            }
          </Button>
          <Grid container >
            {(error === 400) &&
            <Grid item>
              <Typography variant="subtitle1" color="error" >
                Codun introdus nu este corect!
              </Typography>
            </Grid>
            }
            {(error === 200) &&
            <Grid item>
              <Typography variant="subtitle1" className={classes.successText} >
                Felicitări! Contul tău este activat! Te rugăm să te autentifici!
              </Typography>
            </Grid>
            }
          </Grid>

        </form>
      </div>
      
    </Container>
  );
}