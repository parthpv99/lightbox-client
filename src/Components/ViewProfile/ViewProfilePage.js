import { Box, Grid, useMediaQuery } from "@material-ui/core";
import React from "react";
import QuickAccessCard from "../QuickAccess/QuickAccessCard";
import UserDetailsCard from "./UserDetailsCard";
import DashboardCard from "./DashboardCard";
import SkillsCard from "./SkillsCard";
import PageHeading from "../PageHeading/PageHeading";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Posts from "../HomePage/Posts";

function ViewProfilePage() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <Box my={matches ? 10 : 15} mx={3}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignContent="center"
      >
        {matches && (
          <Grid item xs={3}>
            <UserDetailsCard />
          </Grid>
        )}
        <Grid item xs={matches ? 6 : 12}>
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <DashboardCard />
            </Grid>
            <Grid item>
              <SkillsCard />
            </Grid>
            <Grid item>
              <PageHeading
                title="Activities"
                countTitle="Total Activities"
                count="10"
                icon={
                  <PostAddIcon style={{ fontSize: "300%", color: "#5F5F5F" }} />
                }
              />
            </Grid>
            <Grid item>
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
}

export default ViewProfilePage;
