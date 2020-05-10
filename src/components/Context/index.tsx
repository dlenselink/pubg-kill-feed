import React, { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import { Actions, initialState } from "Utils/constants";
// eslint-disable-next-line no-unused-vars
import { Action, Dispatch, GlobalProviderProps, PlayerStats, State } from "Utils/interfaces";

const GlobalStateContext = createContext<State | undefined>(undefined)
const GlobalDispatchContext = createContext<Dispatch | undefined>(undefined);

const globalReducer = (state: State, action: Action) => {
  switch(action.type) {
    case Actions.resetLoader: {
      const resetLoader: State = {
        ...state,
        isLoading: false,
      };
      return resetLoader;
    }

    case Actions.showLoader: {
      const showLoader: State = {
        ...state,
        isLoading: true,
      };
      return showLoader;
    }

    case Actions.updatePlayer: {
      let updatePlayer: State = {...state};
      const playerStats = action.payload;
      if (playerStats) {
        updatePlayer = {
          ...state,
          playerStats: playerStats
        };
      }
      return updatePlayer;
    }
    
    default:
      throw new Error("Invalid action type (StateProvider)");
  }
};

const GlobalStateProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    if (state.isLoading) {
      dispatch({ type: Actions.showLoader });
    }
    if (!state.isLoading) {
      dispatch({ type: Actions.resetLoader });
    }
  },
  [state.isLoading]);

  useMemo(() => {
    console.log(state.playerStats);
    const value = JSON.stringify(state.playerStats);
    localStorage.setItem("PUBG_playerStats", value);
  },
  [state.playerStats]);
  
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
  if (state === undefined) { throw new Error('useGlobalState must be used within a GlobalStateProvider') }
  return state;
};

const useGlobalDispatch = () => {
  const dispatch = useContext(GlobalDispatchContext);
  if (dispatch === undefined) { throw new Error('useGlobalDispatch must be used within a GlobalStateProvider') }
  return dispatch;
};

export { useGlobalState, useGlobalDispatch, GlobalStateProvider };
