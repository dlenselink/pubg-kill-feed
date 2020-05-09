interface Action {
  type: string;
  payload?: Array<string> | object | string;
}

declare type GlobalProviderProps = {
  children: React.ReactNode
};

declare type Dispatch = (action: Action) => void;

declare type State = {
  isLoading: boolean,
  playerName: string,
};
