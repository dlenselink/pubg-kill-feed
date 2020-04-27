import React from "react";
import * as classnames from "classnames";
import { useGlobalState } from "Components/Context";

export const Loader = () => {
  const globalState = useGlobalState();
  const classNames = classnames({"loader": true}, {"is-loading": globalState.isLoading});
  const loadingAnimation = "https://res.cloudinary.com/pubg-kill-feed/image/upload/v1587862298/assets/loading.svg";

  return (
    <div className={classNames} >
      <img className="image" src={loadingAnimation} alt="Loading..." />
    </div>
  );
};
