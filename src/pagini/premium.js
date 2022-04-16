import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import StarIcon from "@material-ui/icons/StarBorder";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ErrorPopup from "../componente/errorPopup";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[700],
  },
  cardPricing: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "baseline",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  priceCutTypo: {
    textDecoration: "line-through",
  },
  priceCutDiv: {
    display: "flex",
    flexDirection: "row",
  },
  cardDiv: {
    minHeight: theme.spacing(44),
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  Button: {
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function Pricing() {
  const classes = useStyles();
  const TITLE = "Premium";
  const [error, setError] = useState(0);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState({});
  let history = useHistory();

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
    const url = "";
    //callApi(url, {}, handleItems, handleError);
  }, []);

  const tiers = [
    {
      title: "Premium o lună",
      initialPrice: "150",
      price: "75",
      description: ["Adaugă 30 de zile premium"],
      buttonText: "Cumpără",
      buttonVariant: "contained",
    },
    {
      title: "Premium 3 luni",
      // subheader: "Most popular",
      initialPrice: "400",
      price: "200",
      description: ["Adaugă 90 de zile premium"],
      buttonText: "Cumpără",
      buttonVariant: "contained",
    },
    {
      title: "Premium până la Rezi",
      initialPrice: "940",
      price: "470",
      description: ["Achiziționează cont premium până în data de 16.11.2022"],
      buttonText: "Cumpără",
      buttonVariant: "contained",
    },
  ];

  const premium1 = async () => {
    let url =
      "https://casademarcatstripe.azurewebsites.net/api/Checkout?code=mixrnC2fxaCyLehzsCZDSbIlFciJwGcANg6slkwF6T1pd3C257qZqA==";
    const response = await axios.post(
      url,
      { quantity: 1, product: "premium1Luna" },
      {}
    );
    window.location.href = response.data;
  };

  return (
    <React.Fragment>
      <ErrorPopup errorStatus={error} setError={setError} />
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Container maxWidth="md" component="main" className={classes.heroContent}>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Conturi premium
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="textSecondary"
          component="p"
        >
          Alege cea mai bună cale de a ajunge un medic de succes! Cu contul
          premium deblochezi întreaga funcționalitate a siteului: rezolvă
          oricâte grile vrei în fiecare zi, compară-ți rezultatele cu media
          site-ului, reparcurge-ți greșelile și multe altele!
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <Card className={classes.cardDiv}>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  subheaderTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  className={classes.cardHeader}
                />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <div className={classes.priceCutDiv}>
                      <Typography
                        component="h4"
                        variant="h5"
                        color="textPrimary"
                        className={classes.priceCutTypo}
                      >
                        {tier.initialPrice}
                      </Typography>
                      <Typography
                        component="h4"
                        variant="h5"
                        color="textPrimary"
                      >
                        Lei (-50%)
                      </Typography>
                    </div>

                    <Typography component="h2" variant="h3" color="textPrimary">
                      {tier.price} Lei
                    </Typography>
                  </div>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button
                    className={classes.Button}
                    fullWidth
                    variant={tier.buttonVariant}
                    color="secondary"
                    onClick={() => {
                      if (tier.title === "Premium o lună") {
                        premium1();
                      }
                    }}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}
