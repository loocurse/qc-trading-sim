export type transactionObject = {
  date: Date;
  price: number;
  position?: number;
}

export type annotation = {
  y: number;
  borderColor: string;
  label: {
    borderColor: string;
    style: {
      color: string;
      background: string;
    }
    text: string;
  }
}[]


export type State = {
  ticker: string;
  cash: number;
  position: number;
  algoPosition: number;
  transactions: {
    buy: transactionObject[];
    sell: transactionObject[];
  };
  algoTransactions: {
    buy: transactionObject[];
    sell: transactionObject[];
  };
  annotation: annotation;
  status: "WAITING" | "STARTED" | "ENDED";
  modalOpen: boolean;
}

const initialState: State = {
  ticker: "NYSE: BABA",
  cash: 1000,
  position: 100,
  algoPosition: 1000,
  transactions: {
    buy: [], // {date, price, position}
    sell: [],
  },
  algoTransactions: {
    buy: [],
    sell: [],
  },
  annotation: [],
  status: "WAITING", // WAITING, STARTED, ENDED
  modalOpen: false,
};

export enum ActionTypes {
  buy = "BUY",
  sell = "SELL",
  algoBuy = "ALGO BUY",
  algoSell = "ALGO SELL",
  increasePosition = "INCREASE POSITION",
  decreasePosition = "DECREASE POSITION",
  start = "START",
  setPosition = "SET POSITION",
  end = "END",
  hideResultModal = "HIDE RESULT MODAL",
  showResultModal = "SHOW RESULT MODAL",
  changeTicker = "CHANGE TICKER"
}

export type Action = {
  type: ActionTypes;
  buy?: transactionObject;
  sell?: transactionObject;
  position?: number;
  ticker?: string;
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
  case ActionTypes.buy: {
    if (!action.buy || !action.buy.position){
      throw Error("Payload incorrect");
    }
    const transactions = {
      ...state.transactions,
      buy: [...state.transactions.buy, action.buy],
    };
    const annotation = [
      {
        y: action.buy.price,
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
    ];
    const cash = state.cash - action.buy.position;
    return {
      ...state,
      cash,
      transactions,
      annotation,
    };
  }

  case ActionTypes.sell: {
    if (!action.sell || !action.sell.position) {
      throw Error("Payload incorrect");
    }
    const transactions = {
      ...state.transactions,
      sell: [...state.transactions.sell, action.sell],
    };
    const cash =
        state.cash +
        action.sell.position *
          (action.sell.price /
            transactions.buy[transactions.buy.length - 1].price);
    return {
      ...state,
      transactions,
      annotation: [],
      cash,
    };

  }

  case ActionTypes.algoBuy: {
    if (!action.buy) {
      throw Error("Payload incorrect");
    }
    const algoTransactions = {
      ...state.algoTransactions,
      buy: [
        ...state.algoTransactions.buy,
        { ...action.buy, position: state.algoPosition },
      ],
    };
    return {
      ...state,
      algoTransactions,
    };
  }

  case ActionTypes.algoSell: {
    if (!action.sell) {
      throw Error("Payload incorrect");
    }
    const algoTransactions = {
      ...state.algoTransactions,
      sell: [
        ...state.algoTransactions.sell,
        { ...action.sell, position: state.algoPosition },
      ],
    };
    const algoPosition =
        state.algoPosition *
        (action.sell.price /
          algoTransactions.buy[algoTransactions.buy.length - 1].price);
    return {
      ...state,
      algoPosition,
      algoTransactions,
    };
  }

  case ActionTypes.increasePosition:
    if (state.position + 20 >= state.cash) {
      return {
        ...state,
        position: state.cash,
      };
    }
    return {
      ...state,
      position: state.position + 20,
    };
  case ActionTypes.decreasePosition:
    if (state.position - 20 <= 0) {
      return {
        ...state,
        position: 0,
      };
    }
    return {
      ...state,
      position: state.position - 20,
    };

  case ActionTypes.setPosition: {
    if (!action.position) {
      throw Error("Payload incorrect");
    }
    if (0 <= action.position && action.position <= state.cash) {
      return {
        ...state,
        position: action.position,
      };
    }
    return state;
  }

  case ActionTypes.start: {
    return {
      ...state,
      status: "STARTED",
    };
  }

  case ActionTypes.end: {
    return {
      ...state,
      status: "ENDED",
      modalOpen: true,
    };
  }

  case ActionTypes.hideResultModal: {
    return {
      ...state,
      modalOpen: false,
    };
  }

  case ActionTypes.showResultModal: {
    return {
      ...state,
      modalOpen: true,
    };
  }
  case ActionTypes.changeTicker: {
    if (!action.ticker) {
      throw Error("Payload incorrect");
    }
    return {
      ...state,
      ticker: action.ticker,
    };
  }
  default:
    return state;
  }
};

export { reducer, initialState };
