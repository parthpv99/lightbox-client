import React from "react";
import Post from "./Post";
import { Grid, Box } from "@material-ui/core";
import CreatePostBox from "./CreatePostBox";

const HomePage = () => {
  return (
    <Box my={8}>
      <Grid container direction="column" alignContent="center">
        <CreatePostBox />
        <Post />
        <Post />
        <Post />
        <Post />
      </Grid>
    </Box>
  );
};

export default HomePage;
