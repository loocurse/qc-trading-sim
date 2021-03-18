import React from "react";
import Chart from "react-apexcharts";

const X_AXIS_RANGE = 1000 * 3600 * 24 * 10; // 10 days

function Graph({ graphData }) {
  return (
    <Chart
      options={{
        chart: {
          id: "basic-bar",
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 2000,
            },
          },
          type: "line",
        },
        xaxis: {
          range: X_AXIS_RANGE,
          type: "datetime",
        },
        yaxis: {
          max: 20,
          min: 0,
        },
        stroke: { curve: "smooth" },
      }}
      series={[
        {
          name: "series-1",
          data: graphData.slice(),
        },
      ]}
      width="600"
    />
  );
}

export default Graph;
