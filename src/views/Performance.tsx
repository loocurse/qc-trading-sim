import { useEffect, useState } from "react";
import InnerTable from "../components/InnerTable";
import ApexChartPerformance from "../components/ApexChartPerformance";
import { instance } from "../api";

interface performance {
  month: string;
  realized_pnl: number;
  positions: {
    ticker: string;
    buy: number;
    sell: number;
    pnl: number;
    notes: string;
  }[];
}

function Performance(): JSX.Element {
  const [dropdown, setDropdown] = useState<string[]>([]);
  const [performance, setPerformance] = useState<performance[]>();
  const outerTableCols = [
    "Month",
    "Positions Closed",
    "Realised PnL (%)",
    "Actions",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await instance.get("performance");
      setPerformance(res.data);
    };
    fetchData();
  }, []);

  function toggleDisplay(month: string) {
    const array = dropdown.slice();
    const index = array.indexOf(month);
    if (index === -1) {
      array.push(month);
    } else {
      array.splice(index, 1);
    }
    setDropdown(array);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold my-5">Performance Overview</h1>
      <ApexChartPerformance />

      <table className="performance table-fixed w-full my-5">
        <thead>
          <tr>
            {outerTableCols.map((colname) => {
              return (
                <th key={colname} className="">
                  {colname}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {performance &&
            performance.map((data) => {
              return (
                <>
                  <tr key={data.month}>
                    <td>{data.month}</td>
                    <td>{data.positions.length}</td>
                    <td>{data.realized_pnl}</td>
                    <td
                      onClick={() => toggleDisplay(data.month)}
                      className="hover:underline cursor-pointer">
                      More Details
                    </td>
                  </tr>
                  {dropdown.includes(data.month) && (
                    <tr>
                      <td colSpan={4} className="content-center bg-white">
                        <InnerTable positions={data.positions} />
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default Performance;
