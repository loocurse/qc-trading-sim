import React from "react";
import ReactApexChart from "react-apexcharts";
import { getTickerPriceData } from "../api";



class ApexChart extends React.Component<{ticker: string}, any> {
  constructor(props: {ticker: string}) {
    super(props);

    this.state = {
      loading: false,
      series: [{
        data: [],
      }],
      resolution: "1D",
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
    this.clickHandler = this.clickHandler.bind(this);
  }

  async fetchData(): Promise<void> {
    const res = await getTickerPriceData(this.props.ticker, this.state.resolution);
    const newarray = res.map(result => {
      return { "x": new Date(result.t), "y": [result.o, result.h, result.l, result.c] };
    });

    this.setState({
      ...this.state,
      loading: false,
      series:[{ data: newarray }]
    });
  }

  clickHandler(resolution: string): void {
    this.setState({ ...this.state, resolution: resolution });
  }

  async componentDidMount(): Promise<void> {
    await this.fetchData();
  }
  async componentDidUpdate(): Promise<void> {
    await this.fetchData();
  }

  render(): JSX.Element {
    const resolutionLabels = ["1D","5D","1M","3M","6M","YTD","1Y","5Y","ALL"];
    if (this.state.loading) {
      return (<div>LOADING</div>);
    }
    return (
      <div id="chart">
        <ReactApexChart options={this.state.options} series={this.state.series} type="candlestick" height={350} />
        <div className="rounded-sm bg-primary w-100 inline-block p-2">
          { resolutionLabels.map(item => {
            return <ResolutionButton key={item} title={item} clickHandler={this.clickHandler} active={this.state.resolution===item}/>; 
          })}
        </div>
      </div>
    );
  }
}

export default ApexChart;
type clickHandler = (resolution: string) => void
const ResolutionButton = ({ title, clickHandler, active }: {title: string, clickHandler: clickHandler, active: boolean}): JSX.Element => {
  return(<button className={`mx-2 ${active ? "font-bold" : "text-gray-500"}`} onClick={() => clickHandler(title)}>{title}</button>);
};
