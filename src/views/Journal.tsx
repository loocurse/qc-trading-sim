import OpenTable from "../components/OpenTable";
import CloseTable from "../components/CloseTable";
import { useReducer } from "react";
import JournalModal from "../components/JournalModal";
import ClosePositionModal from "../components/ClosePositionModal";
import {
  journalReducer as reducer,
  initialState,
} from "../utils/journalReducer";

function Journal(): JSX.Element {
  const [
    {
      openPosition,
      closedPosition,
      addPositionModal,
      closePositionModal,
      currentTicker,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <div>
      {closePositionModal && (
        <ClosePositionModal currentTicker={currentTicker} dispatch={dispatch} />
      )}

      {addPositionModal && <JournalModal dispatch={dispatch} />}

      <OpenTable openPosition={openPosition} dispatch={dispatch} />
      <h2 className="text-2xl font-bold my-3">Closed positions</h2>
      <CloseTable closedPosition={closedPosition} dispatch={dispatch} />
    </div>
  );
}

export default Journal;
