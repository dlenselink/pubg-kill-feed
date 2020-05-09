import React from "react";
import { Loader } from "Components/Loader";
import { Header } from "Components/Header";
import "Utils/styles.scss";

export const App: React.FC = () => {
  return(
    <div className="app">
      <Loader />
      <Header />
    </div>
  );
};
