import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import moment from "moment";
import { callApi } from "../utils/callApi";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AdminsDisplayGrile from "./adminsDisplayGrile";
import { useLocation } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  wrapperDiv: {
    display: "flex",
    flexDirection: "column",
    minHeight: "calc(100vh - calc(8 * 8px))",
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  headerText: {
    marginBottom: theme.spacing(3),
    marginTop: theme.spacing(3),
  },
  paper: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1),
  },
  formNewSimulare: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  grilaActionsDiv: {
    display: "flex",
    flexDirection: "row ",
    justifyContent: "space-between",
    margim: theme.spacing(1),
    marginTop: theme.spacing(2),
  },
  grilaActionsInputDiv: {
    display: "flex",
    flexDirection: "column ",
  },
  buttons: {},
}));

export default function AdminsSimuareEdit() {
  const classes = useStyles();
  const TITLE = "admins";
  const [simulareCurenta, setSimulareCurenta] = useState({});
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const { state } = useLocation();
  const [orderId, setOrderId] = useState(0);
  const [simulareQuestions, setSimulareQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const updateSimulare = (event) => {
    setSimulareCurenta((prevState) => ({
      ...prevState,
      name: newName,
      description: newDescription,
      startDate: newStartDate,
      CreatedAt: moment().format(),
      EditedAt: null,
      NumberCS: 0,
      NumberCM: 0,
      IsLive: false,
    }));
    event.preventDefault();
  };

  const handleSimulareQuestions = (e) => {
    setSimulareQuestions([...e.data["lista"]]);
  };

  const handleSimulareCurenta = (e) => {
    setSimulareCurenta(e.data["lista"][0]);
  };

  // const handleItemsGrile = (e) => {
  //   setItemsGrile(e.data);
  // };

  const handleError = (e) => {
    if (e === 403) {
      // history.push({ pathname: "/" });
    } else {
      console.log(e);
    }
  };

  const handleEmpty = () => {};

  const editOrder = async (grilaId, orderId) => {
    let url =
      "https://grileapiwin.azurewebsites.net/api/EditOrder?code=oZzWLFpqcPB1jZGpNbfo4gktVy1YJF6KaONVt1lLYwVIAzFumFUCoA==";
    const data = { simulareId: state, grilaId: grilaId, orderId: orderId };
    await callApi(url, data, () => {}, handleError).then(getSimulareQuestions);
  };

  const deleteGrila = async (id) => {
    const url =
      "https://grileapiwin.azurewebsites.net/api/DeleteQuestion?code=3CivlrNptVV9mNn8G1Pz_aQWAQvIAFYaP_OEkrarraeFAzFukQliww==";
    const data = { simulareId: state, grilaId: id };
    await callApi(url, data, handleEmpty, handleError).then(
      getSimulareQuestions
    );
  };

  const updateSimulareInDB = (live = false) => {
    setLoading(true);
    const updateSimulareInDBAsync = async () => {
      const url =
        "https://grileapiwin.azurewebsites.net/api/UpdateSimulare?code=xcfMjMllfvHPSjJZwSTvJFgioT-0s2ubfKM12PmpPKCcAzFuucpjZg==";
      const data = {
        simulareId: state,
        name: newName,
        description: newDescription,
        startDate: newStartDate,
        price: newPrice,
        IsLive: live,
      };
      await callApi(url, data, handleSimulareQuestions, handleError).then(
        () => {
          setLoading(false);
        }
      );
    };
    updateSimulareInDBAsync().then(setInitialState);
  };

  const getSimulareQuestions = () => {
    const getSimQuestionsAsync = async () => {
      const url =
        "https://grileapiwin.azurewebsites.net/api/GetAllQuestions?code=uSgy01hLnddLFUbfUltfB-qfLP8jQIclHeLDhAYlGL-hAzFu-vOi4A==";
      const data = { simulareId: state };
      await callApi(url, data, handleSimulareQuestions, handleError);
    };
    getSimQuestionsAsync();
  };

  const setInitialState = () => {
    setLoading(true);
    let getSimulareQuestionsUE = () => {
      const getSimQuestionsAsync = async () => {
        const url =
          "https://grileapiwin.azurewebsites.net/api/GetAllQuestions?code=uSgy01hLnddLFUbfUltfB-qfLP8jQIclHeLDhAYlGL-hAzFu-vOi4A==";
        const data = { simulareId: state };
        await callApi(url, data, handleSimulareQuestions, handleError).then(
          () => {
            setLoading(false);
          }
        );
      };
      getSimQuestionsAsync();
    };

    let getSimulareByIDUE = () => {
      const getSimByIDAsync = async () => {
        const url =
          "https://grileapiwin.azurewebsites.net/api/GetSimulareByID?code=IxeUbzXZ_d9xLzx8jsVOIhZPdZi2gyATfaiFf4wioZluAzFu2UetKA==";
        const data = { simulareId: state };
        await callApi(url, data, handleSimulareCurenta, handleError);
      };
      getSimByIDAsync();
    };
    getSimulareByIDUE();
    getSimulareQuestionsUE();
  };

  useEffect(setInitialState, [state]);

  return (
    <div className={classes.wrapperDiv}>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Paper className={classes.paper}>
            <Typography className={classes.headerText} variant="h5">
              Simularea curenta
            </Typography>
            <div>
              <ul>
                <li>ID: {simulareCurenta.ID}</li>
                <li>Nume: {simulareCurenta.Name}</li>
                <li>Descriere: {simulareCurenta.Description}</li>
                <li>
                  Data la care incepe:{" "}
                  {simulareCurenta.StartDate ? (
                    <>
                      {simulareCurenta.StartDate.split("T")[0]}
                      Ora: {simulareCurenta.StartDate.split("T")[1]}
                    </>
                  ) : (
                    ""
                  )}
                </li>
                <li>
                  Numar grile CS:{" "}
                  {simulareCurenta ? simulareCurenta.NumberCS : " incarcam"}
                </li>
                <li>
                  Numar grile CM:{" "}
                  {simulareCurenta ? simulareCurenta.NumberCM : " incarcam"}
                </li>
                <li>
                  Numar grile total:{" "}
                  {simulareCurenta
                    ? simulareCurenta.NumberCS + simulareCurenta.NumberCM
                    : "incarcam"}
                </li>
                <li>
                  Este live (o pot vedea userii):{" "}
                  {simulareCurenta.IsLive ? "Da" : "Nu"}
                </li>
              </ul>
            </div>
            <Typography className={classes.headerText} variant="h5">
              Updateaza simularea
            </Typography>
            <form onSubmit={updateSimulare} className={classes.formNewSimulare}>
              <TextField
                className={classes.textField}
                variant="outlined"
                color="secondary"
                id="createSimulare_name"
                label="Nume Simulare"
                value={newName}
                onInput={(e) => setNewName(e.target.value)}
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                color="secondary"
                id="createSimulare_description"
                label="Descriere"
                value={newDescription}
                onInput={(e) => setNewDescription(e.target.value)}
                multiline={true}
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                color="secondary"
                id="createSimulare_name"
                value={newStartDate}
                onInput={(e) => setNewStartDate(e.target.value)}
                type="datetime-local"
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                color="secondary"
                id="createSimulare_price"
                label="Pret simulare"
                type="number"
                value={newPrice}
                onInput={(e) => setNewPrice(e.target.value)}
              />

              <Button
                size="large"
                type="submit"
                className={classes.buttons}
                variant="contained"
                color="secondary"
                onClick={() => updateSimulareInDB()}
              >
                {" "}
                Updateaza simularea
              </Button>
            </form>

            <Typography className={classes.headerText} variant="h5">
              Vrei sa faci simularea live? Statusul ei curent este:{" "}
              {simulareCurenta.IsLive ? "live" : "offline"}
            </Typography>
            <Button
              size="large"
              className={classes.buttons}
              variant="contained"
              color="secondary"
              onClick={() => {
                updateSimulareInDB(true);
              }}
            >
              {" "}
              Go live!
            </Button>
          </Paper>
          <Paper className={classes.paper}>
            <Typography className={classes.headerText} variant="h5">
              Adauga sau sterge grile
            </Typography>
          </Paper>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.headerText} variant="h5">
                  Grile nepuse in simulare
                </Typography>
                <AdminsDisplayGrile
                  simID={simulareCurenta.ID}
                  getSimulareQuestions={getSimulareQuestions}
                />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>
                <Typography className={classes.headerText} variant="h5">
                  Grile din simulare
                </Typography>
                <Typography className={classes.headerText} variant="h6">
                  {simulareQuestions
                    .sort((grila1, grila2) => grila1.OrderID - grila2.OrderID)
                    .map((grila, index) => (
                      <div key={"_grila din simulare:" + String(index)}>
                        <Typography className={classes.headerText} variant="h6">
                          Pozitia curenta: {grila.OrderID}
                        </Typography>
                        <Typography>TipGrila: {grila.TipGrile}</Typography>
                        <br />
                        <Typography>
                          Intrebare {grila.OrderID}: {grila.Intrebare}
                        </Typography>
                        <br />
                        <Typography>a) {grila.Variante_a}</Typography>
                        <Typography>b) {grila.Variante_b}</Typography>
                        <Typography>c) {grila.Variante_c}</Typography>
                        <Typography>d) {grila.Variante_d}</Typography>
                        <Typography>e) {grila.Variante_e}</Typography>
                        <div className={classes.grilaActionsDiv}>
                          <Button
                            size="medium"
                            className={classes.buttons}
                            variant="contained"
                            color="secondary"
                            onClick={() => deleteGrila(grila.GrilaID)}
                          >
                            Delete grila
                          </Button>
                          <div className={classes.grilaActionsInputDiv}>
                            <TextField
                              className={classes.textField}
                              variant="outlined"
                              color="secondary"
                              id="newOrder"
                              label="Noua pozitie"
                              type="number"
                              onInput={(e) => setOrderId(e.target.value)}
                            />
                            <Button
                              size="medium"
                              className={classes.buttons}
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                editOrder(grila.GrilaID, orderId);
                              }}
                            >
                              Schimba ordinea
                            </Button>
                          </div>
                        </div>
                        <br />
                        <Divider />
                      </div>
                    ))}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </div>
  );
}
