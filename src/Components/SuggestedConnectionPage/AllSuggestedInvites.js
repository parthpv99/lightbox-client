import { Box, Grid, Typography, useMediaQuery } from "@material-ui/core";
import React from "react";
import Connection from "../ConnectionPage/Connection";
import user from "../../assets/user.png";

function AllSuggestedInvites({ data }) {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <Box style={{ alignItems: "center" }}>
      <Grid
        container
        direction="row"
        justify={matches ? "flex-start" : "center"}
        spacing={2}
      >
        {data.length !== 0 ? (
          data.map((suggestion, index) => (
            <Grid item xs={matches ? 6 : 11} key={suggestion.uid}>
              <Connection
                uid={suggestion.uid}
                name={suggestion.fname + " " + suggestion.lname}
                semester={suggestion.semester}
                branch={suggestion.branch}
                role={suggestion.title}
                photo={user}
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
