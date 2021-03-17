import Chart from "react-apexcharts";

function Graph({ graphData }) {

  return (
    <Chart
      options={{
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: graphData.xaxis,
        },
      }}
      series={[
        {
          name: "series-1",
          data: graphData.yaxis,
        },
      ]}
      type="line"
      width="600"
    />
  );
}

export default Graph;
