import React, { useContext }  from "react";
import * as classnames from "classnames";
import { GlobalContext } from "Components/App";

export const Loader = () => {
  const globalContext = useContext(GlobalContext);
  const classNames = classnames({"loader": true}, {"is-loading": globalContext.isLoading});
  const loadingAnimation = "https://res.cloudinary.com/pubg-kill-feed/image/upload/v1587862298/assets/loading.svg";

  return (
    <div className={classNames} >
      <img className="image" src={loadingAnimation} alt="Loading..." />
    </div>
  );
};
