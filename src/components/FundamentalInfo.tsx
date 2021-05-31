import React from "react";
import BABA_DATA from "../api/BABA.json";

function FundamentalInfo(): JSX.Element {
  const { fundamental } = BABA_DATA;

  return (
    <div className="flex flex-row fundamental_table my-4 justify-center ml-10">
      <table className="border-right-table">
        <tbody>
          <tr>
            <td>Open</td>
            <td>{fundamental.open}</td>
          </tr>
          <tr>
            <td>High</td>
            <td>{fundamental.high}</td>
          </tr>
          <tr>
            <td>Low</td>
            <td>{fundamental.low}</td>
          </tr>
        </tbody>
      </table>
      <table className="border-right-table">
        <tbody>
          <tr>
            <td>Volume</td>
            <td>{fundamental.volume}M</td>
          </tr>
          <tr>
            <td>P/E</td>
            <td>{fundamental.PE}</td>
          </tr>
          <tr>
            <td>Market Cap</td>
            <td>{fundamental.marketcap}B</td>
          </tr>
        </tbody>
      </table>
      <table>
        <tbody>
          <tr>
            <td>52W H</td>
            <td>{fundamental.yearhigh}</td>
          </tr>
          <tr>
            <td>52W L</td>
            <td>{fundamental.yearlow}</td>
          </tr>
          <tr>
            <td>Avg Volume</td>
            <td>{fundamental.averagevol}M</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default FundamentalInfo;
