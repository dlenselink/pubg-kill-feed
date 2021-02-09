export interface SeasonElement {
  type: string;
  id: string;
  attributes: {
    isCurrentSeason: boolean;
    isOffseason: boolean;
  }
}

export interface PlayerInfo {
  playerId: string;
  playerName: string;
  recentMatches: Array<string>;
}
