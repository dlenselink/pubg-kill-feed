export interface SeasonElement {
  type: string;
  id: string;
  attributes: {
    isCurrentSeason: boolean;
    isOffseason: boolean;
  }
}

export interface SeasonStatsRaw {
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

export interface SeasonStatsCalculated {
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

export interface SeasonStatsModes {
  "duo": SeasonStatsRaw;
  "duo-fpp": SeasonStatsRaw;
  "solo": SeasonStatsRaw;
  "solo-fpp": SeasonStatsRaw;
  "squad": SeasonStatsRaw;
  "squad-fpp": SeasonStatsRaw;
}

export interface PlayerInfo {
  playerId: string;
  playerName: string;
  recentMatches: Array<string>;
}
