import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ErrorPopup from "../componente/errorPopup";
import { Helmet } from "react-helmet";
import { CircularProgress } from "@material-ui/core";
import { callApi } from "../utils/callApi";

const useStyles = makeStyles((theme) => ({
  divMultumim: {
    paddingTop: theme.spacing(2),
  },
}));

export default function PremiumSuccess() {
  const classes = useStyles();
  const TITLE = "Succes";
  const [error, setError] = useState(0);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState({});

  const handleError = (e) => {
    console.log(e.status);
    setLoading(false);
    setError(e.status);
  };

  const handleItems = (e) => {
    setItems(e.data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    const params = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop) => searchParams.get(prop),
    });
    const data = {
      test: false,
      sessionId: params.session_id,
    };
    const url =
      "https://casademarcatstripe.azurewebsites.net/api/PaymentSuccess?code=EUYRr/MMHyLtaeDC7ST83eJC6T/SjOg2rX6pH4o96K/u2WHF8eHFWA==";
    callApi(url, data, handleItems, handleError);
  }, []);

  return (
    <React.Fragment>
      <ErrorPopup errorStatus={error} setError={setError} />
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Container>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="textPrimary"
          className={classes.divMultumim}
          gutterBottom
        >
          Mulțumim!
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              component="p"
            >
              {items.mesaj}
              <Link color="secondary" href="/creeaza-ti_test" variant="h5">
                {" "}
                Hai la grile!
              </Link>
            </Typography>
          </>
        )}
      </Container>
    </React.Fragment>
  );
}
