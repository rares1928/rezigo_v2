import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import logo from '../poze/logo4.svg';
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  logoBox: {
    backgroundColor: theme.palette.primary.main,
    borderRadius: "25px",
    paddingLeft: "10px"
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apare_aicont, setapare_aicont] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(0);
  const classes = useStyles();
  let history = useHistory();

  const callLoginApi = () => {
    const cookies = new Cookies();
    cookies.set('rememberMe', rememberMe, { path: '/' })
    setapare_aicont(false);
    const tip_login = 'autohton';
    axios.post('https://grileapiwin.azurewebsites.net/api/Login?code=D2p6Wi0brJT9iDnRObOnEfKqJLZbEhKse5Ze0ac9T745hJSuyiimuQ==', {
        email,
        password,
        tip_login,
        rememberMe
    }, { withCredentials: true}).then((response) => {
        console.log(response);
        const firstname = response.data['first_name'];
        const lastname = response.data['last_name'];
        const plan = response.data['plan'];
        const accessToken = response.data['access']
        cookies.set('estiLogat', "rapid", { path: '/' });
        cookies.set('firstname', firstname, { path: '/' })
        cookies.set('lastname', lastname, { path: '/' })
        cookies.set('plan', plan, { path: '/' })
        cookies.set('accessToken', accessToken, { path: '/' });
        history.push("/")
    }, (err) => {
        setError(err.response.status);
        setapare_aicont(true);
    })
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
          <TextField
            color="secondary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-mail"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onInput={e => setEmail(e.target.value)} 
            error={error === 400}
            
          />
          <TextField
            color="secondary"
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Parolă"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onInput={e => setPassword(e.target.value)}
            onKeyPress={e => { 
              if (e.key === "Enter") {
                  callLoginApi(history);
              }}}
            error={error === 400}
          />
          <FormControlLabel
            control={<Checkbox checked={rememberMe} onChange={()=> setRememberMe(!rememberMe)} value="remember" color="secondary" />}
            label="Ține-mă minte"
          />
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={callLoginApi}
            disabled={!apare_aicont}
          >
            <Typography>
              Autentificare
            </Typography>
          </Button>
          {apare_aicont &&
          <Grid container>
            <Grid item xs>
              <Link color="secondary" href="#" variant="body2">
                Ai uitat parola?
              </Link>
            </Grid>
            <Grid item>
              <Link color="secondary" href="#" variant="body2">
                {"Nu ai cont? Creează cont"}
              </Link>
            </Grid>
          </Grid>
          }
        </form>
      </div>
      
    </Container>
  );
}