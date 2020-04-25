import React, { createContext, useState, useEffect } from "react";
import { Loader } from "../Loader";
import { Header } from "../Header";
import "../../styles.scss";

interface IGlobalContext {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const defaultValues: IGlobalContext = {
  isLoading: false,
  setIsLoading: () => false,
};

export const GlobalContext = createContext<IGlobalContext>(defaultValues);

export const App = () => {
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (isLoading) {
			setTimeout(() => {
				setIsLoading(false);
			}, 2000)
		}
	},
	[isLoading]);

	return(
		<GlobalContext.Provider value={{
			isLoading,
			setIsLoading,
		}}>
			<div className="app">
				<Loader />
				<Header />
			</div>
		</GlobalContext.Provider>
	);
};
