import React from "react";
import * as classnames from "classnames";
import { useGlobalDispatch, useGlobalState } from "Components/Context";
import { Actions } from "Utils/constants";

export const loadingAnimation = () => {
  const dispatch = useGlobalDispatch();
  dispatch({ type: Actions.showLoader });
  const delay = 2000;
  setTimeout(() => {
    dispatch({ type: Actions.resetLoader });
  }, delay);
};

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
