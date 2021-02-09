import React from "react";
import { Loader } from "Components/Loader";
import { Header } from "Components/Header";
import "Assets/styles.scss";

export const App = () => {
  return(
    <div className="app">
      <Loader />
      <Header />
    </div>
  );
};
