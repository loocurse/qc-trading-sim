import React from "react";
import Chart from "react-apexcharts";

const X_AXIS_RANGE = 1000 * 3600 * 24 * 10; // 10 days

function Graph({ series, annotation }) {
  return (
    <Chart
      options={{
        chart: {
          id: "basic-bar",
          animations: {
            enabled: true,
            easing: "linear",
            dynamicAnimation: {
              speed: 1000,
            },
          },
          type: "line",
        },
        annotations: {
          // I wanted an annotation to indicate when the time that the user 'buy', but annotation is jerky and cannot be animated: https://github.com/apexcharts/apexcharts.js/issues/826
          // xaxis: [
          // {
          //   x: new Date('30 Mar 2021').getTime(),
          //   borderColor: "#006400",
          //   label: {
          //     borderColor: "#006400",
          //     style: {
          //       color: "#fff",
          //       background: "#006400",
          //     },
          //     text: "Buy",
          //   },
          // },
          // ],
          yaxis: [...annotation],
        },
        xaxis: {
          range: X_AXIS_RANGE,
          type: "datetime",
        },
        yaxis: {
          max: 40,
          min: 0,
          labels: {
            formatter: (val) => {
              return val.toFixed(0);
            },
          },
        },
        stroke: { curve: "smooth" },
      }}
      series={[
        {
          name: "series-1",
          data: series.slice(),
        },
      ]}
      width="600"
    />
  );
}

export default Graph;
