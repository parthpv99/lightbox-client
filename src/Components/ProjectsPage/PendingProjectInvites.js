import {
  Button,
  Card,
  CardHeader,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { kBaseUrl } from "../../constants";
import { useProjectRequests } from "../../Context/ProjectRequestProvider";
import { ThemeContext } from "../../Context/ThemeContext";
import { useToast } from "../../Context/ToastProvider";
import ProjectInviteCard from "./ProjectInviteCard";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "0px 20px 15px 20px",
    position: "fixed",
    width: "22%",
  },
  cardMax: {
    padding: "0px 20px 15px 20px",
    position: "fixed",
    width: "22%",
    maxHeight: "82%",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.6rem",
    },
    "&::-webkit-scrollbar-track:hover": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      background: "rgba(180,180,180,0.2)",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      // backgroundColor: "rgba(0,0,0,.1)",
      // outline: "1px solid slategrey",
      // background: "#B4B4B4",
      background: theme.palette.primary.main,
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      // background: "#A3A3A3",
      background: theme.palette.text.secondary,
      cursor: "pointer",
    },
  },
  title: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 600,
    textAlign: "center",
    fontSize: "1.2rem",
    color: theme.palette.primary.main,
  },
}));

function PendingProjectInvites() {
  const classes = useStyles();
  const { requests, setRequests } = useProjectRequests();
  const [see, setSee] = useState(false);
  const [allRequest, setAllRequest] = useState([]);
  const [loading, setloading] = useState(true);
  const { defaultTheme } = useContext(ThemeContext);
  const { messageType } = useToast();

  useEffect(() => {
    fetch(kBaseUrl + "project_requests", {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setAllRequest(data);
        setRequests(data.slice(0, 2));
      })
      .then(() => setloading(false))
      .catch((e) => console.log(e));
  }, [messageType]);

  const handleSeeMore = () => {
    setSee(!see);
    setRequests(requests.length > 2 ? allRequest.slice(0, 2) : allRequest);
  };

  return (
    <Card className={see ? classes.cardMax : classes.card}>
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
        {/* <Grid item>
          <ProjectInviteCard />
        </Grid>
        <Grid item>
          <ProjectInviteCard />
        </Grid>
      </Grid> */}
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
            {requests.length !== 0 ? (
              requests.map((request) => (
                <Grid item key={request.rid}>
                  <ProjectInviteCard data={request} />
                </Grid>
              ))
            ) : (
              <Typography
                color="textSecondary"
                variant="h6"
                style={{ textAlign: "center" }}
              >
                No pending requests!
              </Typography>
            )}
          </>
        )}
      </Grid>
      {/* {!loading && invites.length !== 0 && ( */}
      <Grid container justify="flex-end">
        <Button color="primary" onClick={handleSeeMore}>
          {requests.length !== 0 && (see ? `See less...` : `See more...`)}
        </Button>
      </Grid>
      {/* )} */}
    </Card>
  );
}

export default PendingProjectInvites;
