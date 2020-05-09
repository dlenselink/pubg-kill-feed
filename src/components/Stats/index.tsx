import React from "react";
import { useGlobalState } from "Components/Context";

export const PlayerStats = () => {
  const state = useGlobalState();
  console.log(state);
  return( 
    <div>Hi</div>
  );
};