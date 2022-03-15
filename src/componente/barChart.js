import Chart from "react-google-charts";

export default function BarChartHorizontal(props) {
  return (
    <Chart
      width="100%"
      height={100}
      chartType="Bar"
      loader={<div>Loading Chart</div>}
      data={props.data}
      options={{
        backgroundColor: "none",
        tooltip: {
          textStyle: { fontSize: 13 },
          trigger: "selection",
        },
        is3D: false,
        colors: ["#4caf50", "#FA9C4F"],
        chart: {
          title: props.title,
        },
        hAxis: {
          minValue: 0,
          maxValue: 100,
          ticks: 10,
        },

        bars: "horizontal",
        axes: {
          y: {
            10: { side: "right" },
          },
        },
      }}
      rootProps={{ "data-statistici": "1" }}
    />
  );
}
