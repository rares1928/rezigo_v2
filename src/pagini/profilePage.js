import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Cookies from "universal-cookie";
import Container from "@material-ui/core/Container";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import EditIcon from "@material-ui/icons/Edit";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { callApi } from "../utils/callApi";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import { Helmet } from "react-helmet";
import Placinta from "../componente/pieChart";
import ErrorPopup from "../componente/errorPopup";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import Link from "@material-ui/core/Link";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ProfilePage(props) {
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginBottom: theme.spacing(3),
    },
    root: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      paddingRight: theme.spacing(1),
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    typographyHeader: {
      padding: theme.spacing(1),
    },
    divAccordion: {
      padding: theme.spacing(1),
    },
    accordion: {
      backgroundColor: props.darkMode ? "#5c5c5c" : "#fafafa",
    },
    listItem: {
      backgroundColor: props.darkMode ? "#5c5c5c" : "#fafafa",
      marginBottom: theme.spacing(2),
    },
    textField: {
      margin: theme.spacing(1),
    },
    gridButton: {
      margin: theme.spacing(1),
    },
    logoutButtonDiv: {
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
    },
    listaItemTextLeft: {
      height: 170,
      width: 150,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      paddingRight: theme.spacing(4),
    },
    placinta: {
      display: "flex",
      justifyContent: "flex-end",
    },
    linkNeterminate: {
      cursor: "pointer",
    },
    barChartList: {
      paddingBottom: theme.spacing(2),
    },
  }));

  let history = useHistory();
  const classes = useStyles();

  const [ready, setReady] = useState(false);
  const [items, setItems] = useState({});
  const [error, setError] = useState(0);
  const [errorPassword, setErrorPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [succes, setSucces] = useState(false);

  const [changeLastName, setChangeLastName] = useState("");
  const [changeFirstName, setChangeFirstName] = useState("");
  const [verifyPasswordName, setVerifyPasswordName] = useState("");

  const [changeNewPassword, setChangeNewPassword] = useState("");
  const [changeNewPasswordAgain, setChangeNewPasswordAgain] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");

  const [changeNewEmail, setChangeNewEmail] = useState("");
  const [verifyPasswordEmail, setVerifyPasswordEmail] = useState("");

  const handleError = (e) => {
    console.log(e.status);
    setError(e.status);
  };

  const handleItems = (e) => {
    setItems(e.data);
    setReady(true);
    setIsLoading(false);
  };

  const handleUpdateInfo = () => {
    setSucces(true);
  };

  useEffect(() => {
    setIsLoading(true);
    const url =
      "https://grileapiwin.azurewebsites.net/api/GetProfil?code=an7l2kCHdoYlNw006LoBdCzHB5U4qSVbNvpQ1r1V3TgSHtAYuMbkyw==";
    callApi(url, {}, handleItems, handleError);
  }, []);

  const delogare = () => {
    const cookies = new Cookies();
    cookies.remove("estiLogat");
    cookies.remove("accessToken");
    cookies.remove("refreshToken");
    cookies.remove("plan");
    cookies.remove("firstname");
    cookies.remove("lastname");
    history.push("/login");
  };

  const updateProfile = async (
    whatToUpdate,
    newFirstName,
    newLastName,
    password,
    newPassword,
    newEmail
  ) => {
    setIsLoading(true);
    const data = {
      newFirstName,
      newLastName,
      password,
      newPassword,
      newEmail,
      whatToUpdate,
    };
    const url =
      "https://grileapiwin.azurewebsites.net/api/updatepersonainfo?code=ii/dJ8ix8TdHZc6baLlJ7yLdYy1LeNVG7gRnQZJKzZEZIb9ISQJ8Nw==";
    const url2 =
      "https://grileapiwin.azurewebsites.net/api/GetProfil?code=an7l2kCHdoYlNw006LoBdCzHB5U4qSVbNvpQ1r1V3TgSHtAYuMbkyw==";
    await callApi(url, data, handleUpdateInfo, handleError);
    await callApi(url2, {}, handleItems, handleError);
    setIsLoading(false);
  };

  const handleCloseAlert = () => {
    setSucces(false);
  };

  const TITLE = "Profil";

  return (
    <>
      <Snackbar
        open={succes === true && isLoading === false}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity="success">
          <Typography>Informația a fost actualizată cu succes!</Typography>
        </Alert>
      </Snackbar>
      <ErrorPopup errorStatus={error} setError={setError} />
      <Container className={classes.root} maxWidth="md">
        <Helmet>
          <title>{TITLE}</title>
        </Helmet>

        <Paper className={classes.paper}>
          <Typography className={classes.typographyHeader} variant="h5">
            Informații personale:
          </Typography>
          {!ready ? (
            <CircularProgress />
          ) : (
            <div className={classes.divAccordion}>
              <Accordion className={classes.accordion}>
                <AccordionSummary
                  expandIcon={<EditIcon color="secondary" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Nume: </Typography>
                  <Typography className={classes.secondaryHeading}>
                    {" "}
                    {items.LastName} {items.FirstName}{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction="column">
                    <Grid item>
                      <TextField
                        size="small"
                        className={classes.textField}
                        label="Parolă"
                        error={error === 400}
                        variant="outlined"
                        color="secondary"
                        type="password"
                        onInput={(e) => setVerifyPasswordName(e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        size="small"
                        className={classes.textField}
                        label={items.LastName}
                        variant="outlined"
                        color="secondary"
                        onInput={(e) => setChangeLastName(e.target.value)}
                      />
                      <TextField
                        size="small"
                        className={classes.textField}
                        label={items.FirstName}
                        variant="outlined"
                        color="secondary"
                        onInput={(e) => setChangeFirstName(e.target.value)}
                      />
                    </Grid>
                    <Grid className={classes.gridButton} item>
                      <Button
                        variant="contained"
                        disabled={
                          changeLastName === "" ||
                          changeFirstName === "" ||
                          verifyPasswordName === "" ||
                          isLoading
                        }
                        color="secondary"
                        onClick={() => {
                          updateProfile(
                            "name",
                            changeFirstName,
                            changeLastName,
                            verifyPasswordName,
                            null,
                            null
                          );
                        }}
                      >
                        {isLoading ? <CircularProgress /> : <>Schimbă Numele</>}
                      </Button>
                      {error === 400 ? (
                        <Typography color="error">
                          Nu ai introdus corect parola!
                        </Typography>
                      ) : null}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion className={classes.accordion}>
                <AccordionSummary
                  expandIcon={<EditIcon color="secondary" />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>Parolă</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction="column">
                    <Grid item>
                      <TextField
                        size="small"
                        className={classes.textField}
                        error={error === 400}
                        label="Parolă veche"
                        variant="outlined"
                        color="secondary"
                        type="password"
                        onInput={(e) => setVerifyPassword(e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        size="small"
                        className={classes.textField}
                        label="Parolă nouă"
                        error={errorPassword}
                        variant="outlined"
                        color="secondary"
                        type="password"
                        onInput={(e) => setChangeNewPassword(e.target.value)}
                      />
                      <TextField
                        size="small"
                        className={classes.textField}
                        label="Reintrodu parola nouă"
                        error={errorPassword}
                        variant="outlined"
                        color="secondary"
                        type="password"
                        onInput={(e) =>
                          setChangeNewPasswordAgain(e.target.value)
                        }
                      />
                    </Grid>
                    <Grid className={classes.gridButton} item>
                      <Button
                        variant="contained"
                        disabled={
                          isLoading ||
                          verifyPassword === "" ||
                          changeNewPassword === "" ||
                          changeNewPasswordAgain === ""
                        }
                        color="secondary"
                        onClick={() => {
                          if (changeNewPassword === changeNewPasswordAgain) {
                            setErrorPassword(false);
                            updateProfile(
                              "password",
                              null,
                              null,
                              verifyPassword,
                              changeNewPassword,
                              null
                            );
                          } else {
                            setErrorPassword(true);
                          }
                        }}
                      >
                        {isLoading ? <CircularProgress /> : <>Schimbă Parola</>}
                      </Button>
                      {error === 400 ? (
                        <Typography color="error">
                          Nu ai introdus corect parola!
                        </Typography>
                      ) : null}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion className={classes.accordion}>
                <AccordionSummary
                  expandIcon={<EditIcon color="secondary" />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>Email</Typography>
                  <Typography className={classes.secondaryHeading}>
                    {" "}
                    {items.email}{" "}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction="column">
                    <Grid item>
                      <TextField
                        size="small"
                        className={classes.textField}
                        label="Parolă"
                        error={error === 400}
                        variant="outlined"
                        color="secondary"
                        type="password"
                        onInput={(e) => setVerifyPasswordEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        size="small"
                        className={classes.textField}
                        label="Email nou"
                        variant="outlined"
                        color="secondary"
                        onInput={(e) => setChangeNewEmail(e.target.value)}
                      />
                    </Grid>
                    <Grid className={classes.gridButton} item>
                      <Button
                        variant="contained"
                        disabled={
                          isLoading ||
                          verifyPasswordEmail === "" ||
                          changeNewEmail === ""
                        }
                        onClick={() => {
                          updateProfile(
                            "email",
                            null,
                            null,
                            verifyPasswordEmail,
                            null,
                            changeNewEmail
                          );
                        }}
                        color="secondary"
                      >
                        {isLoading ? <CircularProgress /> : <>Schimbă Email</>}
                      </Button>
                      {error === 400 ? (
                        <Typography color="error">
                          Nu ai introdus corect parola!
                        </Typography>
                      ) : null}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
              <Accordion className={classes.accordion}>
                <AccordionSummary
                  disabled={
                    !(
                      items["tip_profil"] === "Premium" ||
                      items["tip_profil"] === "Dio"
                    )
                  }
                  aria-controls="panel3a-content"
                  id="panel3a-header"
                >
                  <Typography className={classes.heading}>Tip Cont</Typography>
                  <Typography className={classes.secondaryHeading}>
                    {items["tip_profil"]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container direction="row">
                    {items["tip_profil"] === "Premium" ? (
                      <Typography>
                        {" "}
                        Valabil până la: {items.zi}/{items.luna}/{items.an}{" "}
                      </Typography>
                    ) : null}
                    {!(items["tip_profil"] === "Premium") ? (
                      <Grid className={classes.gridButton} item>
                        <Button variant="contained" color="secondary">
                          Cumpără Premium
                        </Button>
                      </Grid>
                    ) : null}
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </div>
          )}
          <div className={classes.logoutButtonDiv}>
            <Button
              className={classes.gridButton}
              variant="contained"
              color="secondary"
              onClick={() => delogare()}
            >
              {" "}
              Delogare{" "}
            </Button>
          </div>
        </Paper>
        <Paper className={classes.paper}>
          <Typography className={classes.typographyHeader} variant="h5">
            Teste:{" "}
          </Typography>
          {!ready ? (
            <CircularProgress />
          ) : (
            <div className={classes.divAccordion}>
              <List className={classes.accordion}>
                <ListItem key="placinta_teste" className={classes.listItem}>
                  <Placinta
                    className={classes.placinta}
                    data={[
                      ["Teste", "număr"],
                      [
                        "Terminate",
                        items["lista_teste"].filter(
                          (test) => test["Done"] === true
                        ).length,
                      ],
                      [
                        "Neterminate",
                        items["lista_teste"].filter(
                          (test) => test["Done"] === false
                        ).length,
                      ],
                    ]}
                    darkMode={props.darkMode}
                  />
                </ListItem>
                <ListItem key="teste_totale">
                  <Typography>
                    Începute: {items["lista_teste"].length}
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem key="teste_rezolvate">
                  <Typography>
                    Terminate:{" "}
                    {
                      items["lista_teste"].filter(
                        (test) => test["Done"] === true
                      ).length
                    }
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem key="teste_nerezolvate">
                  <Typography>
                    <Link
                      className={classes.linkNeterminate}
                      color="secondary"
                      onClick={() => {
                        history.push({
                          pathname: "/creeaza-ti_test",
                          state: { from: "profile" },
                        });
                      }}
                    >
                      Neterminate
                    </Link>
                    :{" "}
                    {
                      items["lista_teste"].filter(
                        (test) => test["Done"] === false
                      ).length
                    }
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem key="teste_media_scorurilor">
                  <Typography>
                    Media scorurilor testelor terminate:{" "}
                    {Number(
                      (items["lista_teste"]
                        .filter((test) => test["Done"] === true)
                        .reduce((acc, val) => acc + val["ScorRezi"], 0) /
                        items["lista_teste"]
                          .filter((test) => test["Done"] === true)
                          .reduce(
                            (acc, val) => acc + val["ScorReziPosibil"],
                            0
                          )) *
                        100
                    ).toFixed(1)}
                    % (echivalentul a{" "}
                    {Number(
                      (items["lista_teste"]
                        .filter((test) => test["Done"] === true)
                        .reduce((acc, val) => acc + val["ScorRezi"], 0) /
                        items["lista_teste"]
                          .filter((test) => test["Done"] === true)
                          .reduce(
                            (acc, val) => acc + val["ScorReziPosibil"],
                            0
                          )) *
                        950
                    ).toFixed(0)}
                    /950){" "}
                  </Typography>
                </ListItem>
              </List>
            </div>
          )}
        </Paper>
        <Paper className={classes.paper}>
          <Typography className={classes.typographyHeader} variant="h5">
            Grile rezolvate:{" "}
          </Typography>
          {!ready ? (
            <CircularProgress />
          ) : (
            <div className={classes.divAccordion}>
              <List className={classes.accordion}>
                <ListItem key="placinta" className={classes.listItem}>
                  <Placinta
                    className={classes.placinta}
                    data={[
                      ["Grile", "număr"],
                      [
                        "Corecte",
                        items["lista_teste"].reduce(
                          (acc, val) => acc + val["Score"],
                          0
                        ),
                      ],
                      [
                        "Greșite",
                        items["lista_teste"].reduce(
                          (acc, val) =>
                            acc + (val["NumAnswered"] - val["Score"]),
                          0
                        ),
                      ],
                    ]}
                    darkMode={props.darkMode}
                  />
                </ListItem>
                <ListItem key="teste">
                  <Typography>
                    Total:{" "}
                    {items["lista_teste"].reduce(
                      (acc, val) => acc + val["NumAnswered"],
                      0
                    )}{" "}
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem key="teste_corecte">
                  <Typography>
                    Corecte:{" "}
                    {items["lista_teste"].reduce(
                      (acc, val) => acc + val["Score"],
                      0
                    )}{" "}
                  </Typography>
                </ListItem>
                <Divider />
                <ListItem key="teste_gresite">
                  <Typography>
                    Greșite:{" "}
                    {items["lista_teste"].reduce(
                      (acc, val) => acc + (val["NumAnswered"] - val["Score"]),
                      0
                    )}{" "}
                  </Typography>
                </ListItem>
                <Divider />
              </List>
            </div>
          )}
        </Paper>

        <Paper className={classes.paper}>
          <Typography className={classes.typographyHeader} variant="h5">
            Statistici pe categorii:{" "}
          </Typography>
          {!ready ? (
            <CircularProgress />
          ) : (
            <div className={classes.divAccordion}>
              {items.statisticiCategoriiSite
                .filter(
                  (element) => element.Ratio !== -1 && element.ScorObtinut !== 0
                )
                .map((elm, index) => (
                  <List
                    key={"lista_mare_categorii_" + String(index)}
                    className={classes.listItem}
                  >
                    <ListItem key={"listItem_title_" + String(index)}>
                      <Typography>{elm["Categorie"]}</Typography>
                    </ListItem>
                    <Divider />
                    <ListItem key={"listItem_scorObtinut_" + String(index)}>
                      <Typography>
                        Răspunsuri corecte:{" "}
                        {items.statisticiCategoriiProfil.find(
                          (elemSite) =>
                            elemSite["Categorie"] === elm["Categorie"]
                        ) === undefined
                          ? 0
                          : items.statisticiCategoriiProfil.find(
                              (elemSite) =>
                                elemSite["Categorie"] === elm["Categorie"]
                            ).ScorObtinut}
                      </Typography>
                    </ListItem>
                    <Divider />
                    <ListItem key={"listItem_scorPosibil" + String(index)}>
                      <Typography>
                        Scor maxim posibil:{" "}
                        {items.statisticiCategoriiProfil.find(
                          (elemSite) =>
                            elemSite["Categorie"] === elm["Categorie"]
                        ) === undefined
                          ? 0
                          : items.statisticiCategoriiProfil.find(
                              (elemSite) =>
                                elemSite["Categorie"] === elm["Categorie"]
                            ).ScorPosibil}
                      </Typography>
                    </ListItem>
                    <Divider />
                    <ListItem key={"listItem_media_ta_" + String(index)}>
                      <Typography>
                        Media ta:{" "}
                        {items.statisticiCategoriiProfil.find(
                          (elemSite) =>
                            elemSite["Categorie"] === elm["Categorie"]
                        ) === undefined
                          ? 0
                          : Math.floor(
                              items.statisticiCategoriiSite.find(
                                (elemSite) =>
                                  elemSite["Categorie"] === elm["Categorie"]
                              ).Ratio * 950
                            )}{" "}
                        /950
                      </Typography>
                    </ListItem>
                    <Divider />
                    <ListItem key={"listItem_scorSite_" + String(index)}>
                      <Typography>
                        Media site-ului: {Math.floor(elm.Ratio * 950)} /950
                      </Typography>
                    </ListItem>
                    {/* <BarChartHorizontal
                      key={"bar_chart" + String(key)}
                      darkMode={props.darkMode}
                      className={classes.placinta}
                      title={element["Categorie"]}
                      data={[[" ", "Media ta", "Media site-ului"]].concat([
                        [
                          " ",
                          items.statisticiCategoriiProfil.find(
                            (elemSite) =>
                              elemSite["Categorie"] === element["Categorie"]
                          ) === undefined
                            ? 0
                            : items.statisticiCategoriiSite.find(
                                (elemSite) =>
                                  elemSite["Categorie"] === element["Categorie"]
                              ).Ratio * 100,
                          element.Ratio * 100,
                        ],
                      ])}
                    /> */}
                  </List>
                ))}
            </div>
          )}
        </Paper>
      </Container>
    </>
  );
}
