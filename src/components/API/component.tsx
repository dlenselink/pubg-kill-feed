import { get } from "lodash";
import { PlayerInfo } from "../App";

export const getPlayerInfo = async (playerName: string) => {
  const url = "https://api.pubg.com/shards/steam/players?filter[playerNames]=" + playerName;
  const headers = {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer " + process.env.REACT_APP_PUBG_API_KEY,
  };
  const response = await Promise.all([
    fetch(url, {
      method: "GET",
      headers: headers,
    })
    .then(result => result.json())
    .then(data => {
      const recentMatches: Array<{ type: string, id: string }> = get(data, 'data[0].relationships.matches.data');
      const playerId = get(data, 'data[0].id');
      let matchIds: Array<string> = [];
      if (playerId && recentMatches) {
        recentMatches.forEach((match, index) => {
          matchIds[index] = match.id;
        });
        const playerInfo: PlayerInfo = {
          playerName: playerName,
          playerId: playerId,
          recentMatches: matchIds,
        };
        return playerInfo;
      } else {
        console.error("No stats found for user '" + playerName + "'");
      }
    })
    .catch(error => console.error(error))
  ]);
  return response[0];
};

export const getMatchInfo = async (matchId: string) => {
  const url = "https://api.pubg.com/shards/steam/matches/" + matchId;
  const headers = {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer " + process.env.REACT_APP_PUBG_API_KEY,
  };
  const response = await Promise.all([
    fetch(url, {
      method: "GET",
      headers: headers,
    })
    .then(result => result.json())
    .then(data => {
      return data;
    })
    .catch(error => console.error(error))
  ]);
  return response;
};