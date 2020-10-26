import { Box, Grid, Typography, useMediaQuery } from "@material-ui/core";
import React from "react";
import Connection from "./Connection";
import user from "../../assets/user.png";

const MyConnections = ({ data }) => {
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
          data.map((connection) => (
            <Grid item xs={matches ? 6 : 11} key={connection.uid}>
              <Connection
                uid={connection.uid}
                name={connection.fname + " " + connection.lname}
                semester={connection.semester}
                branch={connection.branch}
                role={connection.title}
                photo={user}
                suggested={false}
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
            No Connections! Create a new connection.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default MyConnections;
