import React from "react";

function Recommendation(): JSX.Element {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-10">Recommendations</h2>
      <table className="table table-fixed w-full">
        <thead>
          <tr>
            <th className="w-1/6 content-center">Date</th>
            <th className="w-1/6">Ticker</th>
            <th className="w-1/6">Entry Price</th>
            <th className="w-1/6">Stop Loss</th>
            <th className="w-1/6">Target Price</th>
            <th className="w-1/6">Profit</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="content-center">25/6/20</td>
            <td className="font-bold">BABA</td>
            <td>$220.23</td>
            <td>$210.34</td>
            <td>$242.30</td>
            <td>5.24%</td>
          </tr>
          <tr>
            <td className="content-center">25/6/20</td>
            <td className="font-bold">BABA</td>
            <td>$220.23</td>
            <td>$210.34</td>
            <td>$242.30</td>
            <td>5.24%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Recommendation;
