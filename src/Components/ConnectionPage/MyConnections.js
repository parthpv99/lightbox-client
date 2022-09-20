import { Box, Grid, Typography, useMediaQuery } from "@material-ui/core";
import React from "react";
import Connection from "./Connection";
import user from "../../assets/user.png";

const MyConnections = ({ data, search }) => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <Box style={{ alignItems: "center", width: "100%" }}>
      <Grid
        container
        direction="row"
        alignItems="flex-start"
        justify={matches ? "space-between" : "center"}
        alignContent="flex-start"
        spacing={2}
      >
        {/* <Grid item key={data[0].uid}>
          <Connection
            data={data[0]}
            photo={data[0].thumbnail_pic != "" ? data[0].thumbnail_pic : user}
            suggested={false}
            invite={false}
          />
        </Grid> */}
        {data && data.length !== 0 ? (
          data.map((connection) => (
            <Grid
              item
              xs={matches ? 6 : (search && 8)}
              key={connection.uid}
            >
              <Connection
                data={connection}
                photo={
                  connection.thumbnail_pic !== ""
                    ? connection.thumbnail_pic
                    : user
                }
                search={search}
                suggested={false}
                invite={false}
              />
            </Grid>
          ))
        ) : (
          <Grid container direction="row" justify="center">
            <Typography
              color="textSecondary"
              variant="h6"
              style={{ textAlign: "center" }}
            >
              No Connections! Create a new connection.
          </Typography>
          </Grid>
        )}
      </Grid>
    </Box >
  );
};

export default MyConnections;
