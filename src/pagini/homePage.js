import React, { useState, useEffect } from "react";
import test from "../poze/test_v4.svg";
import librarie from "../poze/librarie_v5.svg";
// import grupuri from '../poze/grupuri_v1.svg';
import tutorial from "../poze/tutorial.svg";
import profil from "../poze/profil_v1.svg";
import premium from "../poze/premium_v1.svg";
import { makeStyles } from "@material-ui/core/styles";
import HomeCard from "../componente/homeCard";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";
import { Helmet } from "react-helmet";
import UserHelper from "../componente/userHelper.js";
import TutorialCard from "../componente/tutorialCard";
import ErrorPopup from "../componente/errorPopup";
import CircularProgress from "@material-ui/core/CircularProgress";
import { callApi } from "../utils/callApi";
import CookiesAccord from "../componente/cookiesAccord";

const useStyles = makeStyles((theme) => ({
  wrapperDiv: {
    display: "flex",
    flexDirection: "column",
    minHeight: "calc(100vh - calc(8 * 8px))",
    justifyContent: "space-between",
  },
  root: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(6),
  },
  footer: {
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1, 10, 3),
  },
  footerItem: {
    maxWidth: 300,
  },
  userHelperDialog: {
    maxwidth: "80vw",
  },
  instructionsText: {
    // display: "flex",
    // flexDirection: "row",
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(2),
    paddingLegt: theme.spacing(2),
  },
}));

export default function HomePage() {
  const classes = useStyles();

  const TITLE = "Acasă";
  const [userHelper, setUserHelper] = useState(false);
  //   const [questionSolved, setQeustionSolved] = useState(124);
  const [error, setError] = useState(0);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState({});
  const [cookiesAccord, setCookiesAccord] = useState(
    localStorage.getItem("cookiesAccord") === "true" ? true : false
  );

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
    const url =
      "https://grileapiwin.azurewebsites.net/api/GetStatus?code=MtfWukjuzDqDGubbuJCnMnawGweSHuVD4NNalvRuo1dRs2REJIbAAg==";
    callApi(url, {}, handleItems, handleError);
  }, []);

  return (
    <div className={classes.wrapperDiv}>
      <ErrorPopup errorStatus={error} setError={setError} />
      <CookiesAccord
        cookiesAccord={cookiesAccord}
        setCookiesAccord={setCookiesAccord}
      />
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Container className={classes.root} maxWidth="lg">
        {userHelper ? (
          <UserHelper
            lastClick={() => {
              setUserHelper(false);
            }}
          />
        ) : null}
        {loading ? (
          <CircularProgress />
        ) : (
          <div className={classes.instructionsText}>
            <Typography variant="h6">
              Tipul contului tău: {items.tip_profil}{" "}
              {items.tip_profil === "Standard" ? (
                <div>
                  Astăzi mai poți rezolva {items.intrebariRamase} de grile
                </div>
              ) : null}
              {items.tip_profil === "Premium" ? (
                <>
                  până la data de: {items.zileRamase.split("T")[0]} ora:{" "}
                  {items.zileRamase.split("T")[1].replace(":00", "")}
                </>
              ) : (
                ""
              )}
              {items.tip_profil === "Dio" && (
                <Link color="secondary" href="/admins">
                  {" "}
                  Pagina de admini
                </Link>
              )}
            </Typography>
            {/* <Typography variant="h6">
            Grile rezolvate în ultimele 3 zile: {questionSolved}
          </Typography> */}
          </div>
        )}
        <Grid justifyContent="center" container spacing={6}>
          <Grid item>
            <TutorialCard
              imagine={tutorial}
              setUserHelper={setUserHelper}
              text="Deschide o fereastră cu imagini ce îți arată cum poți folosi site-ul."
              title="Tutorial"
            />
          </Grid>
          <Grid item>
            <HomeCard
              imagine={test}
              sendTo="/creeaza-ti_test"
              title="Test"
              text="Creează-ți un test, încearcă-ți puterile cu o simulare sau reparcurge greșelile"
              disabled={false}
            />
          </Grid>
          <Grid item>
            <HomeCard
              imagine={librarie}
              // sendTo="/librarie"
              sendTo="/"
              title="Librărie"
              text="învață din materialele speciale, flashcarduri și mnemonics"
              disabled={true}
            />
          </Grid>

          {/* <Grid item>
                    <HomeCard 
                        imagine={grupuri}
                        sendTo="/"
                        title="Grupuri"
                        text="împarte cu prietenii tăi grile, întrebari și nelămuriri"
                    />
                </Grid> */}

          <Grid item>
            <HomeCard
              imagine={profil}
              sendTo="/profil"
              title="Profil"
              text="Configurează setări, vezi statistici legate de teste"
            />
          </Grid>

          <Grid item>
            <HomeCard
              imagine={premium}
              sendTo="/premium"
              title="Premium"
              text="Investește în tine! Activează-ți contul premium "
            />
          </Grid>
        </Grid>
      </Container>
      <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <Grid className={classes.footerItem} item>
              <Typography variant="h6" gutterBottom>
                Contact
              </Typography>
              <Typography variant="subtitle2">
                Pentru orice fel întrebări sau sugestii, vă rugam să ne
                contactați la adresa de mail: rezigo.contact@gmail.com
              </Typography>
            </Grid>
            <Grid
              container
              direction="column"
              className={classes.footerItem}
              item
            >
              <Typography variant="h6" gutterBottom>
                Link-uri utile
              </Typography>
              {/* <Link color="secondary" href="/despre_noi">Despre noi</Link> */}
              <Link color="secondary">Despre noi</Link>
              <Link color="secondary" href="/intrebari_frecvente">
                Întrebări frecvente
              </Link>
              {/* <Link color="secondary" href="/termeni">Termeni și condiții</Link> */}
              <Link color="secondary" href="/termeni">
                Termeni și condiții
              </Link>
              <Link color="secondary" href="/confidentialitate">
                Politica de confidețialitate
              </Link>
              <Link color="secondary" href="/cookies">
                Politica de cookies
              </Link>
            </Grid>
            <Grid className={classes.footerItem} item>
              <Typography variant="h6" gutterBottom>
                Păstrează legătura
              </Typography>
              <IconButton href="https://www.facebook.com/rezigo.ro">
                <FacebookIcon color="secondary" fontSize="large" />
              </IconButton>
              <IconButton href="https://www.instagram.com/rezigo.oficial/">
                <InstagramIcon color="secondary" fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </footer>
    </div>
  );
}
