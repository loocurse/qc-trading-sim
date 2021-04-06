import React from "react";

function Buttons({ series, dispatch, cash, transactions }) {
  const buyEventHandler = () => {
    // record down buy price
    dispatch({ type: "BUY", buyPrice: series[series.length - 1].y });
  };

  const sellEventHandler = () => {
    // recording down sell price
    dispatch({ type: "SELL", sellPrice: series[series.length - 1].y });
  };

  const buying = transactions.buy.length === transactions.sell.length;

  return (
    <div className="buttons">
      <div className="flex flex-col items-center">
        <span className="uppercase ">Amount</span>
        <span className="font-semibold text-4xl mt-2">${Math.round(cash)}</span>
      </div>
      <button
        onClick={buying ? buyEventHandler : sellEventHandler}
        className={`rounded-lg text-white uppercase font-semibold py-2 ${
          buying ? "bg-green-400" : "bg-red-400"
        }`}
      >
        {buying ? "Buy" : "Sell"}
      </button>
    </div>
  );
}
export default Buttons;
