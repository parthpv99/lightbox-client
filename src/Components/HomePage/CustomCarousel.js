import React from "react";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  carousel: {
    paddingLeft: 70,
    paddingRight: 70,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: 30,
      paddingRight: 30,
      marginTop: 10,
      marginBottom: 5,
    },
    // height: "90vh",
  },
  img: {
    cursor: "pointer",
    // height: "calc(100%-1px)",
    margin: "auto",
    maxWidth: "100%",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      height: "45vh",
      objectFit: "scale-down",
    },
  },
}));

const CustomCarousel = (props) => {
  const classes = useStyles();
  return (
    <Carousel
      className={classes.carousel}
      indicators={false}
      autoPlay={false}
      timeout={300}
      navButtonsAlwaysVisible={true}
    >
      {props.images.map((image, index) => (
        <img
          key={index}
          style={{ maxHeight: "calc(100vh - 64px)" }}
          className={classes.img}
          src={image}
          alt=""
        />
      ))}
    </Carousel>
  );
};

export default CustomCarousel;
