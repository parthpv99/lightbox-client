import React from "react";
import PendingInvites from "./PendingInvites";
import MyConnections from "./MyConnections";
import { Grid, Box, useMediaQuery } from "@material-ui/core";
import PageHeading from "../PageHeading/PageHeading";
import GroupIcon from "@material-ui/icons/Group";
import Searchbar from "../Searchbar/Searchbar";
import QuickAccessCard from "../QuickAccess/QuickAccessCard";

const ConnectionPage = () => {
  const handleSearch = (search) => {
    console.log(search);
  };
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <Box my={matches ? 10 : 15} mx={3}>
      <Grid container direction="row" justify="space-between">
        {matches && (
          <Grid item xs={3}>
            <PendingInvites />
          </Grid>
        )}
        <Grid item xs={matches ? 6 : 12}>
          <Grid container direction="column">
            <Grid item>
              <PageHeading
                title="Connections"
                countTitle="Total Connections"
                count="45"
                icon={
                  <GroupIcon style={{ fontSize: "300%", color: "#5F5F5F" }} />
                }
              />
            </Grid>
            <Grid item container justify="flex-end" direction="row">
              <Grid item xs={matches ? 5 : 12}>
                <Searchbar
                  hintText="Search Connections..."
                  handleSearch={handleSearch}
                />
              </Grid>
            </Grid>
            <Grid item>
              <MyConnections />
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

export default ConnectionPage;
