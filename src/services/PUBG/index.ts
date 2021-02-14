import { findIndex, get } from "lodash";

class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

const token = process.env.PUBG_API_KEY;

const roundToTwo = (initial: number) => {
  return Math.round((initial + Number.EPSILON) * 100) / 100;
};

export const handleError = (error: Error) => {
  if (error instanceof APIError) {
    console.error(`${error.name}: ${error.message}\n\n${error.stack}`);
  } else {
    console.error(`Unknown error occurred: ${error}`);
  }
};

export const getPlayerInfo = (playerName: string) => {
  const url = "https://api.pubg.com/shards/steam/players?filter[playerNames]=" + playerName;
  const headers = {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer " + token,
  };

  const result = fetch(url, {
    method: "GET",
    headers: headers,
  })
  .then(res => {
    if (res.status === 200) {
      return res.json();
    } else if (res.status === 404) {
      throw new APIError(`No player info found for user ${playerName}`);
    }
    
    throw new APIError("API Error in getPlayerInfo fetch");
  })
  .then(json => {
    const recentMatches: Array<{ type: string, id: string }> = get(json, "data[0].relationships.matches.data");
    const playerId = get(json, "data[0].id");
    let matchIds: Array<string> = [];
    let player: PlayerInfo = {
      playerName: "",
      playerId: "",
      recentMatches: [],
    };

    if (playerId && recentMatches) {
      recentMatches.forEach((match, index) => matchIds[index] = match.id);
      player.playerId = playerId;
      player.playerName = playerName;
      player.recentMatches = matchIds;
    }

    return player;
  });

  return result;
};

export const getSeasonList = () => {
  const url = "https://api.pubg.com/shards/steam/seasons";
  const headers = {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer " + token,
  };

  const result = fetch(url, { method: "GET", headers: headers })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }

      throw new APIError("API Error in getSeasonsList fetch");
    })
    .catch(err => handleError(err));

  return result;
};

export const getSeasonId = () => {
  const result = getSeasonList()
    .then(res => {
      const currentIndex = findIndex(res.data, (el: SeasonElement) => el.attributes.isCurrentSeason);
      return res.data[currentIndex].id;
    })
    .catch(err => handleError(err));

  return result;
};

export const getSeasonStats = (accountId: string, season: string) => {
  const url = "https://api.pubg.com/shards/steam/players/" + accountId + "/seasons/" + season;
  const headers = {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer " + token,
  };

  const result = fetch(url, { method: "GET", headers: headers })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }

      throw new APIError("API Error in getSeasonsStats fetch");
    })
    .then(json => {
      let stats: Array<CalculatedStats> = [];
      const allStats: SeasonStatsRaw = json.data.attributes.gameModeStats;
      const modes = [
        "duo",
        "duo-fpp",
        "solo",
        "solo-fpp",
        "squad",
        "squad-fpp",
      ] as const;

      for (const mode of modes) {
        if (allStats[mode].roundsPlayed) {
          const s = allStats[mode];
          stats.push({
            mode: mode.replace(/-/g, '_'),
            kdr: roundToTwo(s.kills / s.losses),
            kda: roundToTwo((s.kills + s.assists) / s.losses),
            adr: roundToTwo(s.damageDealt / s.roundsPlayed),
            win_percentage: roundToTwo((s.wins / s.roundsPlayed) * 100), // %
            top10_percentage: roundToTwo((s.top10s / s.roundsPlayed) * 100), // %
            longest_kill: roundToTwo(s.longestKill), // meters
            headshot_percentage: roundToTwo((s.headshotKills / s.kills) * 100), // %
            average_weapons: roundToTwo(s.weaponsAcquired / s.roundsPlayed),
            average_time: Math.round((s.timeSurvived / s.roundsPlayed) / 60), // minutes
            most_kills: s.roundMostKills,
          });
        }
      }

      return stats;
    });
  
  return result;
};
