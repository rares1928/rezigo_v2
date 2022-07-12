import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { callApi } from "../utils/callApi";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import Link from "@material-ui/core/Link";
import { useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import CountDown from "../componente/countDown";

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
		marginBottom: theme.spacing(1),
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
}));

export default function SimulariPage() {
	const classes = useStyles();
	const TITLE = "Simulări";
	let history = useHistory();

	const [simulari, setSimulari] = useState([]);
	const [loading, setLoading] = useState(false);
	const [goLoading, setGoLoading] = useState(false);

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
			state: { testId: testSimulareId.data["lista"], testType: "simulare" },
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

			<Typography className={classes.headerText} variant="h4">
				Simulări oficiale Rezigo
			</Typography>

			{loading ? (
				<CircularProgress />
			) : (
				<>
					{simulari.length === 0 ? (
						<div>Momentan nu avem nicio simulare salvată</div>
					) : (
						<Paper className={classes.paper}>
							<div>
								{simulari.map((simulare, index) => (
									<div className={classes.paper} key={"_test tip simulare:" + String(index)}>
										<div>
											<Typography className={classes.headerText} variant="h6">
												Nume: {simulare.Simulare.Name}
											</Typography>
											<div className={classes.simulareDiv}>
												<div>
													<Typography>
														Data la care începe: {simulare.Simulare.StartDate.split("T")[0]} ora{" "}
														{simulare.Simulare.StartDate.split("T")[1]}{" "}
													</Typography>
													<Typography>Descriere: {simulare.Simulare.Description}</Typography>
												</div>
												<div>
													<CountDown date={simulare.Simulare.StartDate} />
													<Button
														size="medium"
														className={classes.buttons}
														variant="contained"
														color="secondary"
														onClick={() => {
															creeazaTestSimulare(simulare.Simulare.ID);
														}}
														disabled={!simulare.APlatit || goLoading}
													>
														{goLoading ? <CircularProgress /> : simulare.InceputTest ? "Continuă simularea" : "Începe simularea"}
													</Button>
												</div>
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
										<Divider />
									</div>
								))}
							</div>
						</Paper>
					)}
				</>
			)}
		</div>
	);
}
