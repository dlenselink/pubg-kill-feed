export interface SeasonElement {
  type: string;
  id: string;
  attributes: {
    isCurrentSeason: boolean;
    isOffseason: boolean;
  }
}

export interface RawStats {
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

export interface CalculatedStats {
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

export interface SeasonStatsRaw {
  "duo": RawStats;
  "duo-fpp": RawStats;
  "solo": RawStats;
  "solo-fpp": RawStats;
  "squad": RawStats;
  "squad-fpp": RawStats;
}

export interface SeasonStatsCalculated {
  duo: CalculatedStats;
  duo_fpp: CalculatedStats;
  solo: CalculatedStats;
  solo_fpp: CalculatedStats;
  squad: CalculatedStats;
  squad_fpp: CalculatedStats;
}

export interface PlayerInfo {
  playerId: string;
  playerName: string;
  recentMatches: Array<string>;
}
