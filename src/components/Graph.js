import React from "react";
import Chart from "react-apexcharts";

// const X_AXIS_RANGE = 1000 * 3600 * 24 * 1; // 1 day

// TODO scale y axis so that the data range would not be obvious
function Graph({ series, annotation }) {
  return (
    <div>
      <h2>
        <em>NYSE: BABA</em>
      </h2>
      <Chart
        options={{
          chart: {
            toolbar: {
              show: false,
            },
            id: "basic-bar",
            animations: {
              enabled: true,
              easing: "linear",
              dynamicAnimation: {
                speed: 500,
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
            // range: X_AXIS_RANGE,
            type: "datetime",
            min: new Date("4/7/20").getTime(),
            max: new Date("4/6/21").getTime(),
          },
          yaxis: {
            max: 320,
            min: 180,
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
            name: "NYSE-BABA",
            data: series.slice(),
          },
        ]}
        width="600"
      />
    </div>
  );
}

export default Graph;
