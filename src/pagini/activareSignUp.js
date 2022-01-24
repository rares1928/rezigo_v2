import React, { useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import { callApi } from "../utils/callApi";
import { useHistory } from 'react-router-dom';
import Cookies from 'universal-cookie';


const useStyles = makeStyles((theme) => ({
  text: {
    marginTop: theme.spacing(3),
  },
  
}));


export default function ActivareSignUpPage() {

  const classes = useStyles();
  const [text, setText] = useState("Verificam link-ul...");
  const [loadingLink, setLoadingLink] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const handleItems = (e) => {
    setText(e.statusText+" redirecționare...");
    setLoadingLink(false);
    const data = {
      email: e.data.email,
      password: e.data.parola,
      tip_login: "autohton",
      rememberMe: false,
    }
    setLoadingLogin(true);
    callLoginApi(data);
  }

  const handleError = (e) => {
    console.log(e);
    setLoadingLink(false);
  }

  useEffect(() => {
    setLoadingLink(true);
    const link = window.location.pathname.replace('/signup/','');
    const url = "https://grileapiwin.azurewebsites.net/api/Activare?code=bljtAbl/YJ1sJcZH1vrYdduyvdp9sotSqGipEaosUV85aO5KLXgwPQ==";
    callApi(url, { cod: link }, handleItems, handleError );
}, []);

let history = useHistory();

const callLoginApi = async (data) => {
  const url = 'https://grileapiwin.azurewebsites.net/api/Login?code=D2p6Wi0brJT9iDnRObOnEfKqJLZbEhKse5Ze0ac9T745hJSuyiimuQ==';
  await callApi( url, data, handleLogin, handleError2);
}
const handleLogin = (e) => {
    const cookies = new Cookies();
    let rememberMeSeconds = null;
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
    setLoadingLogin(false);
    history.push("/");
}
const handleError2 = (e) => {
    console.log(e);
    setLoadingLogin(false);
}

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      { (loadingLink || loadingLogin)? <CircularProgress/> : null}
      <Typography className={classes.text}>
        {text}
      </Typography>
      
    </Container>
  );
}