import React, { useState } from 'react';
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
import { callApi } from '../utils/callApi';
import CircularProgress from '@material-ui/core/CircularProgress';


const useStyles = makeStyles((theme) => ({
    logoBox: {
        backgroundColor: theme.palette.primary.main,
        borderRadius: "25px",
        paddingLeft: "10px",
        marginBottom: theme.spacing(3),
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: theme.spacing(3),
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
    let cookieRemember = new Cookies();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [rememberMe, setRememberMe] = useState(cookieRemember.get('rememberMe') === 'true' ? true : false);
    const [error, setError] = useState(0);
    const classes = useStyles();
    let history = useHistory();

    const rememberChange = () => {
        setRememberMe(!rememberMe);
        cookieRemember.set('rememberMe', !rememberMe, { path: '/', maxAge: 2592000 });
    }


    const callLoginApi = async () => {
        setLoading(true);
        await callApi("https://grileapiwin.azurewebsites.net/api/Login?code=D2p6Wi0brJT9iDnRObOnEfKqJLZbEhKse5Ze0ac9T745hJSuyiimuQ==", { email, password, tip_login: "autohton", rememberMe }, handleLogin, handleError);
        setLoading(false);
    }

    const handleLogin = (e) => {
        const cookies = new Cookies();
        let rememberMeSeconds = rememberMe ? 2592000 : null;
        const firstname = e.data['first_name'];
        const lastname = e.data['last_name'];
        const plan = e.data['plan'];
        const accessToken = e.data['access'];
        const refreshToken = e.data["refreshToken"];
        cookies.set('estiLogat', "rapid", { path: '/', maxAge: rememberMeSeconds });
        cookies.set('firstname', firstname, { path: '/', maxAge: rememberMeSeconds });
        cookies.set('lastname', lastname, { path: '/', maxAge: rememberMeSeconds });
        cookies.set('plan', plan, { path: '/', maxAge: rememberMeSeconds });
        cookies.set('accessToken', accessToken, { path: '/', maxAge: rememberMeSeconds });
        cookies.set('refreshToken', refreshToken, { path: '/', maxAge: rememberMeSeconds });
        history.push("/")
    }

    const handleError = (e) => {
        setError(e);
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
                            }
                        }}
                        error={error === 400}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={rememberMe} onChange={() => rememberChange()} value="remember" color="secondary" />}
                        label="Ține-mă minte"
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        className={classes.submit}
                        onClick={callLoginApi}
                        disabled={loading}
                    >
                        {loading? <CircularProgress size={25} /> :
                        <Typography>
                            Autentificare
                        </Typography>}
                    </Button>
                    {!loading &&
                        <Grid container>
                            <Grid item xs>
                                <Link color="secondary" href="/resetare_parola" variant="body2">
                                    Ai uitat parola?
              </Link>
                            </Grid>
                            <Grid item>
                                <Link color="secondary" href="/signup" variant="body2">
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