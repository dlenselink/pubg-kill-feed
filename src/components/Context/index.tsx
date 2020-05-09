import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Actions, initialState, Timings } from "Utils/constants";

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
          isLoading: true,
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
      setTimeout(() => {
        dispatch({ type: Actions.resetLoader });
      }, Timings.loadingAnimation);
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
  if (state === undefined) { throw new Error('useGlobalState must be used within a GlobalStateProvider') }
  return state;
};

const useGlobalDispatch = () => {
  const dispatch = useContext(GlobalDispatchContext);
  if (dispatch === undefined) { throw new Error('useGlobalDispatch must be used within a GlobalStateProvider') }
  return dispatch;
};

export { useGlobalState, useGlobalDispatch, GlobalStateProvider };
