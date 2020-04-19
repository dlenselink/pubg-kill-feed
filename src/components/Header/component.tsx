import * as React from "react";
import $ from "jquery";
import { IProps, IState } from "./index";
export class Header extends React.Component<IProps, IState> {
	handleKeyPress = (event: any) => {
    const searchbarInput: JQuery<HTMLElement> = $(".searchbar-input");
		if (searchbarInput.val() && searchbarInput.is(':hover') === true && event.key === 'Enter') {
      const playerName = String(searchbarInput.val());
      this.props.updatePlayer(playerName);
    }
  }

  render() {
    return(
      <div className="header">
        <div className="searchbar">
          <input className="searchbar-input" name="searchbarInput" onKeyPress={this.handleKeyPress} placeholder="Search..." type="text" />
          <svg className="bi bi-search searchbar-icon" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.442 10.442a1 1 0 011.415 0l3.85 3.85a1 1 0 01-1.414 1.415l-3.85-3.85a1 1 0 010-1.415z" clipRule="evenodd"/>
            <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 100-11 5.5 5.5 0 000 11zM13 6.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z" clipRule="evenodd"/>
          </svg>
        </div>
      </div>
    );
  };
};