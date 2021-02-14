import React, { useState } from "react";
import { defaultState, useGlobalDispatch } from "Components/Context";
import { getPlayerInfo, getSeasonId, getSeasonStats, handleError } from "../../services/PUBG";
import $ from "jquery";

const classNames = require('classnames');

export const Header = () => {
  const dispatch = useGlobalDispatch();
  const [input, setInput] = useState("");
  const inputClassNames = classNames({
    "input": true,
    "open": input,
  });

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const searchbarInput: JQuery<HTMLElement> = $("input[name='searchbarInput']");
    const payload: State = {
      currentSeason: "",
      isLoading: false,
      playerId: "",
      playerName: "",
      playerStats: defaultState.playerStats,
      recentMatches: [],
    };

    if (input && event.key === "Enter") {
      searchbarInput.blur();
      getSeasonId()
      .then((season: string) => {
        payload.currentSeason = season;
        return getPlayerInfo(input);
      })
      .then((player: PlayerInfo) => {
        payload.playerId = player.playerId;
        payload.playerName = player.playerName;
        payload.recentMatches = player.recentMatches;
        if (payload.currentSeason) {
          return getSeasonStats(player.playerId, payload.currentSeason);
        }
        throw new Error("The current season is invalid");
      })
      .then((seasonStats: CalculatedStats[]) => {
        if (payload.playerStats) {
          for (const stats of seasonStats) {
            payload.playerStats[stats.mode as keyof SeasonStatsCalculated] = stats;
          }
          dispatch({ type: "UPDATE_STATE", payload: payload });
          return;
        }
        throw new Error("Player stats were unavailable");
      })
      .catch((err: Error) => handleError(err));
    }
  };

  return(
    <div className="header">
      <div className="searchbar">
        <label>
          <input className={inputClassNames} value={input} onChange={e => setInput(e.target.value)} name="searchbarInput" onKeyPress={handleKeyPress} placeholder="Search..." type="text" />
        </label>
        <svg className="bi bi-search icon" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clipRule="evenodd"/>
          <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clipRule="evenodd"/>
        </svg>
      </div>
    </div>
  );
};
