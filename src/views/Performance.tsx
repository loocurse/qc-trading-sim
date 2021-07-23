import { useEffect, useState } from "react";
import InnerTable from "../components/performance/InnerTable";
import ApexChartPerformance from "../components/performance/ApexChartPerformance";
import { heroku } from "../api";
import {
  PerformanceElement,
  Performance as PerformanceGet,
} from "../utils/api.interface";

function Performance(): JSX.Element {
  const [dropdown, setDropdown] = useState<number[]>([]);
  const [performance, setPerformance] = useState<PerformanceElement[]>();
  const outerTableCols = [
    "Month",
    "Positions Closed",
    "Realised PnL (%)",
    "Actions",
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await heroku.get<PerformanceGet>("performance");
      setPerformance(res.data.performance);
    };
    fetchData();
  }, []);

  function toggleDisplay(month: number) {
    setDropdown((prev) => {
      const index = prev.indexOf(month);
      if (index === -1) {
        return [...prev, month];
      } else {
        return prev.filter((item) => {
          return item !== month;
        });
      }
    });
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
            performance.map((data, index) => {
              return (
                <>
                  <tr key={index}>
                    <td>
                      {new Date(data.month * 1000).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td>{data.positions.length}</td>
                    <td>{data.realized_pnl.toFixed(2)}</td>
                    <td
                      onClick={() => toggleDisplay(data.month)}
                      className="hover:underline cursor-pointer">
                      {dropdown.includes(data.month)
                        ? "Less Details"
                        : "More Details"}
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
