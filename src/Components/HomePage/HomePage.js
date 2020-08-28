import React from "react";
import Post from "./Post";
import { Grid, Box, useMediaQuery } from "@material-ui/core";
import CreatePostBox from "./CreatePostBox";

const HomePage = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <Box my={8}>
      <Grid container direction="column" alignContent="center">
        {matches && <CreatePostBox />}
        {/* <CreatePostBox /> */}
        <Post />
        <Post />
        <Post />
        <Post />
      </Grid>
    </Box>
  );
};

export default HomePage;
