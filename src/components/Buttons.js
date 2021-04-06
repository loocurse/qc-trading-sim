import React from "react";

function Buttons({ series, dispatch, cash }) {
  const buyEventHandler = () => {
    // record down buy price
    dispatch({ type: "BUY", buyPrice: series[series.length - 1].y });
  };

  const sellEventHandler = () => {
    // recording down sell price
    dispatch({ type: "SELL", sellPrice: series[series.length - 1].y });
  };

  return (
    <div className="buttons">
      <p>Money: ${Math.round(cash)}</p>
      <button onClick={buyEventHandler}>Buy</button>
      <button onClick={sellEventHandler}>Sell</button>
    </div>
  );
}
export default Buttons;
