import React from "react";
import Chart from "react-apexcharts";

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
            yaxis: [...annotation],
          },
          xaxis: {
            // range: X_AXIS_RANGE,
            type: "datetime",
            min: new Date("4/7/20").getTime(),
            max: new Date("4/6/21").getTime(),
          },
          yaxis: {
            // max: 320,
            // min: 180,
            labels: {
              formatter: (val) => {
                return val.toFixed(0);
              },
            },
            title: {
              text: "Price",
            },
          },
          stroke: { curve: "smooth", width: 3 },
        }}
        series={[
          {
            name: "BABA",
            data: series.slice(),
          },
        ]}
        width="700"
      />
    </div>
  );
}

export default Graph;
