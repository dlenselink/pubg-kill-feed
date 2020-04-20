import * as React from "react";
import { IProps } from "./index";

export const Loader = (props: IProps) => {
  let classNames = "loader-image-wrapper";
  if (props.isLoading) {
    classNames += " is-loading";
  }
  return (
    <div className={classNames}>
      <img className="loader-image" src={require("../../assets/loading.gif")} alt="Loading..." />
    </div>
  );
};