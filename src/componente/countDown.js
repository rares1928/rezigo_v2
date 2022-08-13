import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";

export default function CountDown({ date }) {
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
    let simulareStartDate = new Date(
      +year,
      +month - 1,
      +day,
      +hours,
      +minutes,
      +seconds
    );
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
  }, [seconds, minutes, hours, days, date]);
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
