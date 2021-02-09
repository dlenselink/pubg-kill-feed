import { findIndex, get } from "lodash";
import { PlayerInfo, SeasonElement, SeasonStatsCalculated, SeasonStatsModes } from "Components/Utils";

class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

const token = process.env.PUBG_API_KEY;

export const handleError = (error: Error) => {
  if (error instanceof APIError) {
    console.error(`${error.name}: ${error.message}\n\n${error.stack}`);
  } else {
    console.error(`Unknown error occurred in getMatchInfo fetch. ${error}`);
  }
};

/*
export const getMatchInfo = async (matchId: string) => {
  const url = "https://api.pubg.com/shards/steam/matches/" + matchId;
  const headers = {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer " + token,
  };

  const payload = await fetch(url, {
    method: "GET",
    headers: headers,
  })
  .then(res => {
    if (res.status === 200) { return res.json() }
    if (res.status === 404) {
      console.error(`No match info found for match ${matchId}`);
    } else {
      throw new APIError("API Error in getMatchInfo fetch");
    }
  })
  .then(json => { return json })
  .catch(error => handleError(error));

  return payload;
};
*/

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
      let stats: Array<SeasonStatsCalculated> = [];
      const allStats: SeasonStatsModes = json.data.attributes.gameModeStats;
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
            mode: mode,
            kdr: (s.kills / s.losses).toFixed(2),
            kda: ((s.kills + s.assists) / s.losses).toFixed(2),
            adr: (s.damageDealt / s.roundsPlayed).toFixed(2),
            win_percentage: ((s.wins / s.roundsPlayed) * 100).toFixed(1), // %
            top10_percentage: ((s.top10s / s.roundsPlayed) * 100).toFixed(1), // %
            longest_kill: s.longestKill.toFixed(2), // meters
            headshot_percentage: ((s.headshotKills / s.kills) * 100).toFixed(1), // %
            average_weapons: (s.weaponsAcquired / s.roundsPlayed).toFixed(1),
            average_time: Math.round((s.timeSurvived / s.roundsPlayed) / 60).toString(), // minutes
            most_kills: s.roundMostKills.toString(),
          });
        }
      }

      return stats;
    });
  
  return result;
};
