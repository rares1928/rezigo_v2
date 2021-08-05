import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    placinta:{
        backgroundColor:"#a4bf93",
    },
}));


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
    name,
    colorText
  }) => {
    console.log({
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        percent,
        index,
        name,
        colorText
      });
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const radiusName = (outerRadius - innerRadius) * 0.3;
    const xName = cx + radiusName * Math.cos(-midAngle * RADIAN);
    const yName = cy + 10;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <>
      <text
        x={x}
        y={y}
        fill = {colorText}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <text
      x={xName}
      y={yName}
      fill = {colorText}
      textAnchor={xName > cx ? "start" : "end"}
      dominantBaseline="central"
      >
        {name}
      </text>
      </>
    );
};

const COLORS = ["#0088FE", "#00C49F"];
const data = [
    { name: "Neterminate", rapid: 400, colorText:"magenta" },
    { name: "Terminate", rapid: 300, colorText:"magenta" }
];


export default function Placinta(props) {
    const classes=useStyles();
    return (
        <PieChart className={classes.placinta} width={200} height={120}>
        <Pie
            dataKey="rapid"
            startAngle={0}
            endAngle={180}
            data={data}
            cx={95}
            cy={90}
            outerRadius={80}
            innerRadius={10}
            nameKey="name"
            label={renderCustomizedLabel}
            labelLine={false}
        >
            {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
        </Pie>
        </PieChart>
    );
}
