declare type RecentMatches = Array<{ type: string, id: string }>;

declare type SeasonList = Array<{
  attributes: {
    isCurrentSeason: boolean,
    isOffseason: boolean,
  },
  id: string,
  type: string,
}>

declare interface PlayerInfo {
  playerName: string;
  playerId: string;
  recentMatches?: RecentMatches;
}