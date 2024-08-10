import React from "react";
import ReactLoading from "react-loading";

export const LoadingComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ReactLoading type="spin" color="red" />
    </div>
  );
};
