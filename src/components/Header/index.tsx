import React from "react";
import { defaultState, useGlobalDispatch } from "Components/Context";
import { getPlayerInfo, getSeasonId, getSeasonStats, handleError } from "../../services/PUBG";
import $ from "jquery";

export const Header = () => {
  const dispatch = useGlobalDispatch();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const searchbarInput: JQuery<HTMLElement> = $("input[name='searchbarInput']");
    const header: JQuery<HTMLElement> = $(".header");
    const input = String(searchbarInput.val());
    const updatedState: State = {
      currentSeason: "",
      isLoading: false,
      playerId: "",
      playerName: "",
      playerStats: defaultState.playerStats,
      recentMatches: [],
    };

    if (input && header.is(":hover") && event.key === "Enter") {
      searchbarInput.blur();
      getSeasonId()
      .then((season: string) => {
        updatedState.currentSeason = season;
        return getPlayerInfo(input);
      })
      .then(player => {
        updatedState.playerId = player.playerId;
        updatedState.playerName = player.playerName;
        updatedState.recentMatches = player.recentMatches;
        return getSeasonStats(player.playerId, updatedState.currentSeason);
      })
      .then(seasonStats => {
        for (const stats of seasonStats) {
          updatedState.playerStats[stats.mode as keyof SeasonStatsCalculated] = stats;
        }

        dispatch({ type: "UPDATE_STATE", payload: updatedState });
      })
      .catch((err: Error) => handleError(err));
    }
  };

  return(
    <div className="header">
      <div className="searchbar">
        <input className="input" name="searchbarInput" onKeyPress={handleKeyPress} placeholder="Search..." type="text" />
        <svg className="bi bi-search icon" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clipRule="evenodd"/>
          <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clipRule="evenodd"/>
        </svg>
      </div>
    </div>
  );
};
