import { PlayerInfo } from "../App";
export { Header } from "./component";
export interface IProps {
  isLoading: boolean;
  playerInfo: PlayerInfo;
  updatePlayerInfo: (playerInfo: any) => void;
};