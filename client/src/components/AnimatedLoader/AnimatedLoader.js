import React from "react";
import Loader from "react-js-loader";

function AnimatedLoader() {
  return (
    <div>
      <Loader
        type="hourglass"
        bgColor={"#5cccf2"}
        color={"#5cccf2"}
        size={200}
      />
    </div>
  );
}

export default AnimatedLoader;
