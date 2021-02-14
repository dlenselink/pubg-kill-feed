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
  kdr: number;
  kda: number;
  adr: number;
  win_percentage: number;
  top10_percentage: number;
  longest_kill: number;
  headshot_percentage: number;
  average_weapons: number;
  average_time: number;
  most_kills: number;
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
  [solo: string]: CalculatedStats;
  solo_fpp: CalculatedStats;
  duo: CalculatedStats;
  duo_fpp: CalculatedStats;
  squad: CalculatedStats;
  squad_fpp: CalculatedStats;
}

declare interface PlayerInfo {
  playerId: string;
  playerName: string;
  recentMatches: Array<string>;
}
