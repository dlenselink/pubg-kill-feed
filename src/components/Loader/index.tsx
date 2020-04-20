import React, { useContext }  from "react";
import { GlobalContext } from "../App";

export const Loader = () => {
  const globalContext = useContext(GlobalContext);

  return (
    <div className={globalContext.isLoading ? "loader-image-wrapper is-loading" : "loader-image-wrapper"} >
      <img className="loader-image" src={require("./loading.gif")} alt="Loading..." />
    </div>
  );
};
