import React from "react";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    marginTop: "10px",
    height: 7,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#4a76cf",
  },
}))(LinearProgress);

function ProgressBar() {
  return (
    <div>
      <BorderLinearProgress variant="determinate" value={70} />
    </div>
  );
}

export default ProgressBar;
