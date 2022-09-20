import {
  Button,
  Card,
  CardHeader,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MoonLoader } from "react-spinners";
import { kBaseUrl } from "../../constants";
import { useConnections } from "../../Context/ConnectionProvider";
import { ThemeContext } from "../../Context/ThemeContext";
import InviteCard from "./InviteCard";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "0px 20px 15px 20px",
    // position: "fixed",
    // maxWidth: "22%",
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
  const { invites, setInvites } = useConnections();
  const history = useHistory();
  const [loading, setloading] = useState(true);
  const { defaultTheme } = useContext(ThemeContext);

  const handleSeeMore = () => {
    history.push("/allinvites");
  };

  useEffect(() => {
    fetch(kBaseUrl + "request_received", {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => setInvites(data.slice(0, 2)))
      .then(() => setloading(false))
      .catch((e) => console.log(e));
  }, []);

  const invitations = invites && invites.length !== 0 ? invites.slice(0, 2) : [];

  return (
    <Card className={classes.card}>
      <CardHeader
        styles={{ marginTop: "0px" }}
        className={classes.title}
        title="Total Invites"
      />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        {loading ? (
          <Grid item>
            <MoonLoader
              size={30}
              color={defaultTheme === "dark" ? "#B6B6B6" : "#006BA6"}
              loading={loading}
            />
          </Grid>
        ) : (
          <>
            {invitations && invitations.length !== 0 ? (
              invitations.map((invite) => (
                <Grid item key={invite.uid}>
                  <InviteCard data={invite} suggested={false} />
                </Grid>
              ))
            ) : (
              <Typography
                color="textSecondary"
                variant="h6"
                style={{ textAlign: "center" }}
              >
                No pending invites!
              </Typography>
            )}
          </>
        )}
      </Grid>
      {/* {!loading &&  */}
      {invitations && invitations.length !== 0 && (
        <Grid container justify="flex-end">
          <Button color="primary" onClick={handleSeeMore}>
            See more...
          </Button>
        </Grid>
      )}
      {/* )} */}
    </Card>
  );
}

export default PendingInvites;
