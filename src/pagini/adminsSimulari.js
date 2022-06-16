import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import moment from "moment";
import { callApi } from "../utils/callApi";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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

export default function AdminsSimulari() {
  const classes = useStyles();
  const TITLE = "admins";
  const [simulari, setSimulari] = useState([
    {
      name: "test1",
      description: "tot test 1",
      startDate: "candva",
    },
    {
      name: "test2",
      description: "tot test 2",
      startDate: "altcandva",
    },
  ]);
  const [newSimulare, setNewSimulare] = useState({});
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  const [items, setItems] = useState({});

  const handleItems = (e) => {
    setItems(e.data);
  };

  const handleError = (e) => {
    if (e === 403) {
      // history.push({ pathname: "/" });
    } else {
      console.log(e);
    }
  };

  const createSimulare = async (event) => {
    event.preventDefault();
    console.log("am inceput de creat simulare");
    setNewSimulare((prevState) => ({
      ...prevState,
      name: newName,
      description: newDescription,
      startDate: newStartDate,
      CreatedAt: moment().format(),
      EditedAt: null,
      NumberCS: 0,
      NumberCM: 0,
      IsLived: false,
    }));
    const data = {
      name: newName,
      description: newDescription,
      startDate: newStartDate,
    };
    const url =
      "https://grileapiwin.azurewebsites.net/api/CreateSimulare?code=xv9GI4DuhWKswlBaP63TH5PbFdwtFZFPG8nwv5xE08zJAzFucz89jw==";
    await callApi(url, data, handleItems, handleError);
    console.log("data:", data, "newSimulareName:", newSimulare.name, items);
    event.preventDefault();
  };

  useEffect(() => {
    getAllSimulari();
    console.log("asta luam de la db?", items, items["lista"]);
  }, []);

  const getAllSimulari = async () => {
    const url =
      "https://grileapiwin.azurewebsites.net/api/GetAllSimulari?code=vvBd9a39oQtRtioKnqxVzDQGDRG8GUx5BjfrQM-9wykTAzFu5AxU5g==";
    try {
      const data = {};
      const wtf = await callApi(url, data, handleItems, handleError);
      console.log("try de la call all simulari", items, data, wtf);
    } catch (error) {}
  };

  return (
    <div className={classes.wrapperDiv}>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <Paper className={classes.paper}>
        <Typography className={classes.headerText} variant="h5">
          Creeaza o noua simulare:{" "}
        </Typography>
        <Typography>
          Introdu numele, descrierea si data la care ai vrea sa aiba loc
          simularea. Toate datele introduse acum pot fi editate mai tarziu
        </Typography>
        <Typography>Grilele le vei aduga mai tarziu</Typography>
        <form onSubmit={createSimulare} className={classes.formNewSimulare}>
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
            Creeaza simularea
          </Button>
        </form>
      </Paper>
      <Paper className={classes.paper}>
        <Typography className={classes.headerText} variant="h5">
          Simulari existente:{" "}
        </Typography>
        {simulari.length === 0
          ? "Momentan nu avem nicio simulare salvata"
          : "ar trebui sa arat ceva"}
        {simulari.map((simulare) => (
          <div>
            {simulare.name} {simulare.description}
          </div>
        ))}
      </Paper>
    </div>
  );
}
