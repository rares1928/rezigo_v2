import Chart from "react-google-charts";


export default function Placinta(props) {

    return (
      <Chart
        width = "100%"
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={props.data}
        options={{
          chartArea:{
            width: "100%",
            height: 150,
          },
          backgroundColor: "none",
          tooltip:{
            textStyle:{fontSize: 13}
          },
          legend:{
            textStyle:{fontSize: 14, color: props.darkMode? "#fff" : "#000"},
          },
          is3D: false,
          colors: ["#4caf50","#f44336"]
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    );
  }
