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
import PremiumTable from "./premiumTable";

const useStyles = makeStyles((theme) => ({
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
  typoDetaliiCont: {
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  textWarningDiv: {
    marginBottom: theme.spacing(5),
  },
}));

export default function Pricing() {
  const classes = useStyles();
  const TITLE = "Premium";
  const [error, setError] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingPrices, setLoadingPrices] = useState(false);
  const [loadCumpara, setLoadCumpara] = useState(false);
  const [items, setItems] = useState({});
  const [prices, setPrices] = useState([]);
  const inversReducere = [3, 3, 3];

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
    setLoadingPrices(true);
    const url1 =
      "https://grileapiwin.azurewebsites.net/api/GetStatus?code=MtfWukjuzDqDGubbuJCnMnawGweSHuVD4NNalvRuo1dRs2REJIbAAg==";
    const url2 =
      "https://casademarcatstripe.azurewebsites.net/api/GetProducts?code=Psb7NdoIolsvXrirm304P2Tf81xGpTF6Jqt3YiaSsPIYAG01DjxgnQ==";
    const data = {
      test: false,
    };
    callApi(url1, {}, handleItems, handleError);

    const receiveProducts = async () => {
      try {
        const response = await axios.post(url2, data, {});
        setPrices(response.data);
        setLoadingPrices(false);
      } catch (err) {
        console.log("Eroare Preturi:", err);
        setLoadingPrices(false);
      }
    };

    receiveProducts();
  }, []);

  const buyPremium = async (id) => {
    setLoadCumpara(true);
    let url =
      "https://casademarcatstripe.azurewebsites.net/api/Checkout?code=mixrnC2fxaCyLehzsCZDSbIlFciJwGcANg6slkwF6T1pd3C257qZqA==";
    const data = {
      test: false,
      quantity: 1,
      product: id,
      domain: window.location.href,
    };
    try {
      const response = await axios.post(url, data, {});
      window.location.href = response.data;
    } catch (err) {
      console.log(err);
      setLoadCumpara(false);
    }
  };

  return (
    <React.Fragment>
      <ErrorPopup errorStatus={error} setError={setError} />
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Container maxWidth="md" component="main">
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
        <PremiumTable />
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="textPrimary"
          gutterBottom
        >
          Reducere de lansare!
        </Typography>
        <Typography
          className={classes.textWarningDiv}
          variant="h5"
          align="center"
          component="p"
        >
          Primii 50 de abonați vor benificia de oferta noastră de bun venit!
          Știm cât de important este pentru tine examenul de rezidențiat. De
          aceea am decis să-ți fim alături cu platforma ReziGo la un preț
          special. Grabește-te și fii printre primii care se înscrie! Oferta
          este valabilă până la data de:
        </Typography>
      </Container>
      {/* End hero unit */}
      {loadingPrices ? (
        <CircularProgress />
      ) : (
        <Container maxWidth="md" component="main">
          <Grid container spacing={5} alignItems="flex-end">
            {prices.map((price, index) => (
              // Enterprise card is full width at sm breakpoint
              <Grid item key={price.name} xs={12} md={4}>
                <Card className={classes.cardDiv}>
                  <CardHeader
                    title={price.name}
                    // subheader={}
                    titleTypographyProps={{ align: "center" }}
                    subheaderTypographyProps={{ align: "center" }}
                    // action={tier.title === "Pro" ? <StarIcon /> : null}
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
                          {(parseInt(price.metadata.price) / 100) *
                            inversReducere[index]}
                        </Typography>
                        <Typography
                          component="h4"
                          variant="h5"
                          color="textPrimary"
                        >
                          Lei (-
                          {Math.floor(100 * (1 - 1 / inversReducere[index]))}%)
                        </Typography>
                      </div>

                      <Typography
                        component="h2"
                        variant="h3"
                        color="textPrimary"
                      >
                        {parseInt(price.metadata.price) / 100} Lei
                      </Typography>
                    </div>

                    <Typography variant="subtitle1" align="center">
                      {price.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      className={classes.Button}
                      fullWidth
                      variant="contained"
                      color="secondary"
                      disabled={loadCumpara}
                      onClick={() => {
                        buyPremium(price.id);
                      }}
                    >
                      {loadCumpara ? <CircularProgress /> : "Cumpără"}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
          {loading ? (
            <CircularProgress />
          ) : (
            <Typography
              className={classes.typoDetaliiCont}
              variant="h6"
              component="p"
            >
              Tipul contului tău: {items.tip_profil}{" "}
              {items.tip_profil === "Premium" ? (
                <>
                  până la data de: {items.zileRamase.split("T")[0]} ora:{" "}
                  {items.zileRamase.split("T")[1].replace(":00", "")}
                </>
              ) : (
                ""
              )}
            </Typography>
          )}
          <Typography
            className={classes.textWarningDiv}
            variant="h5"
            align="center"
            component="p"
          >
            Atenție! După selectarea tipului de cont dorit, veți fi
            redirecționți către pagina procesatorului nostru de plăți. După ce
            ați efectuat plata, vă rugăm să nu închideți fereastra până primiți
            confirmarea actualizării contului vostru! Dacă ați fost taxat dar
            contul nu a fost actualizat, vă rugăm să ne contactați cât mai rapid
            la adresa de email: rezigo.contact@gmail.com
          </Typography>
        </Container>
      )}
      {error === 500 && (
        <Typography
          className={classes.typoDetaliiCont}
          variant="h6"
          component="p"
        >
          Momentan avem o problemă și nu putem încărca prețurile, te rugăm să
          revii mai târziu.
        </Typography>
      )}
    </React.Fragment>
  );
}
