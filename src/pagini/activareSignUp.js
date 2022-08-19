import React, { useState, useEffect, useCallback } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { callApi } from "../utils/callApi";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

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

  let history = useHistory();

  const handleLogin = useCallback(
    (e) => {
      const cookies = new Cookies();
      let rememberMeSeconds = null;
      const firstname = e.data["first_name"];
      const lastname = e.data["last_name"];
      const plan = e.data["plan"];
      const accessToken = e.data["access"];
      const refreshToken = e.data["refreshToken"];
      cookies.set("estiLogat", "rapid", {
        path: "/",
        maxAge: rememberMeSeconds,
      });
      cookies.set("firstname", firstname, {
        path: "/",
        maxAge: rememberMeSeconds,
      });
      cookies.set("lastname", lastname, {
        path: "/",
        maxAge: rememberMeSeconds,
      });
      cookies.set("plan", plan, { path: "/", maxAge: rememberMeSeconds });
      cookies.set("accessToken", accessToken, {
        path: "/",
        maxAge: rememberMeSeconds,
      });
      cookies.set("refreshToken", refreshToken, {
        path: "/",
        maxAge: rememberMeSeconds,
      });
      setLoadingLogin(false);
      history.push("/");
    },
    [history]
  );

  const handleError2 = (e) => {
    console.log(e);
    setLoadingLogin(false);
  };

  const handleItems = useCallback(
    (e) => {
      setText(e.statusText + " redirecționare...");
      setLoadingLink(false);

      const callLoginApi = async (data) => {
        const url =
          "https://grileapiwin.azurewebsites.net/api/Login?code=D2p6Wi0brJT9iDnRObOnEfKqJLZbEhKse5Ze0ac9T745hJSuyiimuQ==";
        await callApi(url, data, handleLogin, handleError2);
      };

      const data = {
        email: e.data.email,
        password: e.data.parola,
        tip_login: "autohton",
        rememberMe: false,
      };
      setLoadingLogin(true);
      callLoginApi(data);
    },
    [handleLogin]
  );

  const handleError = (e) => {
    console.log(e);
    setLoadingLink(false);
  };

  useEffect(() => {
    setLoadingLink(true);
    const link = window.location.pathname.replace("/signup/", "");
    const url =
      "https://grileapiwin.azurewebsites.net/api/Activare?code=bljtAbl/YJ1sJcZH1vrYdduyvdp9sotSqGipEaosUV85aO5KLXgwPQ==";
    callApi(url, { cod: link }, handleItems, handleError);
  }, [handleItems]);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      {loadingLink || loadingLogin ? <CircularProgress /> : null}
      <Typography className={classes.text}>{text}</Typography>
    </Container>
  );
}
