import React from "react";
import * as ReactDOM from "react-dom";
import { GlobalStateProvider } from "Components/Context";
import { App } from "Components/App";

const Index: React.FunctionComponent = () => {
  return (
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  );
};

ReactDOM.render(<Index />, document.getElementById("root"));
