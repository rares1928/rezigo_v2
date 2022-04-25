import "../App.css";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Helmet } from "react-helmet";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import logo from "../poze/logo4.svg";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Fade from "@material-ui/core/Fade";
import rezolva_invata from "../poze/rezolva_invata.svg";
import oriunde_oricand from "../poze/oriunde_oricand.svg";
import statistici from "../poze/statistici.svg";
import gratis from "../poze/gratis.svg";
import FAQ from "../componente/faq";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import FacebookIcon from "@material-ui/icons/Facebook";
import InstagramIcon from "@material-ui/icons/Instagram";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
  },
  textFade: {
    textShadow: "text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF",
  },
  divWrapperButoane: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divButoane: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    margin: theme.spacing(2),
  },
  buton: {
    width: theme.spacing(17),
    margin: theme.spacing(1),
  },
  logoBox: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
    borderRadius: "25px",
    height: theme.spacing(12),
  },
  logoImage: {
    maxWidth: theme.spacing(17),
  },
  divAnimation: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textAndImageWrapper1: {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.primary.main,
    minHeight: 320,
    width: "100%",
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
  },
  divTextImage: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  divText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  pozeMici: {
    maxHeight: 200,
    maxWidth: "40vw",
  },
  divTextTitle: {
    paddingBottom: theme.spacing(1),
  },
  titluFaq: {
    marginBottom: theme.spacing(3),
    width: "100%",
    justifyContent: "center",
    display: "flex",
  },
  footerText: {
    maxWidth: theme.spacing(30),
  },
  textAndImageWrapperFooter: {
    display: "flex",
    alignItems: "center",
    backgroundColor: theme.palette.text.disabled,
    minHeight: 200,
    width: "100%",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

export default function PrezentarePage() {
  const classes = useStyles();

  const TITLE = "Prezentare";
  return (
    <div>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className="prezentare_header" loading="eager">
        <div className={classes.divWrapperButoane}>
          <Box className={classes.logoBox}>
            <img className={classes.logoImage} src={logo} alt="logo" />
          </Box>
          <div className={classes.divButoane}>
            <Button
              href="/login"
              className={classes.buton}
              variant="contained"
              color="secondary"
            >
              <Typography>Autentificare</Typography>
            </Button>

            <Button
              href="/signup"
              className={classes.buton}
              variant="contained"
              color="secondary"
            >
              <Typography>Creează cont</Typography>
            </Button>
          </div>
        </div>
        <Container maxWidth="lg">
          <div className={classes.divAnimation}>
            <Fade
              className={classes.slide}
              in={true}
              direction="left"
              timeout={{ enter: 1000 }}
            >
              <Typography className={classes.textFade} variant="h5">
                Rezolvă grile.
              </Typography>
            </Fade>
            <Fade
              className={classes.slide}
              in={true}
              direction="left"
              timeout={{ enter: 2500 }}
            >
              <Typography className={classes.textFade} variant="h5">
                Reparcurge-ți greșelile.
              </Typography>
            </Fade>
            <Fade
              className={classes.slide}
              in={true}
              direction="left"
              timeout={{ enter: 4000 }}
            >
              <Typography className={classes.textFade} variant="h5">
                Câștigă locul pe care ți-l dorești.
              </Typography>
            </Fade>
          </div>
        </Container>
      </div>
      <hr class="rounded"></hr>
      <div className={classes.textAndImageWrapper1}>
        <Container maxWidth="md">
          <div className={classes.divTextImage}>
            <div className={classes.divText}>
              <Typography variant="h4" className={classes.divTextTitle}>
                Rezolvă teste. Învață din greșeli.
              </Typography>
              <Typography variant="h6">
                Testează-ți cunoștințele rezolvând grile, reparcurge greșelile
                și aprofundează materia.
              </Typography>
            </div>
            <img
              alt="tests"
              src={rezolva_invata}
              className={classes.pozeMici}
            />
          </div>
        </Container>
      </div>
      <hr class="rounded"></hr>
      <div className={classes.textAndImageWrapper1}>
        <Container maxWidth="md">
          <div className={classes.divTextImage}>
            <img
              alt="cloud"
              src={oriunde_oricand}
              className={classes.pozeMici}
            />
            <div className={classes.divText}>
              <Typography variant="h4" className={classes.divTextTitle}>
                Oriunde, oricând.
              </Typography>
              <Typography variant="h6">
                Folosește Rezigo de pe orice device. Răspunsurile tale sunt
                salvate, așadar poți continua testele începute în orice moment.
              </Typography>
            </div>
          </div>
        </Container>
      </div>
      <hr class="rounded"></hr>
      <div className={classes.textAndImageWrapper1}>
        <Container maxWidth="md">
          <div className={classes.divTextImage}>
            <div className={classes.divText}>
              <Typography variant="h4" className={classes.divTextTitle}>
                Urmărește-ți evoluția prin statistici.
              </Typography>
              <Typography variant="h6">
                Compară statisticile testelor tale cu media utilizatorilor
                site-ului.
              </Typography>
            </div>
            <img
              alt="statistics"
              src={statistici}
              className={classes.pozeMici}
            />
          </div>
        </Container>
      </div>
      <hr class="rounded"></hr>
      <div className={classes.textAndImageWrapper1}>
        <Container maxWidth="md">
          <div className={classes.divTextImage}>
            <img alt="cloud" src={gratis} className={classes.pozeMici} />
            <div className={classes.divText}>
              <Typography variant="h4" className={classes.divTextTitle}>
                Gratuit până în aprilie!
              </Typography>
              <Typography variant="h6">
                Fă-ți cont acum și beneficiezi gratuit de cont premium până în
                luna aprilie 2022!
              </Typography>
            </div>
          </div>
        </Container>
      </div>
      <hr class="rounded"></hr>
      <div className={classes.textAndImageWrapper1}>
        <Container maxWidth="md">
          <Typography variant="h4" className={classes.titluFaq}>
            Întrebări frecvente:
          </Typography>
          <FAQ />
        </Container>
      </div>
      <div className={classes.textAndImageWrapperFooter}>
        <Container maxWidth="sm">
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            spacing={2}
          >
            <Grid className={classes.footerItem} item>
              <Typography variant="h6" gutterBottom>
                Contact
              </Typography>
              <Typography
                className={classes.footerText}
                variant="p"
                component="p"
              >
                Pentru orice fel întrebări sau sugestii, vă rugam să ne
                contactați la adresa de mail: rezigo.contact@gmail.com
              </Typography>
            </Grid>
            <Grid className={classes.footerItem} item>
              <Typography variant="h6" gutterBottom>
                Ne puteți găsi și pe:
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
      </div>
    </div>
  );
}
