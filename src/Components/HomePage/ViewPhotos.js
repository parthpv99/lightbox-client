import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { Grid, Card } from "@material-ui/core";

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
              color="default"
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
        <Grid container>
          <Grid item xs={8}>
            {data.images.map((image, index) => {
              return <img src={image} key={index} width="100%" alt="" />;
            })}
          </Grid>
          <Grid item xs={4} className={classes.Description}>
            <Card elevation={0}>
              {data.header}
              {data.data}
            </Card>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
};

export default ViewPhotos;
