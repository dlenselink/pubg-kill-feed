// eslint-disable-next-line no-unused-vars
import { State } from "./interfaces";

export const Actions = {
  resetLoader: "RESET_LOADER",
  showLoader: "SHOW_LOADER",
  updatePlayer: "UPDATE_PLAYER",
};

export const initialState: State = {
  isLoading: false,
  playerName: "",
};

export const Seasons = {
  "division.bro.official.2017-beta": "2017 Open Beta",
  "division.bro.official.2017-pre1": "Early Access 1",
  "division.bro.official.2017-pre2": "Early Access 2",
  "division.bro.official.2017-pre3": "Early Access 3",
  "division.bro.official.2017-pre4": "Early Access 4",
  "division.bro.official.2017-pre5": "Early Access 5",
  "division.bro.official.2017-pre6": "Early Access 6",
  "division.bro.official.2017-pre7": "Early Access 7",
  "division.bro.official.2017-pre8": "Early Access 8",
  "division.bro.official.2017-pre9": "Early Access 9",
  "division.bro.official.2018-01": "2018 Season 1",
  "division.bro.official.2018-02": "2018 Season 2",
  "division.bro.official.2018-03": "2018 Season 3",
  "division.bro.official.2018-04": "2018 Season 4",
  "division.bro.official.2018-05": "2018 Season 5",
  "division.bro.official.2018-06": "2018 Season 3",
  "division.bro.official.2018-07": "2018 Season 7",
  "division.bro.official.2018-08": "2018 Season 8",
  "division.bro.official.2018-09": "2018 Season 9",
  "division.bro.official.pc-2018-01": "Survivor Season 1",
  "division.bro.official.pc-2018-02": "Survivor Season 2",
  "division.bro.official.pc-2018-03": "Survivor Season 3",
  "division.bro.official.pc-2018-04": "Survivor Season 4",
  "division.bro.official.pc-2018-05": "Survivor Season 5",
  "division.bro.official.pc-2018-06": "Survivor Season 6",
  "division.bro.official.pc-2018-07": "Survivor Season 7",
  "division.bro.official.pc-2018-0": "Survivor Season 8",
};