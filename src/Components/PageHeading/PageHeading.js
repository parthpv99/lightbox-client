import {
  Grid,
  Typography,
  Divider,
  makeStyles,
  useMediaQuery,
} from "@material-ui/core";
import React from "react";

const useStyle = makeStyles((theme) => ({
  title: {
    color: "#5F5F5F",
    fontSize: "2rem",
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.4rem",
    },
  },
  subtitle: {
    color: "#5F5F5F",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
    },
  },
  divider: {
    backgroundColor: "#5F5F5F",
  },
}));

function PageHeading({ title, icon, countTitle, count }) {
  const classes = useStyle();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <div>
      <Grid
        container
        direction="row"
        alignItems="flex-end"
        justify="space-between"
      >
        <Grid item xs={matches ? 8 : 5}>
          <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-end"
            spacing={1}
          >
            {matches && <Grid item>{icon}</Grid>}
            <Grid item>
              <Typography className={classes.title}>{title}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={matches ? 4 : 7}>
          <Grid
            container
            direction="row"
            justify="flex-end"
            alignItems="flex-end"
          >
            <Typography
              className={classes.subtitle}
            >{`${countTitle}: ${count}`}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
    </div>
  );
}

export default PageHeading;
