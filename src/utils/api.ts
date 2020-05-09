import { get } from "lodash";

class APIError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "APIError";
  }
}

const fetchParams = {
  method: "GET",
  headers: {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer " + process.env.PUBG_API_KEY,
  }
};

const handleError = (error: Error) => {
  // TODO: Expand error handling to populate user-facing messaging via react-spring
  if (error instanceof APIError) {
    console.error(`${error.name}: ${error.message}\n\n${error.stack}`);
  } else {
    console.error("Unknown error occurred in getMatchInfo fetch");
  }
};

export const getMatchInfo = async (matchId: string) => {
  const url = "https://api.pubg.com/shards/steam/matches/" + matchId;
  const payload = await fetch(url, fetchParams)
  .then(response => {
    if (response.status === 200) { return response.json() }
    if (response.status === 404) { throw new APIError(`No match info found for match ${matchId}`) }
    throw new APIError("API Error in getMatchInfo fetch");
  })
  .then(json => { return json })
  .catch(error => handleError(error));

  return payload;
}; 

export const getPlayerInfo = async (playerName: string) => {
  const url = "https://api.pubg.com/shards/steam/players?filter[playerNames]=" + playerName;
  const payload = await fetch(url, fetchParams)
  .then(response => {
    if (response.status === 200) { return response.json() }
    if (response.status === 404) { throw new APIError(`No player info found for user ${playerName}`) }
    throw new APIError("API Error in getMatchInfo fetch");
  })
  .then(json => {
    const recentMatches: Array<{ type: string, id: string }> = get(json, "data[0].relationships.matches.data");
    const playerId = get(json, "data[0].id");
    
    const playerInfo = {
      playerName: playerName,
      playerId: playerId,
      recentMatches: [] as string[],
    };

    if (recentMatches) {
      let matchIds: Array<string> = [];
      recentMatches.forEach((match, index) => {
        matchIds[index] = match.id;
      });
      playerInfo.recentMatches = matchIds;
    }
    
    return playerInfo;
  })
  .catch(error => handleError(error));

  return payload;
};

export const getSeasonList = async () => {
  const url = "https://api.pubg.com/shards/steam/seasons";
  const payload = await fetch(url, fetchParams)
  .then(response => {
    if (response.status === 200) { return response.json() }
    throw new APIError("API Error in getSeasonsList fetch");
  })
  .then(json => {
    const seasonInfo = get(json, "data");
    return seasonInfo;
  })
  .catch(error => handleError(error));

  return payload;
};

export const getSeasonStats = async (accountId: string, season: string) => {
  const url = "https://api.pubg.com/shards/steam/players/" + accountId + "/seasons/" + season;
  const payload = await fetch(url, fetchParams)
  .then(response => {
    if (response.status === 200) { return response.json() }
    throw new APIError("API Error in getSeasonsList fetch");
  })
  .then(json => { return json })
  .catch(error => handleError(error));
  
  return payload;
};
