import { get } from "lodash";

export const getPlayerInfo = (playerName: string) => {
  const url = "https://api.pubg.com/shards/steam/players?filter[playerNames]=" + playerName;
  const headers = {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer " + process.env.REACT_APP_PUBG_API_KEY,
  };
  return fetch(url, {
    method: "GET",
    headers: headers,
  })
  .then(result => result.json())
  .then(data => {
    const recentMatches: Array<{ type: string, id: string }> = get(data, 'data[0].relationships.matches.data');
    const playerId = get(data, 'data[0].id');
    let matchIds: Array<string> = [];

    recentMatches.forEach((match, index) => {
      matchIds[index] = match.id;
    });

    localStorage.setItem('playerName', playerName);
    localStorage.setItem('playerId', playerId);
    localStorage.setItem('recentMatches', matchIds.join(","));

    const playerInfo = {
      playerName: playerName,
      playerId: playerId,
      recentMatches: matchIds,
    };

    return playerInfo;
  })
  .catch(error => console.warn(error));
};

export const getMatchInfo = (matchId: string) => {
  const url = "https://api.pubg.com/shards/steam/matches/" + matchId;
  const headers = {
    "Accept": "application/vnd.api+json",
    "Authorization": "Bearer " + process.env.REACT_APP_PUBG_API_KEY,
  };
  return fetch(url, {
    method: "GET",
    headers: headers,
  })
  .then(result => result.json())
  .then(data => {
    return data;
  })
  .catch(error => console.warn(error));
};