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
import InviteCard from "./InviteCard";
import { kBaseUrl } from "../../constants";
import { MoonLoader } from "react-spinners";
import { ThemeContext } from "../../Context/ThemeContext";
import { useConnections } from "../../Context/ConnectionProvider";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "0px 20px 15px 20px",
    // position: "relative",
    // width: "22%",
  },
  title: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 600,
    textAlign: "center",
    fontSize: "1.2rem",
    color: theme.palette.primary.main,
  },
}));

function SuggestedInvites() {
  const classes = useStyles();
  const history = useHistory();
  const { suggestions, setSuggestions } = useConnections();
  const [loading, setLoading] = useState(true);
  const { defaultTheme } = useContext(ThemeContext);

  useEffect(() => {
    fetch(kBaseUrl + "suggest_connection", {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => setSuggestions(data.slice(0, 2)))
      .then(() => setLoading(false))
      .catch((e) => console.log(e));
  }, []);

  const suggests = suggestions && suggestions.length !== 0 ? suggestions.slice(0, 2) : [];

  const handleSeemore = () => {
    history.push("/suggestedconnections");
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        styles={{ marginTop: "0px" }}
        className={classes.title}
        title="Suggested Invites"
      />
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        {loading ? (
          <MoonLoader
            size={30}
            color={defaultTheme === "dark" ? "#B6B6B6" : "#006BA6"}
            loading={loading}
          />
        ) : (
          <>
            {suggests && suggests.length !== 0 ? (
              suggests.map((suggestion) => (
                <Grid item key={suggestion.uid}>
                  <InviteCard suggested={true} data={suggestion} />
                </Grid>
              ))
            ) : (
              <Typography
                color="textSecondary"
                variant="h6"
                style={{ textAlign: "center" }}
              >
                No Suggested Invites!
              </Typography>
            )}
          </>
        )}
      </Grid>
      {/* {!loading && */}
      {suggests && suggests.length !== 0 && (
        <Grid container justify="flex-end">
          <Button color="primary" onClick={handleSeemore}>
            See more...
          </Button>
        </Grid>
      )}
    </Card>
  );
}

export default SuggestedInvites;
