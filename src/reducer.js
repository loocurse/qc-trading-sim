const initialState = {
  cash: 1000,
  position: 100,
  transactions: {
    buy: [],
    sell: [],
  },
  annotation: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    // TODO transactions probably should include position and date to facilitate
    // easier logging
    case "BUY": {
      const transactions = {
        ...state.transactions,
        buy: [...state.transactions.buy, action.buyPrice],
      };
      const annotation = [
        {
          y: action.buyPrice,
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
      const cash = state.cash - action.position;
      return {
        ...state,
        cash,
        transactions,
        annotation,
      };
    }

    case "SELL":
      const transactions = {
        ...state.transactions,
        sell: [...state.transactions.sell, action.sellPrice],
      };
      const cash =
        state.cash +
        action.position *
          (action.sellPrice / transactions.buy[transactions.buy.length - 1]);
      return {
        ...state,
        transactions,
        annotation: [],
        cash,
      };

    case "INCREASE POSITION":
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
    case "DECREASE POSITION":
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

    case "SET POSITION": {
      if (0 <= action.position && action.position <= state.cash) {
        return {
          ...state,
          position: action.position,
        };
      }
      return state;
    }

    default:
      return state;
  }
};

export { reducer, initialState };
