import { useState } from "react";

function Buttons({ setCash, cash, price, series }) {
  const [value, setValue] = useState({ buy: [], sell: [] });
  const buyEventHandler = () => {
    // record down buy price
    const new_value = [...value.buy, series[series.length - 1].y];
    setValue({ ...value, buy: new_value });
    // change graph color, or show some sort of status of purchase
  };

  const updateCash = () => {
    const buy = value.buy[value.buy.length - 1];
    const sell = series[series.length - 1].y;
    setCash(cash * (sell / buy));
  };

  const sellEventHandler = () => {
    // recording down sell price
    const new_value = [...value.sell, series[series.length - 1].y];
    setValue({ ...value, sell: new_value });
    // show status of sell
    updateCash(); // change money value
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
