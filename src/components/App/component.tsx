import * as React from "react";
import $ from "jquery";
import { findIndex, get, slice, takeWhile } from "lodash";
import { IProps, IState } from "./index";
import { Header } from "../Header";
import { getPlayerInfo, getMatchInfo } from "../../api/pubg";
import '../../styles.scss';

export class App extends React.Component<IProps, IState> {
	constructor(props: any) {
		super(props);
		this.updatePlayer = this.updatePlayer.bind(this);
		this.state = {
			playerName: '',
			playerId: '',
			recentMatches: [],
		};
	}

	updatePlayer = (newPlayer: string) => {
		getPlayerInfo(newPlayer).then((playerInfo: any) => {
			this.setState({
				playerName: playerInfo.playerName,
				playerId: playerInfo.playerId,
				recentMatches: playerInfo.recentMatches,
			}, () => {
				const lastTenMatches = slice(this.state.recentMatches, 2, 3); // https://telemetry-cdn.playbattlegrounds.com/bluehole-pubg/steam/2020/04/17/04/19/9f2242a6-8062-11ea-bfdc-4266774b04ef-telemetry.json
				lastTenMatches.forEach((match) => {
					getMatchInfo(match).then((matchInfo: any) => {
						const telemetryId = get(matchInfo, 'data.relationships.assets.data[0].id');
						const matchMetadata = get(matchInfo, 'included');
						const targetIndex = findIndex(matchMetadata, (metadata: any) => { return metadata.id === telemetryId });
						const telemetryUrl = get(matchMetadata, '[' + targetIndex + '].attributes.URL');
						console.log(telemetryUrl);
						$.getJSON(telemetryUrl, (telemetryData) => {
							// For each telemetry file, log/capture all knockouts & kills
							telemetryData.forEach((event: any) => {
								if ((event.character && event.character.name === this.state.playerName) || (event.attacker && event.attacker.name === this.state.playerName)) {
									if (event._T === "LogPlayerKill") {
										console.log(event);
									}
								}
							});
							// const kills = takeWhile(telemetryData, (telemetryEvent: any) => { return (event.character && event.character.name === this.state.playerName) || (event.attacker && event.attacker.name === this.state.playerName) });
							// console.log(kills);
						});
					});
				});
			});
		});	
	};

	render () {
		return (
			<div className="background">
				<Header updatePlayer={this.updatePlayer} />
			</div>
		);
	};
};