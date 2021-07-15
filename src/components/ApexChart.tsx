import React from "react";
import ReactApexChart from "react-apexcharts";
import { getTickerPriceData } from "../api";



class ApexChart extends React.Component<{ticker: string}, any> {
  constructor(props: {ticker: string}) {
    super(props);

    this.state = {
      series: [{
        data: [],
      }],
      options: {

        chart: {
          type: "candlestick",
          height: 350,
          toolbar: {
            show: false
          }
        },
        xaxis: {
          type: "datetime"
        },
        yaxis: {
          labels: {
            formatter: function(value: number) {
              return "$" + value.toFixed(2);
            }
          },
          tooltip: {
            enabled: true,
          }
        }
      },
    };
    this.fetchData = this.fetchData.bind(this);
  }

  async fetchData(): Promise<void> {
    const res = await getTickerPriceData(this.props.ticker);
    const newarray = res.map(result => {
      return { "x": new Date(result.t), "y": [result.o, result.h, result.l, result.c] };
    });

    this.setState({
      ...this.state,
      series:[{ data: newarray }]
    });
  }

  async componentDidMount(): Promise<void> {
    await this.fetchData();
  }
  async componentDidUpdate(): Promise<void> {
    await this.fetchData();
  }

  render(): JSX.Element {
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height={350} />
      </div>
    );
  }
}

export default ApexChart;
