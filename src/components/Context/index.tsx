import React, { createContext, useContext, useReducer } from "react";

type Action = {
  type: string;
  payload?: Array<string>;
};

type Dispatch = (action: Action) => void;
type GlobalProviderProps = { children: React.ReactNode };
type State = {
  currentSeason: string,
  isLoading: boolean,
  playerId: string,
  playerName: string,
  recentMatches: Array<string>,
};

const initialState = {
  currentSeason: "",
  isLoading: false,
  playerId: "",
  playerName: "",
  recentMatches: [],
}

const GlobalStateContext = createContext<State | undefined>(undefined)
const GlobalDispatchContext = createContext<Dispatch | undefined>(undefined);

const globalReducer = (state: State, action: Action) => {
  switch(action.type) {
  case "SHOW_LOADER": {
    const showLoader: State = {
      ...state,
      isLoading: true,
    };
    return showLoader;
  }
  case "RESET_LOADER": {
    const resetLoader: State = {
      ...state,
      isLoading: false,
    };
    return resetLoader;
  }
  default:
    throw new Error("Invalid action type (StateProvider)");
  }
};

const GlobalStateProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);
  
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const state = useContext(GlobalStateContext)
  if (state === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return state;
};

const useGlobalDispatch = () => {
  const dispatch = useContext(GlobalDispatchContext)
  if (dispatch === undefined) {
    throw new Error('useGlobalDispatch must be used within a GlobalStateProvider');
  }
  return dispatch;
};

export { useGlobalState, useGlobalDispatch, GlobalStateProvider };
