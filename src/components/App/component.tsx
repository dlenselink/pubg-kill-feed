import React, { useEffect, useState } from "react";
import { PlayerInfo } from "./index";
import { Loader } from "../Loader";
import { Header } from "../Header";
import '../../styles.scss';

export const App = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
		playerName: "",
		playerId: "",
		recentMatches: [],
	});

	useEffect(() => {
		if (isLoading) {
			setTimeout(() => {
				setIsLoading(false);
			}, 2000)
		}
	},
	[isLoading]);

	const updatePlayerInfo = (playerInfo: PlayerInfo | undefined) => {
		setIsLoading(true);
		if (playerInfo) {
			setPlayerInfo(playerInfo);
			console.log(playerInfo);
			localStorage.setItem('playerName', playerInfo.playerName);
			localStorage.setItem('playerId', playerInfo.playerId);
			localStorage.setItem('recentMatches', playerInfo.recentMatches.join(","));
		}
	};
	return (
		<div className="background">
			<Loader isLoading={isLoading} />
			<Header isLoading={isLoading} playerInfo={playerInfo} updatePlayerInfo={updatePlayerInfo} />
		</div>
	);
};