import { Box, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import PendingInvites from "./PendingInvites";
import SuggestedInvites from "./SuggestedInvites";

const useStyle = makeStyles(() => ({
  sidemenu: {
    position: "fixed",
    width: "22%",
  },
}));

function SideMenus({ pending, suggested }) {
  const classes = useStyle();
  return (
    <Box mx={2} className={classes.sidemenu}>
      <Grid container direction="column" spacing={2}>
        {pending && (
          <Grid item>
            <PendingInvites />
          </Grid>
        )}
        {suggested && (
          <Grid item>
            <SuggestedInvites />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default SideMenus;
