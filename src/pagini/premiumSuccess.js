import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ErrorPopup from "../componente/errorPopup";
import { Helmet } from "react-helmet";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { callApi } from "../utils/callApi";

const useStyles = makeStyles((theme) => ({}));

export default function PremiumSuccess() {
  const classes = useStyles();
  const TITLE = "Succes";
  const [error, setError] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [items, setItems] = useState({});
  const [prices, setPrices] = useState([]);

  const handleError = (e) => {
    console.log(e.status);
    setLoading(false);
    setError(e.status);
  };

  const handleItems = (e) => {
    setItems(e.data);
    setLoading(false);
  };

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <ErrorPopup errorStatus={error} setError={setError} />
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Typography
        component="h2"
        variant="h3"
        align="center"
        color="textPrimary"
        gutterBottom
      >
        Mulțumim!
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="textSecondary"
        component="p"
      >
        Am adăugat zile premium contului tău!
      </Typography>
    </React.Fragment>
  );
}
