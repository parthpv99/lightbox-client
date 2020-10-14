import { Grid } from "@material-ui/core";
import React from "react";
import Post from "./Post";
import Project from "./Project";

function Posts() {
  return (
    <Grid container direction="column">
      <Grid item>
        <Post />
      </Grid>
      <Grid item>
        <Project />
      </Grid>
      <Grid item>
        <Post />
      </Grid>
    </Grid>
  );
}

export default Posts;
