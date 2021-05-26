import React from "react";

const NavigationBar = ({ buttonCallback, updating, status }) => {
  return (
    <nav>
      <div className="flex flex-1"></div>
      <h1 className="font-bold text-3xl">Trading portal</h1>
      <div className="flex flex-1 justify-end items-center">
        <button
          onClick={buttonCallback}
          className="bg-gray-100 px-6 py-1 rounded-full ml-8"
        >
          {status === "WAITING"
            ? "Start"
            : status === "ENDED"
            ? "Show Results"
            : updating
            ? "Pause"
            : "Resume"}
        </button>
      </div>
    </nav>
  );
};

export default NavigationBar;
