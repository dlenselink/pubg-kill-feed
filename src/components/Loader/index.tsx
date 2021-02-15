import React from "react";
import { useGlobalState } from "Components/Context";

const classNames = require('classnames');

export const Loader = () => {
  const globalState = useGlobalState();
  const loaderClassNames = classNames({
    "loader": true,
    "is-loading": globalState.isLoading,
  });

  return (
    <div className={loaderClassNames}>
      <img className="image" src="https://res.cloudinary.com/lenselink/image/upload/v1612883967/pubg-kill-feed/loading.svg" alt="Loading..." />
    </div>
  );
};
