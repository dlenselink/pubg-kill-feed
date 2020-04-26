import { get } from "lodash";

const key = process.env.PUBG_API_KEY;

export const getMatchInfo = async (matchId: string) => {
  if (key) {
    const url = "https://api.pubg.com/shards/steam/matches/" + matchId;
    const headers = {
      "Accept": "application/vnd.api+json",
      "Authorization": "Bearer " + key,
    };

    return await fetch(url, {
      method: "GET",
      headers: headers,
    })
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => {
      throw new Error("Error in getMatchInfo fetch: " + error);
    });
  } else {
    throw new Error("Error reading or retrieving API key env variable (getMatchInfo).");
  }
};

export const getPlayerInfo = async (playerName: string) => {
  if (key) {
    const url = "https://api.pubg.com/shards/steam/players?filter[playerNames]=" + playerName;
    const headers = {
      "Accept": "application/vnd.api+json",
      "Authorization": "Bearer " + key,
    };

    return await fetch(url, {
      method: "GET",
      headers: headers,
    })
    .then(response => response.json())
    .then(json => {
      const recentMatches: Array<{ type: string, id: string }> = get(json, "data[0].relationships.matches.data");
      const playerId = get(json, "data[0].id");
      let matchIds: Array<string> = [];
      if (playerId && recentMatches) {
        recentMatches.forEach((match, index) => {
          matchIds[index] = match.id;
        });
        const playerInfo = {
          playerName: playerName,
          playerId: playerId,
          recentMatches: matchIds,
        };
        return playerInfo;
      } else {
        console.error("No player info found for user '" + playerName + "'");
      }
    })
    .catch(error => {
      throw new Error("Error in getPlayerInfo fetch: " + error);
    });
  } else {
    throw new Error("Error reading or retrieving API key env variable (getPlayerInfo).");
  }

};

export const getSeasonList = async () => {
  if (key) {
    const url = "https://api.pubg.com/shards/steam/seasons";
    const headers = {
      "Accept": "application/vnd.api+json",
      "Authorization": "Bearer " + key,
    };

    return await fetch(url, {
      method: "GET",
      headers: headers,
    })
    .then(response => response.json())
    .then(json => {
      let seasonList: Array<string> = [];
      const seasonInfo = get(json, "data");
      if (seasonInfo) {
        return seasonInfo;
      } else {
        console.error("Error while retrieving season list");
      }
    })
    .catch(error => {
      throw new Error("Error in getSeasonList fetch: " + error);
    });
  } else {
    throw new Error("Error reading or retrieving API key env variable (getSeasonList).");
  }
};

export const getSeasonStats = async (accountId: string, season: string) => {
  if (key) {
    const url = "https://api.pubg.com/shards/steam/players/" + accountId + "/seasons/" + season;
    const headers = {
      "Accept": "application/vnd.api+json",
      "Authorization": "Bearer " + key,
    };

    return await fetch(url, {
      method: "GET",
      headers: headers,
    })
    .then(response => response.json())
    .then(json => {
      // Validate response
      return json;
    })
    .catch(error => {
      throw new Error("Error in getSeasonStats fetch: " + error);
    });
  } else {
    throw new Error("Error reading or retrieving API key env variable (getSeasonStats).");
  }
};
