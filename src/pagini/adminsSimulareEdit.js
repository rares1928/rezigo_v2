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

	const setInitialState = () => {
		setNewName(simulareCurenta.name);
		setNewDescription(simulareCurenta.description);
		setNewStartDate(simulareCurenta.startDate);
		setNewIsLive(simulareCurenta.isLive);
	};

	useEffect(setInitialState, []);

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
						<li>Nume:{simulareCurenta.name}</li>
						<li>Descriere: {simulareCurenta.description}</li>
						<li>Data la care incepe: {simulareCurenta.startDate}</li>
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

					<Button size="large" type="submit" className={classes.buttons} variant="contained" color="secondary">
						{" "}
						Updateaza simularea
					</Button>
				</form>

				<Typography className={classes.headerText} variant="h5">
					Vrei sa faci simularea live? Statusul ei curent este: {simulareCurenta.IsLive}
				</Typography>
				<Button size="large" className={classes.buttons} variant="contained" color="secondary">
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
						<AdminsDisplayGrile />
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper className={classes.paper}>
						<Typography className={classes.headerText} variant="h5">
							Grile din simulare
						</Typography>
					</Paper>
				</Grid>
			</Grid>
		</div>
	);
}
