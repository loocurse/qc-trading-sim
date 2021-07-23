import React from "react";
import ReactApexChart from "react-apexcharts";
import { getIndex, heroku } from "../api";

class ApexChartPerformance extends React.Component<unknown, any> {
  constructor(props: unknown) {
    super(props);

    this.state = {
      series: [{}],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          type: "datetime",
        },
        legend: {
          show: true,
          position: "top",
        },
        yaxis: {
          forceNiceScale: true,
          labels: {
            formatter: function (value: number) {
              return `${(value * 100).toFixed(2)}%`;
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        title: {
          text: "Cumulative returns vs S&P 500",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
      },
    };
    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData(): Promise<void> {
    const res = await getIndex();
    let value = 1;
    let previous_value = res[0].o;
    const newarray = res.map((result) => {
      const current_value = result.o;
      value *= current_value / previous_value;
      previous_value = current_value;
      return { x: new Date(result.t), y: value - 1 };
    });

    const performance = await heroku.get("algoGraph");

    this.setState({
      ...this.state,
      series: [
        { name: "S&P 500", data: newarray },
        { name: "Quant Crunch Algorithm", data: performance.data },
      ],
    });
  }

  async componentDidMount(): Promise<void> {
    this.fetchData();
  }

  render(): JSX.Element {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="line"
          height={350}
        />
      </div>
    );
  }
}

export default ApexChartPerformance;
