import React from "react";
import { RobotIcon, UserIcon } from "./Icons";

const ResultModal = ({ cash, algoPosition, dispatch }) => {
  const userPercent = Math.round(((cash - 1000) / 1000) * 100);
  const algoPercent = Math.round(((algoPosition - 1000) / 1000) * 100);
  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 align-middle max-w-md w-full">
          <div className="bg-white p-6 pb-4">
            <div className="flex items-start">
              <div className="w-full">
                <h3
                  className="text-lg leading-6 text-gray-900 text-center font-bold"
                  id="modal-title"
                >
                  Time's Up!
                </h3>
                <div className="text-center mt-8">
                  <p className="font-bold text-4xl text-gray-500">You Lost</p>
                </div>
                <p className="text-center font-semibold text-gray-700 mt-16">
                  Total P&L
                </p>
                <div className="mt-4">
                  <div className="flex justify-between items-center -mr-4">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-gray-200 flex">
                          <RobotIcon className="h-4 w-4 text-gray-700" />
                        </div>
                        <span className="ml-3">Algorithm</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-xl ">
                        {algoPosition.toFixed(2)}
                      </span>
                      <span
                        className={`ml-1 text-xs inline-block ${
                          algoPercent >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                        style={{ width: "8ch" }}
                      >
                        (
                        {algoPercent >= 0
                          ? `+${algoPercent}%`
                          : `${algoPercent}%`}
                        )
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4 -mx-4 pl-4 bg-gray-100 py-2 rounded">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <div className="p-2 rounded-full bg-gray-200 flex">
                          <UserIcon className="w-4 h-4 text-gray-700" />
                        </div>
                        <span className="ml-3 font-semibold">You</span>
                      </div>
                    </div>
                    <div>
                      <span className="text-xl ">{cash.toFixed(2)}</span>
                      <span
                        className={`ml-1 text-xs inline-block ${
                          userPercent >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                        style={{ width: "8ch" }}
                      >
                        (
                        {userPercent >= 0
                          ? `+${userPercent}%`
                          : `-${userPercent}%`}
                        )
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {/* <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Restart
            </button> */}
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => dispatch({ type: "HIDE RESULT MODAL" })}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
