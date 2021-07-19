function Journal(): JSX.Element {
  return (
    <div>
      <h2 className="text-2xl font-bold mt-10">Journal</h2>
      <table className="table-auto w-full table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Date</th>
            <th>Ticker</th>
            <th>Remarks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>19/6/20</td>
            <td>AAPL</td>
            <td>Buy Price: $136.21</td>
          </tr>
          <tr>
            <td>2</td>
            <td>26/6/21</td>
            <td>MSFT</td>
            <td>Buy Price: $136.21</td>
          </tr>
          <tr>
            <td>3</td>
            <td>27/6/20</td>
            <td>BABA</td>
            <td>Buy Price: $112.21</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Journal;
