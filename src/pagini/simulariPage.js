import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { callApi } from "../utils/callApi";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
import CountDown from "../componente/countDown";
import CountDownHours from "../componente/countDownHours";
import rezultate from "../poze/RezultateSimulareKumar08.2022.pdf";

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
        marginBottom: theme.spacing(2),
    },
    paper: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
        marginBottom: theme.spacing(6),
    },
    formNewSimulare: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    simulareDiv: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    buttons: {
        margin: theme.spacing(1),
    },
    textNeplatit: {
        marginTop: theme.spacing(2),
        color: theme.palette.error.main,
    },
    centerDiv: {
        display: "flex",
        margin: "auto",
        marginTop: theme.spacing(2),
    },
    maxWidth: {
        width: "100%",
    },
}));

export default function SimulariPage() {
    const classes = useStyles();
    const TITLE = "Simulări";
    let history = useHistory();

    const [simulari, setSimulari] = useState([]);
    const [loading, setLoading] = useState(false);
    const [goLoading, setGoLoading] = useState(false);
    const [id, setId] = useState("");

    const hoursToAddForFinish = 3600000 * 24;

    const timestampToDate = (timestamp) => {
        let date = new Date(timestamp);
        let html = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ora ${date.getHours()}:${date.getMinutes()}`;
        return html;
    };

    const stringToDate = (string) => {
        let date = new Date(string);
        let html = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ora ${date.getHours()}:${date.getMinutes()}`;

        return html;
    };

    const handleSetSimulari = (e) => {
        setSimulari(e.data["lista"]);
        setId(e.data["id"]);
    };

    const handleError = (e) => {
        if (e === 403) {
        } else {
            console.log(e);
        }
    };

    //New attempt
    const getSimulari = () => {
        setLoading(true);
        const getSimulariFromDB = async () => {
            const url = "https://grileapiwin.azurewebsites.net/api/GetAllSimulariUser?code=HxAlZyvuHUfuO5kSUCBrxvOw_-HCrDXCa5CjQZrxW3QpAzFuSGekHQ==";
            const data = {};
            await callApi(url, data, handleSetSimulari, handleError).then(() => {
                setLoading(false);
            });
        };
        getSimulariFromDB();
    };

    useEffect(getSimulari, []);

    const handleTestSimulareId = (testSimulareId) => {
        return history.push({
            pathname: "/rezolva_test",
            state: {
                testId: testSimulareId.data["lista"].testID,
                startDate: testSimulareId.data["lista"].startDate,
                testType: "simulare",
            },
        });
    };

    const creeazaTestSimulare = async (simulareId) => {
        setGoLoading(true);
        let url = "https://grileapiwin.azurewebsites.net/api/CreateTestFromSimulare?code=Rvw9qSqNw8iOf2W8PxysnQocQX7MPUoDFN8mdWnNgsyuAzFupH91ZA==";
        const data = { simulareId: simulareId };
        await callApi(url, data, handleTestSimulareId, handleError).then(() => {
            setGoLoading(false);
        });
    };

    return (
        <div className={classes.wrapperDiv}>
            <Helmet>
                <title>{TITLE}</title>
            </Helmet>
            <Container maxWidth="md">
                <Typography className={classes.headerText} variant="h4">
                    Simulări oficiale Rezigo
                </Typography>

                <Typography variant="h5">Regulament:</Typography>
                <div>
                    <ul>
                        <li>
                            <Typography>
                                Pentru a avea acces la o simulare, trebuie să ai activ contul Premium sau să fi achiziționat separat simularea respectivă (
                                <Link color="secondary" href="/premium">
                                    de aici
                                </Link>
                                ). Fiecare simulare poate fi începută între datele specificate în descrierea ei.
                            </Typography>
                        </li>
                        <li>
                            <Typography>
                                Pentru punctajele oficiale (care vor fi afișate pe{" "}
                                <Link color="secondary" href="https://www.facebook.com/rezigo.ro">
                                    Facebook
                                </Link>{" "}
                                și pe{" "}
                                <Link color="secondary" href="https://www.instagram.com/rezigo.oficial/">
                                    instagram
                                </Link>
                                ) vei avea o fereastră de 4 ore în care să trimiți răspunsurile, din momentul în care ai apăsat butonul de începe simularea
                            </Typography>
                        </li>
                        <li>
                            <Typography>
                                O dată achiziționată, vei avea mereu acces la acea simulare. Astfel, poți verifica oricand răspunsurile date. Totuși, nu uita că
                                răspunsurile oficiale sunt înregistrate doar în primele 4 ore.
                            </Typography>
                        </li>
                        <li>
                            <Typography>
                                Exemplu: Andrei a achiziționat o simulare care începe la data 2022-07-10 ora 10:00 și se termină la ora 2022-07-11 ora 16:00. El
                                decide să înceapă testul în prima zi, 2022-07-10, la ora 18:00. În primele 4 ore (adică până la ora 22:00) el răspunde la 160 de
                                întrebări. La restul întrebărilor răspunde pana la ora 24:00. La afișarea rezultatelor finale, noi vom lua în calcul doar
                                răspunsurile de la cele 160 de întrebări.
                            </Typography>
                        </li>
                    </ul>
                </div>

                <Typography variant="h5">ID-ul tău: {id}</Typography>
                <Typography>Pentru a te regăsi pe lista de rezultate caută ID-ul: {id}</Typography>

                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {simulari.length === 0 ? (
                            <div>Momentan nu avem nicio simulare salvată</div>
                        ) : (
                            <div>
                                <div>
                                    {simulari.map((simulare, index) => (
                                        <Paper className={classes.paper} key={"_test tip simulare:" + String(index)}>
                                            <div>
                                                <Grid container direction="row" justifyContent="space-between" spacing={4}>
                                                    <Grid className={classes.footerItem} item>
                                                        <Typography className={classes.headerText} variant="h6">
                                                            Nume: {simulare.Simulare.Name}
                                                        </Typography>
                                                        <Typography>Descriere: {simulare.Simulare.Description}</Typography>
                                                    </Grid>
                                                    <Grid className={classes.footerItem} item>
                                                        <div>
                                                            <Typography>
                                                                Start:
                                                                {stringToDate(simulare.Simulare.StartDate)}
                                                            </Typography>
                                                            <Typography>
                                                                Terminare:{" "}
                                                                {timestampToDate(new Date(simulare.Simulare.StartDate).getTime() + hoursToAddForFinish)}
                                                            </Typography>
                                                            <br />
                                                            <CountDown date={simulare.Simulare.StartDate} />
                                                            {simulare.InceputTest ? (
                                                                <>
                                                                    <Typography>Timp rămas pentru rezultatele oficiale:</Typography>
                                                                    <CountDownHours date={simulare.CreationDate} numberOfHours={4} />
                                                                </>
                                                            ) : (
                                                                <></>
                                                            )}
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                                <div className={classes.centerDiv}>
                                                    <Button
                                                        size="medium"
                                                        className={(classes.buttons, classes.centerDiv, classes.maxWidth)}
                                                        variant="contained"
                                                        color="secondary"
                                                        onClick={() => {
                                                            creeazaTestSimulare(simulare.Simulare.ID);
                                                        }}
                                                        disabled={
                                                            !simulare.APlatit || goLoading || new Date(simulare.Simulare.StartDate).getTime() > Date.now()
                                                        }
                                                    >
                                                        {goLoading ? <CircularProgress /> : simulare.InceputTest ? "Continuă simularea" : "Începe simularea"}
                                                    </Button>
                                                </div>
                                                <div className={classes.centerDiv}>
                                                    <Link color="secondary" href={rezultate} download className={classes.centerDiv} disabled={new Date(simulare.Simulare.StartDate).getTime() > Date.now()}>
                                                        Rezultate simulare
                                                    </Link>
                                                </div>
                                                {simulare.APlatit ? (
                                                    ""
                                                ) : (
                                                    <Typography className={classes.textNeplatit}>
                                                        Din păcate nu ai acces la această simulare. O poți cumpăra de{" "}
                                                        <Link href="/premium" color="secondary">
                                                            {" "}
                                                            aici
                                                        </Link>
                                                    </Typography>
                                                )}
                                            </div>
                                        </Paper>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </Container>
        </div>
    );
}
