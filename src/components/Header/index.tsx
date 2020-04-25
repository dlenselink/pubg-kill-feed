import React, { useContext } from "react";
import { GlobalContext } from "../App";
import * as API from "../API";
import $ from "jquery";

export const Header = () => {
  const globalContext = useContext(GlobalContext);
  
	const handleKeyPress = async (event: any) => {
    const searchbarInput: JQuery<HTMLElement> = $(".searchbar-input");
		if (searchbarInput.val() && searchbarInput.is(":hover") === true && event.key === "Enter") {
      globalContext.setIsLoading(true);
      const playerName = String(searchbarInput.val());
      const playerInfo = await API.getPlayerInfo(playerName);
      const seasonList = await API.getSeasonList();
      console.log(seasonList);
    }
  };

  return(
    <div className="header">
      <div className="searchbar">
        <input className="searchbar-input" name="searchbarInput" onKeyPress={handleKeyPress} placeholder="Search..." type="text" />
        <svg className="bi bi-search searchbar-icon" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clipRule="evenodd"/>
          <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clipRule="evenodd"/>
        </svg>
      </div>
    </div>
  );
};
