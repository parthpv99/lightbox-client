import { makeStyles } from "@material-ui/core";
import React, { useState } from "react";

const useStyle = makeStyles((theme) => ({
  chip: {
    // display: "inline-block",
    userSelect: "none",
    letterSpacing: "0.5px",
    padding: "6px",
    margin: "0.27rem",
    cursor: "pointer",
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "3rem",
    textAlign: "center",
    overflow: "hidden",
    fontWeight: "bold",
    fontFamily: "sans-serif",
  },
}));

const Chip = (props) => {
  const [isSelected, setIsSelected] = useState(false);
  const classes = useStyle();

  return (
    <span
      className={classes.chip}
      style={{
        backgroundColor: isSelected ? "#006BA6" : "#ffffff",
        color: isSelected ? "#ffffff" : "#006BA6",
      }}
      onClick={() => {
        props.onClick(props.label, isSelected);
        setIsSelected(!isSelected);
      }}
    >
      {props.label}
    </span>
  );
};

export default Chip;
