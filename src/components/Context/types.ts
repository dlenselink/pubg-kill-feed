interface Action {
  type: string;
  payload?: PlayerStats;
}

interface Dispatch {
  (action: Action): void;
}

interface GlobalProviderProps {
  children: React.ReactNode;
}

interface Match {
  type: string;
  id: string;
}

interface ModeStats {
  assists: number,
  boosts: number,
  dBNOs: number,
  dailyKills: number,
  dailyWins: number,
  damageDealt: number,
  days: number,
  headshotKills: number,
  heals: number,
  killPoints: number,
  kills: number,
  longestKill: number,
  longestTimeSurvived: number,
  losses: number,
  maxKillStreaks: number,
  mostSurvivalTime: number,
  rankPoints: number,
  rankPointsTitle: string,
  revives: number,
  rideDistance: number,
  roadKills: number,
  roundMostKills: number,
  roundsPlayed: number,
  suicides: number,
  swimDistance: number,
  teamKills: number,
  timeSurvived: number,
  top10s: number,
  vehicleDestroys: number,
  walkDistance: number,
  weaponsAcquired: number,
  weeklyKills: number,
  weeklyWins: number,
  winPoints: number,
  wins: number,
}

interface PlayerStats {
  data: {
    attributes: {
      bestRankPoint: number,
      gameModeStats: {
        duo: ModeStats,
        "duo-fpp": ModeStats,
        solo: ModeStats,
        "solo-fpp": ModeStats,
        squad: ModeStats,
        "squad-fpp": ModeStats,
      }
    },
    relationships: {
      matchesDuo: {
        data: Match[]
      },
      matchesDuoFPP: {
        data: Match[]
      },
      matchesSolo: {
        data: Match[]
      },
      matchesSoloFPP: {
        data: Match[]
      },
      matchesSquad: {
        data: Match[]
      },
      matchesSquadFPP: {
        data: Match[]
      },
    },
    type: string,
  };
}

interface State {
  isLoading: boolean;
  playerName: string;
  playerStats: PlayerStats;
}

