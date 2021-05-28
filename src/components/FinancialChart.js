import React from "react";
import { Chart, ChartCanvas } from "@react-financial-charts/core";
import { XAxis, YAxis } from "@react-financial-charts/axes";
import { discontinuousTimeScaleProviderBuilder } from "@react-financial-charts/scales";
import { LineSeries } from "@react-financial-charts/series";
import {
  Annotate,
  LabelAnnotation,
  SvgPathAnnotation,
} from "@react-financial-charts/annotations";
import {
  CurrentCoordinate,
  MouseCoordinateY,
  EdgeIndicator,
  PriceCoordinate,
  MouseCoordinateX,
  CrossHairCursor,
} from "@react-financial-charts/coordinates";
import { parseDate } from "../utils";
import BABA_DATA from "../mockdata/BABA.json";
import { SingleValueTooltip } from "@react-financial-charts/tooltip";

const { prices } = BABA_DATA;

export const FinancialChart = () => {
  const xScaleProvider =
    discontinuousTimeScaleProviderBuilder().inputDateAccessor((d) =>
      parseDate(d.Date)
    );
  const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(prices);

  const max = xAccessor(data[data.length - 1]);
  const min = xAccessor(data[Math.max(0, data.length - 100)]);
  const xExtents = [min, max];

  const yAccessor = (d) => d.Close;

  const getBuySignal = (d) => d.Indicator === 0;
  const getSellSignal = (d) => d.Indicator === 1;

  return (
    <div className="flex items-center justify-center h-screen">
      <ChartCanvas
        height={500}
        width={800}
        ratio={1}
        data={data}
        margin={{ right: 100, bottom: 50, left: 0, top: 0 }}
        seriesName="data"
        displayXAccessor={displayXAccessor}
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
      >
        <Chart yExtents={(d) => [d.Close]} id={1}>
          <LineSeries yAccessor={yAccessor} />
          <XAxis axisAt="bottom" orient="bottom" />
          <YAxis axisAt="right" orient="right" />
          <CurrentCoordinate yAccessor={yAccessor} />
          {/* <EdgeIndicator
            itemType={"first"}
            yAccessor={yAccessor}
            arrowWidth={6}
            dx={6}
          /> */}
          <EdgeIndicator
            itemType={"last"}
            yAccessor={yAccessor}
            arrowWidth={6}
            dx={6}
          />

          <MouseCoordinateY
            displayFormat={(v) => v.toFixed(2).toString()}
            arrowWidth={6}
            dx={6}
          />
          <MouseCoordinateX displayFormat={(v) => v.toLocaleDateString()} />
          <SingleValueTooltip
            origin={[0, 10]}
            yLabel={"Close:"}
            xLabel={"Date"}
            yAccessor={yAccessor}
            xAccessor={(d) => {
              return d.Date;
            }}
          />

          <Annotate
            with={LabelAnnotation}
            usingProps={{
              text: "Buy",
              tooltip: "Buy",
              y: ({ yScale, datum }) => yScale(datum.Close) - 22,
            }}
            when={getBuySignal}
          />
          <Annotate
            with={SvgPathAnnotation}
            usingProps={{
              fill: "#34D399",
              path: () =>
                "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z",
              pathWidth: 12,
              pathHeight: 22,
              tooltip: "Buy Here",
              y: ({ yScale, datum }) => yScale(datum.Close),
            }}
            when={getBuySignal}
          />
          <Annotate
            with={LabelAnnotation}
            usingProps={{
              text: "Sell",
              tooltip: "Sell",
              y: ({ yScale, datum }) => yScale(datum.Close) - 22,
            }}
            when={getSellSignal}
          />
          <Annotate
            with={SvgPathAnnotation}
            usingProps={{
              fill: "#F87171",
              path: () =>
                "M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z",
              pathWidth: 12,
              pathHeight: 22,
              tooltip: "Sell Here",
              y: ({ yScale, datum }) => yScale(datum.Close),
            }}
            when={getSellSignal}
          />
          <CrossHairCursor />
        </Chart>
      </ChartCanvas>
    </div>
  );
};
