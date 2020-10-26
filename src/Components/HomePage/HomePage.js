import React, { useContext } from "react";
import Posts from "./Posts";
import { Grid, Box, useMediaQuery } from "@material-ui/core";
import CreatePostBox from "./CreatePostBox";
import TopBlogsCard from "./TopBlogsCard";
import QuickAccessCard from "../QuickAccess/QuickAccessCard";
import { UserContext } from "../../Context/UserContext";

const HomePage = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  return (
    <Box my={matches ? 10 : 15} mx={matches ? 3 : 0}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignContent="center"
      >
        {matches && (
          <Grid item xs={3}>
            <TopBlogsCard />
          </Grid>
        )}
        <Grid item xs={matches ? 6 : 12}>
          <Grid container direction="column">
            {matches && (
              <Grid item xs={12}>
                <CreatePostBox />
              </Grid>
            )}
            <Grid item xs={12}>
              <Posts />
            </Grid>
          </Grid>
        </Grid>
        {matches && (
          <Grid item xs={3}>
            <QuickAccessCard />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default HomePage;
