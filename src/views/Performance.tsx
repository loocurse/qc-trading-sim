import { useEffect, useState } from "react";
import InnerTable from "../components/InnerTable";
import ApexChartPerformance from "../components/ApexChartPerformance";
import { heroku } from "../api";
import { PerformanceElement } from "../utils/api.interface";

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
      const res = await heroku.get<PerformanceElement[]>("performance");
      setPerformance(res.data);
    };
    fetchData();
  }, []);

  function toggleDisplay(month: number) {
    setDropdown((prev) => {
      const index = prev.indexOf(month);
      if (index === -1) {
        return [...prev, index];
      } else {
        return prev.splice(index, 1);
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
