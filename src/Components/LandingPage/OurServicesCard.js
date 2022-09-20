import React from "react";
import {
  // Avatar,
  Card,
  Grid,
  makeStyles,
  Typography,
  // IconButton,
  CardMedia,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 30,
    width: "100%",
    cursor: "pointer",
    marginBottom: 50,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    "&:hover": {
      transform: "scale(1.1,1.1)",
      transition: theme.transitions.create(["transform"], {
        duration: theme.transitions.duration.standard,
      }),
      boxShadow: theme.shadows[3],
    },
    border: `1.5px solid ${theme.palette.primary.main}`,
  },
  data: {
    padding: "5px 15px 5px 15px",
  },
  avatar: {
    width: 120,
    height: 120,
    border: `3px solid ${theme.palette.primary.main}`,
    backgroundColor: "transparent",
    // cursor: "pointer",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 0,
    color: theme.palette.primary.main,
  },
  text: {
    paddingBottom: 0,
  },
  media: {
    height: 330,
    // "&:hover": {
    //   height: 200,
    //   transform: "scale(1.1,1.1)",
    //   transition: theme.transitions.create(["transform", "height"], {
    //     duration: theme.transitions.duration.shorter,
    //   }),
    // },
  },
}));

function OurServicesCard({ title, photo }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={photo} title={title} />
      <div className={classes.data}>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          <Grid item>
            <Typography className={classes.title}>{title}</Typography>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
}

export default OurServicesCard;
