import React from "react";
import * as classnames from "classnames";
import { useGlobalState } from "Components/Context";

export const Loader = () => {
  const globalState = useGlobalState();
  const classNames = classnames({"loader": true}, {"is-loading": globalState.isLoading});

  return (
    <div className={classNames} >
      <img className="image" src="https://res.cloudinary.com/lenselink/image/upload/v1612883967/pubg-kill-feed/loading.svg" alt="Loading..." />
    </div>
  );
};
