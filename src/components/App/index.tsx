import React from "react";
import { Loader } from "Components/Loader";
import { Header } from "Components/Header";
import "Assets/styles.scss";

export const App: React.FunctionComponent = () => {
  return(
    <div className="app">
      <Loader />
      <Header />
    </div>
  );
};
