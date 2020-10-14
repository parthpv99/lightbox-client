import { Box, Grid, useMediaQuery } from "@material-ui/core";
import React from "react";
import Connection from "./Connection";
import user from "../../assets/user.png";

const MyConnections = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <Box style={{ alignItems: "center" }}>
      <Grid
        container
        direction="row"
        justify={matches ? "flex-start" : "center"}
        spacing={2}
      >
        <Grid item xs={matches ? 6 : 11}>
          <Connection
            name="Nisarg Chokshi"
            semester="7"
            branch="Information Technology"
            role="Web Developer"
            photo={user}
            count="45"
          />
        </Grid>
        <Grid item xs={matches ? 6 : 11}>
          <Connection
            name="Nisarg Chokshi"
            semester="7"
            branch="Information Technology"
            role="Web Developer"
            photo={user}
            count="45"
          />
        </Grid>
        <Grid item xs={matches ? 6 : 11}>
          <Connection
            name="Nisarg Chokshi"
            semester="7"
            branch="Information Technology"
            role="Web Developer"
            photo={user}
            count="45"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyConnections;
