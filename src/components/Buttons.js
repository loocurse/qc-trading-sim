import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import EditableInput from "./EditableInput";

function Buttons({ series, dispatch, cash, transactions, position, status }) {
  const inputRef = useRef(null);

  const buying = transactions.buy.length === transactions.sell.length;
  const buyEventHandler = () => {
    // record down buy price
    status === "STARTED" &&
      dispatch({
        type: "BUY",
        buy: {
          date: series[series.length - 1].x,
          price: series[series.length - 1].y,
          position,
        },
      });
  };

  const sellEventHandler = () => {
    // recording down sell price
    status === "STARTED" &&
      dispatch({
        type: "SELL",
        sell: {
          date: series[series.length - 1].x,
          price: series[series.length - 1].y,
          position,
        },
      });
  };

  const increasePositionHandler = () => {
    buying && dispatch({ type: "INCREASE POSITION" });
  };
  const decreasePositionHandler = () => {
    buying && dispatch({ type: "DECREASE POSITION" });
  };

  return (
    <div className="buttons flex flex-col items-space-around">
      <div className="flex flex-col items-center">
        <p className="uppercase ">Total Capital</p>
        <p className="font-semibold text-4xl mt-1">${Math.round(cash)}</p>
      </div>
      <div className="flex flex-col items-center">
        <p className="uppercase ">Position</p>
        {/* <p className="font-semibold text-4xl mt-1">${Math.round(position)}</p> */}
        <EditableInput
          childRef={inputRef}
          className={buying ? "" : "cursor-not-allowed"}
          buying={buying}
          displayText={
            <p
              className={`font-semibold text-4xl ${
                buying ? "" : "text-gray-400"
              }`}
            >{`$${Math.round(position)}`}</p>
          }
          input={
            <input
              className="flex font-semibold text-4xl text-center w-40 h-10 text-gray-700 focus:outline-none focus:shadow-outline border-blue-300 border-2 rounded"
              ref={inputRef}
              defaultValue={position}
              type="number"
              onBlur={(e) => {
                if (e.target.value.match("^[0-9]+$"))
                  dispatch({
                    type: "SET POSITION",
                    position: Number(e.target.value),
                  });
              }}
              onKeyDown={(e) => {
                if (
                  ["Enter", "Escape", "Tab"].indexOf(e.key) > -1 &&
                  e.target.value.match("^[0-9]+$")
                ) {
                  dispatch({
                    type: "SET POSITION",
                    position: Number(e.target.value),
                  });
                }
              }}
            />
          }
        />
        <div className="plus-minus">
          <FontAwesomeIcon
            onClick={increasePositionHandler}
            icon={faPlusCircle}
            className={`btn ${buying ? "" : "btn-disabled text-gray-400"}`}
          />
          <FontAwesomeIcon
            onClick={decreasePositionHandler}
            icon={faMinusCircle}
            className={`btn ${buying ? "" : "btn-disabled text-gray-400"}`}
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
