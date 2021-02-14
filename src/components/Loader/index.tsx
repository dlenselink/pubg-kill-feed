import React from "react";
import { useGlobalState } from "Components/Context";

export const Loader = () => {
  const globalState = useGlobalState();

  return (globalState.isLoading ?
    <div className="loader">
      <img className="image" src="https://res.cloudinary.com/lenselink/image/upload/v1612883967/pubg-kill-feed/loading.svg" alt="Loading..." />
    </div> :
    <></>
  );
};
