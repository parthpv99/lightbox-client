import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Project from "./Project";

function Projects({ projects, end }) {
  return (
    <Grid container direction="column">
      {projects && projects.length !== 0 ? (
        projects.map((project) => (
          <Grid item key={project._id}>
            <Project project={project} />
          </Grid>
        ))
      ) : (
        <Typography
          variant="body1"
          color="textSecondary"
          style={{ textAlign: "center", fontSize: 25 }}
        >
          You have not created or joined any project.
        </Typography>
      )}
      {end && (
        <Typography
          style={{ textAlign: "center" }}
          variant="h6"
          color="textSecondary"
        >
          You're all caught up!
        </Typography>
      )}
      {/* <Grid item>
        <Post />
      </Grid>
      <Grid item>
        <Project />
      </Grid>
      <Grid item>
        <Post />
      </Grid> */}
    </Grid>
  );
}

export default Projects;
