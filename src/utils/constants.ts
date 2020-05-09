export const Actions = {
  updatePlayer: "UPDATE_PLAYER",
  resetLoader: "RESET_LOADER",
  showLoader: "SHOW_LOADER",
};

export const initialState: State = {
  isLoading: false,
  playerName: "",
};

export const Timings = {
  loadingAnimation: 2000,
};