import React from "react";
import HashLoader from "react-spinners/HashLoader";

function Spinner({ loading, size }) {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        // position: "fixed",
        // top: "50%",
        // left: "50%",
        // transform: translate(-50%, -50%);
        // -webkit-transform: translate(-50%, -50%);
        // -moz-transform: translate(-50%, -50%);
        // -o-transform: translate(-50%, -50%);
        // -ms-transform: translate(-50%, -50%);
      }}
    >
      <HashLoader size={size} color={"#006BA6"} loading={loading} />
    </div>
  );
}

export default Spinner;
