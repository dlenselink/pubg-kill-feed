import React from "react";
import { GlobalStateProvider } from "Components/Context";
import { ThemeProvider } from '@material-ui/core/styles';
import { pubgTheme } from "Components/Utils/material";
import { Loader } from "Components/Loader";
import { Header } from "Components/Header";
import { Player } from "Components/Player";
import "Assets/styles.scss";

export const App = () => {
  return(
    <GlobalStateProvider>
      <ThemeProvider theme={pubgTheme}>
        <div className="app">
          <Loader />
          <Header />
          <Player />
        </div>
      </ThemeProvider>
    </GlobalStateProvider>
  );
};
