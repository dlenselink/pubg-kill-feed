import React, { createContext, useContext, useEffect, useReducer } from "react";
import { actionTypes } from "Utils/types";

interface Action {
  type: string;
  payload?: Array<string> | object | string;
}

type Dispatch = (action: Action) => void;

type GlobalProviderProps = {
  children: React.ReactNode
};

type State = {
  isLoading: boolean,
  playerName: string,
};

const initialState: State = {
  isLoading: false,
  playerName: "",
};

const GlobalStateContext = createContext<State | undefined>(undefined)
const GlobalDispatchContext = createContext<Dispatch | undefined>(undefined);

const globalReducer = (state: State, action: Action) => {
  switch(action.type) {
    case actionTypes.resetLoader: {
      const resetLoader: State = {
        ...state,
        isLoading: false,
      };
      return resetLoader;
    }
    case actionTypes.showLoader: {
      const showLoader: State = {
        ...state,
        isLoading: true,
      };
      return showLoader;
    }
    default:
      throw new Error("Invalid action type (StateProvider)");
  }
};

const GlobalStateProvider = ({ children, }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    if (state.isLoading) {
      dispatch({ type: actionTypes.showLoader });
      const delay = 2000;
      setTimeout(() => {
        dispatch({ type: actionTypes.resetLoader });
      }, delay);
    }
  },
  [state.isLoading]);
  
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const state = useContext(GlobalStateContext);
  if (state === undefined) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return state;
};

const useGlobalDispatch = () => {
  const dispatch = useContext(GlobalDispatchContext);
  if (dispatch === undefined) {
    throw new Error('useGlobalDispatch must be used within a GlobalStateProvider');
  }
  return dispatch;
};

export { useGlobalState, useGlobalDispatch, GlobalStateProvider };
