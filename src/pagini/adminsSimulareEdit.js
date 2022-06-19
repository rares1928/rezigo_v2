import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import moment from "moment";
import { callApi } from "../utils/callApi";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import AdminsDisplayGrile from "./adminsDisplayGrile";
import { useLocation, useHistory } from "react-router-dom";

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
  textField: {},
  buttons: {},
}));

export default function AdminsSimuareEdit() {
  const classes = useStyles();
  const TITLE = "admins";
  const [simulareCurenta, setSimulareCurenta] = useState({});
  const [newName, setNewName] = useState("");
  const [newIsLive, setNewIsLive] = useState(false);
  const [newDescription, setNewDescription] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const { state } = useLocation();
  const [items, setItems] = useState({});
  const [itemsSim, setItemsSim] = useState({});
  const [itemsGrile, setItemsGrile] = useState({});
  const [simulareQuestions, setSimulareQuestions] = useState([]);

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

  const handleItems = (e) => {
    setItems(e.data);
  };

  const handleItemsSim = (e) => {
    setItemsSim(e.data);
  };

  const handleItemsGrile = (e) => {
    setItemsGrile(e.data);
  };

  const handleError = (e) => {
    if (e === 403) {
      // history.push({ pathname: "/" });
    } else {
      console.log(e);
    }
  };

  const getGrileById = async (id) => {
    const url =
      "https://grileapiwin.azurewebsites.net/api/GetGrilaAdmin?code=CCuH1t1ZUm70fO52wBiKbTcVFiEjFuZVOH7rBShs0cuJOaI1qdWt9Q==";
    const data = { grilaId: id };
    await callApi(url, data, handleItemsGrile, handleError);
  };

  const getSimulareQuestions = async () => {
    const url =
      "https://grileapiwin.azurewebsites.net/api/GetAllQuestions?code=uSgy01hLnddLFUbfUltfB-qfLP8jQIclHeLDhAYlGL-hAzFu-vOi4A==";
    const data = { simulareId: state };
    await callApi(url, data, handleItems, handleError);
  };

  const getSimulareByID = async () => {
    const url =
      "https://grileapiwin.azurewebsites.net/api/GetSimulareByID?code=IxeUbzXZ_d9xLzx8jsVOIhZPdZi2gyATfaiFf4wioZluAzFu2UetKA==";
    const data = { simulareId: state };
    await callApi(url, data, handleItemsSim, handleError);
  };

  // const addQuestionToSim = async () => {
  // 	const url = "https://grileapiwin.azurewebsites.net/api/AddQuestionToSimulare?code=XLRsha5UvXRHSWjduHZKUbJusqu5GMkSi1H5Z1D1Le8gAzFuhdVcjQ==";
  // 	const data = {};
  // 	await callApi(url, data, handleItemsSim, handleError);
  // };

  const setInitialState = () => {
    getSimulareByID();
    getSimulareQuestions();
    // setNewName(simulareCurenta.name);
    // setNewDescription(simulareCurenta.description);
    // setNewStartDate(simulareCurenta.startDate);
    // setNewIsLive(simulareCurenta.isLive);
  };

  useEffect(setInitialState, []);

  useEffect(() => {
    if (itemsSim["lista"]) {
      setSimulareCurenta(itemsSim["lista"][0]);
      console.log(itemsSim["lista"][0], simulareCurenta);
    }
  }, [itemsSim["lista"]]);

  useEffect(() => {
    if (items["lista"]) {
      setSimulareQuestions([...items["lista"]]);
      console.log("items: ", items["lista"], "simQuest: ", simulareQuestions);
    }
  }, [items["lista"]]);

  // useEffect(() => {
  // 	if (items["lista"][0]) {
  // 		setSimulareCurenta(items["lista"][0]);
  // 	}
  // }, [items["lista"][0]]);

  // useEffect(() => {
  // 	if (simulareDetails) {
  // 		setSimulareCurenta(simulareDetails);
  // 	}
  // }, [simulareDetails]);

  return (
    <div className={classes.wrapperDiv}>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Paper className={classes.paper}>
        <Typography className={classes.headerText} variant="h5">
          Simularea curenta
        </Typography>
        <Typography>
          <ul>
            <li>ID: {simulareCurenta.ID}</li>
            <li>Nume: {simulareCurenta.Name}</li>
            <li>Descriere: {simulareCurenta.Description}</li>
            <li>Data la care incepe: {simulareCurenta.StartDate}</li>
            <li>Numar CS: {simulareCurenta.NumberCS}</li>
            <li>Numar CM: {simulareCurenta.NumberCM}</li>
            <li>Este live (o pot vedea userii): {simulareCurenta.IsLive}</li>
          </ul>
        </Typography>
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

          <Button
            size="large"
            type="submit"
            className={classes.buttons}
            variant="contained"
            color="secondary"
          >
            {" "}
            Updateaza simularea
          </Button>
        </form>

        <Typography className={classes.headerText} variant="h5">
          Vrei sa faci simularea live? Statusul ei curent este:{" "}
          {simulareCurenta.IsLive}
        </Typography>
        <Button
          size="large"
          className={classes.buttons}
          variant="contained"
          color="secondary"
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
            <AdminsDisplayGrile simID={simulareCurenta.ID} />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography className={classes.headerText} variant="h5">
              Grile din simulare
            </Typography>
            <Typography className={classes.headerText} variant="h5">
              {simulareQuestions.map((grila) => (
                <div>{grila.GrilaID}</div>
              ))}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
