import React, { createContext, useContext, useReducer } from "react";

const defaultStats: CalculatedStats = {
  adr: 0,
  average_time: 0,
  average_weapons: 0,
  headshot_percentage: 0,
  kda: 0,
  kdr: 0,
  longest_kill: 0,
  mode: "",
  most_kills: 0,
  top10_percentage: 0,
  win_percentage: 0,
};

export const defaultState: State = {
  currentSeason: "",
  isLoading: false,
  playerId: "",
  playerName: "",
  playerStats: {
    duo: defaultStats,
    duo_fpp: defaultStats,
    solo: defaultStats,
    solo_fpp: defaultStats,
    squad: defaultStats,
    squad_fpp: defaultStats,
  },
  recentMatches: [],
}

const GlobalStateContext = createContext<State | undefined>(undefined)
const GlobalDispatchContext = createContext<Dispatch | undefined>(undefined);

const globalReducer = (state: State, action: Action) => {
  switch(action.type) { // Add specific update types below
    case "UPDATE_STATE": {
      return { ...state };
    }
    default:
      throw new Error("Invalid action type (StateProvider)");
  }
};

export const GlobalStateProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(globalReducer, defaultState);

  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => {
  const state = useContext(GlobalStateContext);
  if (state === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return state;
};

export const useGlobalDispatch = () => {
  const dispatch = useContext(GlobalDispatchContext);
  if (dispatch === undefined) {
    throw new Error('useGlobalDispatch must be used within a GlobalStateProvider');
  }
  return dispatch;
};
