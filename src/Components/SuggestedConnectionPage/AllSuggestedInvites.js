import { Box, Grid, Typography, useMediaQuery } from "@material-ui/core";
import React from "react";
import Connection from "../ConnectionPage/Connection";
import user from "../../assets/user.png";

function AllSuggestedInvites({ data }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <Box style={{ alignItems: "center", width: "100%" }}>
      <Grid
        container
        direction="row"
        justify={matches ? "flex-start" : "center"}
        alignItems="flex-start"
        spacing={2}
      >
        {data && data.length !== 0 ? (
          data.map((suggestion, index) => (
            <Grid item xs={matches ? 6 : 11} key={suggestion.uid}>
              <Connection
                data={suggestion}
                photo={
                  // user
                  suggestion.thumbnail_pic !== ""
                    ? suggestion.thumbnail_pic
                    : user
                }
                suggested={true}
                invite={false}
              />
            </Grid>
          ))
        ) : (
          <Typography
            color="textSecondary"
            variant="h6"
            style={{ textAlign: "center" }}
          >
            No Suggested Invitations!
          </Typography>
        )}
      </Grid>
    </Box>
  );
}

export default AllSuggestedInvites;
