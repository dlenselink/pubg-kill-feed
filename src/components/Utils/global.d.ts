/* * * Types * * */
type Action = {
  type: string;
  payload?: Array<string>;
};

type Dispatch = (action: Action) => void;
type GlobalProviderProps = { children: React.ReactNode };
type State = {
  currentSeason: string,
  isLoading: boolean,
  playerId: string,
  playerName: string,
  playerStats: {
    duo: CalculatedStats,
    duo_fpp: CalculatedStats,
    solo: CalculatedStats,
    solo_fpp: CalculatedStats,
    squad: CalculatedStats,
    squad_fpp: CalculatedStats,
  }
  recentMatches: Array<string>,
};

/* * * Interfaces * * */
declare interface SeasonElement {
  type: string;
  id: string;
  attributes: {
    isCurrentSeason: boolean;
    isOffseason: boolean;
  }
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
  mode: string;
  kdr: string;
  kda: string;
  adr: string;
  win_percentage: string;
  top10_percentage: string;
  longest_kill: string;
  headshot_percentage: string;
  average_weapons: string;
  average_time: string;
  most_kills: string;
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
  duo: CalculatedStats;
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
