import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Post from "./Post";
import Project from "../ProjectsPage/Project";

function Posts({ posts, end }) {
  return (
    <Grid container direction="column">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <Grid item key={post._id}>
            {post.is_post ? <Post post={post} /> : <Project project={post} />}
          </Grid>
        ))
      ) : (
        <Typography
          variant="body1"
          color="textSecondary"
          style={{ textAlign: "center", fontSize: 25 }}
        >
          Nothing to show here!
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

export default Posts;
