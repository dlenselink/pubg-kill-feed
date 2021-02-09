import { findIndex, get } from "lodash";
import { PlayerInfo, SeasonElement } from "Components/Utils";
import { useGlobalState } from "Components/Context";
import { ResolvePlugin } from "webpack";

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
    .then(seasons => {
      const currentIndex = findIndex(seasons.data, (el: SeasonElement) => el.attributes.isCurrentSeason);
      return seasons.data[currentIndex].id;
    })
    .catch(err => handleError(err));

  return result;
};

/*
export const getSeasonStats = async (accountId: string, season: string) => {
  const url = "https://api.pubg.com/shards/steam/players/" + accountId + "/seasons/" + season;
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
    throw new APIError("API Error in getSeasonsList fetch");
  })
  .then(json => { return json })
  .catch(error => handleError(error));
  
  return payload;
};
*/