import React from "react";
import { Loader } from "Components/Loader";
import { Header } from "Components/Header";
import { PlayerStats } from "Components/Stats";
import "Utils/styles.scss";


export const App: React.FunctionComponent = () => {
  return(
    <div className="app">
      <Loader />
      <Header />
      <PlayerStats />
    </div>
  );
};
