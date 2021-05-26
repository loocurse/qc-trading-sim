import React from "react";

function FundamentalInfo() {
  return (
    <div className="flex flex-row fundamental_table my-4 justify-center ml-10">
      <table className="border-right-table">
        <tr>
          <td>Open</td>
          <td>200.3</td>
        </tr>
        <tr>
          <td>High</td>
          <td>274.2</td>
        </tr>
        <tr>
          <td>Low</td>
          <td>198.2</td>
        </tr>
      </table>
      <table className="border-right-table">
        <tr>
          <td>Volume</td>
          <td>14.01M</td>
        </tr>
        <tr>
          <td>P/E</td>
          <td>105.2</td>
        </tr>
        <tr>
          <td>Market Cap</td>
          <td>574.8.6B</td>
        </tr>
      </table>
      <table>
        <tr>
          <td>52W H</td>
          <td>429.2</td>
        </tr>
        <tr>
          <td>52W L</td>
          <td>160.2</td>
        </tr>
        <tr>
          <td>Avg Volume</td>
          <td>16.88M</td>
        </tr>
      </table>
    </div>
  );
}

export default FundamentalInfo;
