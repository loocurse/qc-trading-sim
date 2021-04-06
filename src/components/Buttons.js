import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

function Buttons({ series, dispatch, cash, transactions, position }) {
  const buyEventHandler = () => {
    // record down buy price
    dispatch({
      type: "BUY",
      buyPrice: series[series.length - 1].y,
      position: position,
    });
  };

  const sellEventHandler = () => {
    // recording down sell price
    dispatch({
      type: "SELL",
      sellPrice: series[series.length - 1].y,
      position: position,
    });
  };

  const increasePositionHandler = () => {
    dispatch({ type: "INCREASE POSITION" });
  };
  const decreasePositionHandler = () => {
    dispatch({ type: "DECREASE POSITION" });
  };

  const buying = transactions.buy.length === transactions.sell.length;

  return (
    <div className="buttons flex flex-col items-space-around">
      <div className="flex flex-col items-center">
        <p className="uppercase ">Total Capital</p>
        <p className="font-semibold text-4xl mt-1">${Math.round(cash)}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="uppercase ">Position</p>
        <p className="font-semibold text-4xl mt-1">${Math.round(position)}</p>
        <div className="plus-minus">
          <FontAwesomeIcon
            onClick={increasePositionHandler}
            icon={faPlusCircle}
            className="btn"
          />
          <FontAwesomeIcon
            onClick={decreasePositionHandler}
            icon={faMinusCircle}
            className="btn"
          />
        </div>
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
