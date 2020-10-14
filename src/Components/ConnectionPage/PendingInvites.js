import { Button, Card, CardHeader, Grid, makeStyles } from "@material-ui/core";
import React from "react";
import InviteCard from "./InviteCard";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "0px 20px 15px 20px",
    position: "fixed",
    width: "22%",
  },
  title: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 600,
    textAlign: "center",
    fontSize: "1.2rem",
    color: theme.palette.primary.main,
  },
}));

function PendingInvites() {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        styles={{ marginTop: "0px" }}
        className={classes.title}
        title="Total Invites"
      />
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <InviteCard />
        </Grid>
        <Grid item>
          <InviteCard />
        </Grid>
        <Grid item>
          <InviteCard />
        </Grid>
      </Grid>
      <Grid container justify="flex-end">
        <Button color="primary">See more...</Button>
      </Grid>
    </Card>
  );
}

export default PendingInvites;
