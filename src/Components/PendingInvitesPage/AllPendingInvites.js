import { Box, Grid, Typography, useMediaQuery } from "@material-ui/core";
import React from "react";
import Connection from "../ConnectionPage/Connection";
import user from "../../assets/user.png";

function AllPendingInvites({ data }) {
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
          data.map((invite) => (
            <Grid item xs={matches ? 6 : 11} key={invite.uid}>
              <Connection
                uid={invite.uid}
                name={invite.fname + " " + invite.lname}
                semester={invite.semester}
                branch={invite.branch}
                role={invite.title}
                photo={invite.photo ? invite.photo : user}
                suggested={false}
                invite={true}
              />
            </Grid>
          ))
        ) : (
          <Typography
            color="textSecondary"
            variant="h6"
            style={{ textAlign: "center" }}
          >
            No Pending Invitations!
          </Typography>
        )}
      </Grid>
    </Box>
  );
}

export default AllPendingInvites;
