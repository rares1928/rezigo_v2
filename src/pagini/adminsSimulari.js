import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import moment from "moment";
import { callApi } from "../utils/callApi";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import CountDown from "../componente/countDown";

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
	const [simulari, setSimulari] = useState([]);
	const [newSimulare, setNewSimulare] = useState({});
	const [newName, setNewName] = useState("");
	const [newDescription, setNewDescription] = useState("");
	const [newStartDate, setNewStartDate] = useState("");
	// const [isLoading, setIsLoading] = useState(false);
	let history = useHistory();

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
			IsLive: false,
		}));
		const data = {
			name: newName,
			description: newDescription,
			startDate: newStartDate,
		};
		const url = "https://grileapiwin.azurewebsites.net/api/CreateSimulare?code=xv9GI4DuhWKswlBaP63TH5PbFdwtFZFPG8nwv5xE08zJAzFucz89jw==";
		await callApi(url, data, () => {}, handleError).then(getSimulari);
		console.log("data:", data, "newSimulareName:", newSimulare.name);
		event.preventDefault();
	};

	const handleEmpty = () => {
		console.log("call de sters simulare catre DB");
	};

	// const deleteSimulare = (id) => {
	// 	console.log("am intrat in delete sim");
	// 	const deleteSimulareAsync = async () => {
	// 		const url = "https://grileapiwin.azurewebsites.net/api/DeleteSimulare?code=_-q4aEp1VfK0_dPxdVdR29_QeREFirIiLIcurIJFZi80AzFuA7G7iw==";
	// 		const data = { simulareId: id };
	// 		await callApi(url, data, handleEmpty, handleError);
	// 	};
	// 	deleteSimulareAsync();
	// };

	const deleteSimulareAsync = async (id) => {
		console.log("am intrat in delete sim");
		const url = "https://grileapiwin.azurewebsites.net/api/DeleteSimulare?code=_-q4aEp1VfK0_dPxdVdR29_QeREFirIiLIcurIJFZi80AzFuA7G7iw==";
		const data = { simulareId: id };
		await callApi(url, data, handleEmpty, handleError).then(getSimulari);
	};

	const handleSetSimulari = (e) => {
		setSimulari(e.data["lista"]);
	};

	const handleError = (e) => {
		if (e === 403) {
			// history.push({ pathname: "/" });
		} else {
			console.log(e);
		}
	};
	// const displaySimulariMare = () => {
	// 	const displaySimulariMica = async () => {
	// 		setIsLoading(true);
	// 		const url = "https://grileapiwin.azurewebsites.net/api/GetAllSimulari?code=vvBd9a39oQtRtioKnqxVzDQGDRG8GUx5BjfrQM-9wykTAzFu5AxU5g==";
	// 		const data = {};
	// 		try {
	// 			await callApi(url, data, handleItems, handleError).then(() => {
	// 				const simulariDB = items["lista"];
	// 				console.log(simulariDB);
	// 				// setSimulari(simulariDB);
	// 			});
	// 		} catch (error) {
	// 			console.log(error);
	// 		} finally {
	// 			setIsLoading(false);
	// 		}
	// 	};
	// 	displaySimulariMica();
	// };

	// useEffect(displaySimulariMare, []);
	// console.log("GetAllSimulari:", items["lista"], "simulari", simulari);

	//New attempt
	const getSimulari = () => {
		const getSimulariFromDB = async () => {
			const url = "https://grileapiwin.azurewebsites.net/api/GetAllSimulari?code=vvBd9a39oQtRtioKnqxVzDQGDRG8GUx5BjfrQM-9wykTAzFu5AxU5g==";
			const data = {};
			await callApi(url, data, handleSetSimulari, handleError);
		};
		getSimulariFromDB();
	};

	useEffect(getSimulari, []);

	//   useEffect(() => {
	//     if (items["lista"]) {
	//       setSimulari(items["lista"]);
	//       console.log(items["lista"], simulari);
	//     }
	//   }, [items["lista"]]);

	const editSimulare = (id) => {
		return history.push({
			pathname: "/admins/simulari/simulare_edit/" + id,
			state: id,
		});
	};

	// useEffect(() => {
	// 	setIsLoading(true);
	// 	getAllSimulari().then(() => {
	// 		const simulariDB = items["lista"];
	// 		setSimulari(simulariDB);
	// 		console.log("GetAllSimulari:", items["lista"], "simulari", simulari);
	// 	});
	// 	setIsLoading(false);
	// }, []);

	// const getAllSimulari = async () => {
	// 	setItems({});
	// 	const url = "https://grileapiwin.azurewebsites.net/api/GetAllSimulari?code=vvBd9a39oQtRtioKnqxVzDQGDRG8GUx5BjfrQM-9wykTAzFu5AxU5g==";
	// 	const data = {};
	// 	await callApi(url, data, handleItems, handleError);
	// };

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
					Introdu numele, descrierea si data la care ai vrea sa aiba loc simularea. Toate datele introduse acum pot fi editate mai tarziu
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

					<Button size="large" type="submit" className={classes.buttons} variant="contained" color="secondary">
						{" "}
						Creeaza simularea
					</Button>
				</form>
			</Paper>
			<Paper className={classes.paper}>
				<Typography className={classes.headerText} variant="h5">
					Simulari existente:{" "}
				</Typography>
				{simulari.length === 0 ? (
					<div>
						"Momentan nu avem nicio simulare salvata"
						<CircularProgress />
					</div>
				) : (
					<div>
						<Typography className={classes.headerText} variant="h5">
							{simulari.map((simulare, index) => (
								<Paper className={classes.paper} key={"_test tip simulare:" + String(index)}>
									<div>
										<Typography className={classes.headerText} variant="h5">
											Nume simulare: {simulare.Name}
										</Typography>
										<h5>Descriere simulare: {simulare.Description}</h5>
										<h5>Id simulare: {simulare.ID}</h5>
										<CountDown date={simulare.StartDate} />
										<Button
											size="medium"
											className={classes.buttons}
											variant="contained"
											color="secondary"
											onClick={() => editSimulare(simulare.ID)}
										>
											Editeaza simularea
										</Button>
										<Button
											size="medium"
											className={classes.buttons}
											variant="outlined"
											color="secondary"
											onClick={() => {
												deleteSimulareAsync(simulare.ID);
											}}
										>
											Sterge simularea
										</Button>
									</div>
								</Paper>
							))}
						</Typography>
					</div>
				)}
			</Paper>
		</div>
	);
}
