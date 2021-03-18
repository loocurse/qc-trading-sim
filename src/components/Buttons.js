import { useState } from "react";

function Buttons({ setAnnotation, setCash, cash, price, series }) {
  const [value, setValue] = useState({ buy: [], sell: [] });
  const buyEventHandler = () => {
    // record down buy price
    const new_value = [...value.buy, series[series.length - 1].y];
    setValue({ ...value, buy: new_value });
    // change graph color, or show some sort of status of purchase
    setAnnotation([
      {
        y: series[series.length - 1].y,
        borderColor: "#006400",
        label: {
          borderColor: "#006400",
          style: {
            color: "#fff",
            background: "#006400",
          },
          text: "Buy Price",
        },
      },
    ]);
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
    setAnnotation([]);
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
