import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Grid, Card, useMediaQuery } from "@material-ui/core";
import CustomCarousel from "./CustomCarousel";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
    boxShadow: theme.shadows[0],
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  dialog: {
    backgroundColor: theme.palette.secondary.main,
  },
  description: {
    backgroundColor: theme.palette.secondary.main,
    paddingLeft: "5%",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const ViewPhotos = ({ closeImages, data }) => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const carouselGrid = (
    <Grid item xs={matches ? 8 : 12}>
      {/* {data.images.map((image, index) => {
    return <img src={image} key={index} width="100%" alt="" />;
  })} */}
      <CustomCarousel images={data.images} />
    </Grid>
  );

  const dataGrid = (
    <Grid item xs={matches ? 4 : 12}>
      <Card elevation={0}>
        {data.header}
        <div
          style={
            matches
              ? { height: "75vh", overflow: "auto" }
              : { height: "32vh", overflow: "auto" }
          }
        >
          {data.data}
        </div>
      </Card>
    </Grid>
  );

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        fullScreen
        open={true}
        className={classes.dialog}
        onClose={closeImages}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar} color="inherit" position="fixed">
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={closeImages}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Lightbox
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container direction="row" justify="center" alignItems="center">
          {matches ? (
            <>
              {carouselGrid}
              {dataGrid}
            </>
          ) : (
            <>
              {dataGrid} {carouselGrid}
            </>
          )}
        </Grid>
      </Dialog>
    </div>
  );
};

export default ViewPhotos;
