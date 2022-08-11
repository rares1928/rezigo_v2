import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

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

export default function CountDown({ date }) {
	const classes = useStyles();
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [hours, setHours] = useState(0);
	const [days, setDays] = useState(0);
	useEffect(() => {
		// console.log(date);
		// var dataEveniment = date;
		const [dateValues, timeValues] = date.split("T");
		const [year, month, day] = dateValues.split("-");
		const [hours, minutes, seconds] = timeValues.split(":");
		let simulareStartDate = new Date(+year, +month - 1, +day, +hours, +minutes, +seconds);
		var today = new Date();

		var timeToParty = simulareStartDate.getTime() - today.getTime();
		setDays(Math.floor(timeToParty / (1000 * 60 * 60 * 24)));
		setHours(Math.floor(timeToParty / (1000 * 60 * 60)) % 24);
		setMinutes(Math.floor(timeToParty / (1000 * 60)) % 60);
		setSeconds(Math.floor(timeToParty / 1000) % 60);

		if (timeToParty <= 0) {
			setDays(0);
			setHours(0);
			setMinutes(0);
			setSeconds(0);
		} else {
			let sampleInterval = setInterval(() => {
				if (seconds === 0) {
					if (minutes === 0) {
						if (hours === 0) {
							if (days === 0) {
								clearInterval(sampleInterval);
							} else {
								setDays(days - 1);
								setHours(23);
								setMinutes(59);
								setSeconds(59);
							}
						} else {
							setHours(hours - 1);
							setMinutes(59);
							setSeconds(59);
						}
					} else {
						setMinutes(minutes - 1);
						setSeconds(59);
					}
				} else {
					setSeconds(seconds - 1);
				}
			}, 1000);
			return () => {
				clearInterval(sampleInterval);
			};
		}
	}, [seconds, minutes, hours, days]);
	return (
		<div>
			<Typography>Timp rămas până începe simularea:</Typography>
			<div id="timer">
				<div>
					<Typography>
						{days} zile, {hours} ore, {minutes} minute, {seconds} secunde
					</Typography>
				</div>
			</div>
		</div>
	);
}
