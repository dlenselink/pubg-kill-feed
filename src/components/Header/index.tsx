import React, { useEffect } from "react";
import { useGlobalDispatch, useGlobalState } from "Components/Context";
import $ from "jquery";
import { getPlayerInfo, getSeasonId, getSeasonStats, handleError } from "Components/API";
import { SeasonStatsCalculated } from "Components/Utils";

export const Header = () => {
  const dispatch = useGlobalDispatch();
  const globalState = useGlobalState();

  useEffect(() => {
    getSeasonId()
    .then((season: string) => {
      globalState.currentSeason = season;
    })
    .catch((err: Error) => handleError(err));
  }, []);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const searchbarInput: JQuery<HTMLElement> = $("input[name='searchbarInput']");
    const header: JQuery<HTMLElement> = $(".header");
    const input = String(searchbarInput.val());
    if (input && header.is(":hover") && event.key === "Enter") {
      searchbarInput.blur();
      dispatch({ type: "SHOW_LOADER" });
      getPlayerInfo(input)
      .then(player => {
        globalState.playerId = player.playerId;
        globalState.playerName = player.playerName;
        globalState.recentMatches = player.recentMatches;
        return getSeasonStats(player.playerId, globalState.currentSeason);
      })
      .then(seasonStats => {
        for (const stats of seasonStats) {
          globalState.playerStats[stats.mode as keyof SeasonStatsCalculated] = stats;
        }
        console.log(globalState.playerStats);
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
