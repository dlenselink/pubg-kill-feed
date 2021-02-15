/* * * Types * * */
type Action = {
  type: string;
  payload?: State;
};

type Dispatch = (action: Action) => void;
type GlobalProviderProps = { children: React.ReactNode };
type State = {
  currentSeason?: string,
  isLoading: boolean,
  playerId?: string,
  playerName?: string,
  playerStats?: SeasonStatsCalculated,
  recentMatches?: Array<string>,
};

/* * * Interfaces * * */
declare interface SeasonElement {
  attributes: {
    isCurrentSeason: boolean;
    isOffseason: boolean;
  }
  id: string;
  type: string;
}

declare interface RawMatch {
  DBNOs: number,
  assists: number,
  boosts: number,
  damageDealt: number,
  deathType: string,
  headshotKills: number,
  heals: number,
  killPlace: number,
  killStreaks: number,
  kills: number,
  longestKill: number,
  name: string,
  playerId: string,
  revives: number,
  rideDistance: number,
  roadKills: number,
  swimDistance: number,
  teamKills: number,
  timeSurvived: number,
  vehicleDestroys: number,
  walkDistance: number,
  weaponsAcquired: number,
  winPlace: number,
}

declare interface RawStats {
  assists: number;
  boosts: number;
  dBNOs: number;
  dailyKills: number;
  dailyWins: number;
  damageDealt: number;
  days: number;
  headshotKills: number;
  heals: number;
  killPoints: number;
  kills: number;
  longestKill: number;
  longestTimeSurvived: number;
  losses: number;
  maxKillStreaks: number;
  mostSurvivalTime: number;
  rankPoints: number;
  rankPointsTitle: number;
  revives: number;
  rideDistance: number;
  roadKills: number;
  roundMostKills: number;
  roundsPlayed: number;
  suicides: number;
  swimDistance: number;
  teamKills: number;
  timeSurvived: number;
  top10s: number;
  vehicleDestroys: number;
  walkDistance: number;
  weaponsAcquired: number;
  weeklyKills: number;
  weeklyWins: number;
  winPoints: number;
  wins: number;
}

declare interface CalculatedStats {
  adr: number;
  average_time: number;
  average_weapons: number;
  headshot_percentage: number;
  kda: number;
  kdr: number;
  longest_kill: number;
  mode: string;
  most_kills: number;
  top10_percentage: number;
  win_percentage: number;
}

declare interface SeasonStatsRaw {
  "duo": RawStats;
  "duo-fpp": RawStats;
  "solo": RawStats;
  "solo-fpp": RawStats;
  "squad": RawStats;
  "squad-fpp": RawStats;
}

declare interface SeasonStatsCalculated {
  [duo: string]: CalculatedStats;
  duo_fpp: CalculatedStats;
  solo: CalculatedStats;
  solo_fpp: CalculatedStats;
  squad: CalculatedStats;
  squad_fpp: CalculatedStats;
}

declare interface PlayerInfo {
  playerId: string;
  playerName: string;
  recentMatches: Array<string>;
}
