import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { callApi } from "../utils/callApi";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  wrapperDiv: {
    display: "flex",
    flexDirection: "column",
    minHeight: "calc(100vh - calc(8 * 8px))",
    paddingTop: theme.spacing(3),
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

export default function SimulariPage() {
  const classes = useStyles();
  const TITLE = "Simulări";
  const [simulari, setSimulari] = useState([]);
  const [newSimulare, setNewSimulare] = useState({});
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newStartDate, setNewStartDate] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  const handleSetSimulari = (e) => {
    setSimulari(e.data["lista"]);
  };

  const handleError = (e) => {
    if (e === 403) {
    } else {
      console.log(e);
    }
  };

  //New attempt
  const getSimulari = () => {
    const getSimulariFromDB = async () => {
      const url =
        "https://grileapiwin.azurewebsites.net/api/GetAllSimulari?code=vvBd9a39oQtRtioKnqxVzDQGDRG8GUx5BjfrQM-9wykTAzFu5AxU5g==";
      const data = {};
      await callApi(url, data, handleSetSimulari, handleError);
    };
    getSimulariFromDB();
  };

  useEffect(getSimulari, []);

  return (
    <div className={classes.wrapperDiv}>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>

      <Typography className={classes.headerText} variant="h4">
        Simulări oficiale Rezigo
      </Typography>

      {simulari.length === 0 ? (
        <div>Momentan nu avem nicio simulare salvată</div>
      ) : (
        <Paper className={classes.paper}>
          <div>
            {simulari.map((simulare, index) => (
              <div
                className={classes.paper}
                key={"_test tip simulare:" + String(index)}
              >
                <div>
                  <Typography className={classes.headerText} variant="h5">
                    Nume: {simulare.Name}
                  </Typography>
                  <Typography>Descriere: {simulare.Description}</Typography>
                  <Typography>
                    Data la care începe: {simulare.StartDate.split("T")[0]} ora{" "}
                    {simulare.StartDate.split("T")[1]}{" "}
                  </Typography>
                  <Typography>
                    Număr de grile: {simulare.NumberCS} CS + {simulare.NumberCM}{" "}
                    CM
                  </Typography>
                  <Button
                    size="medium"
                    className={classes.buttons}
                    variant="contained"
                    color="secondary"
                    onClick={() => {}}
                  >
                    Editeaza simularea
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Paper>
      )}
    </div>
  );
}
