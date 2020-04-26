import React, { useContext }  from "react";
import * as classnames from "classnames";
import { GlobalContext } from "Components/App";

export const Loader = () => {
  const globalContext = useContext(GlobalContext);
  const classNames = classnames({"loader": true}, {"is-loading": globalContext.isLoading});

  return (
    <div className={classNames} >
      <img className="image" src={require("Assets/loading.svg")} alt="Loading..." />
    </div>
  );
};
