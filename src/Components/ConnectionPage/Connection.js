import React, { useState } from "react";
import {
  Card,
  Grid,
  Typography,
  Avatar,
  makeStyles,
  IconButton,
  useMediaQuery,
  fade,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import ChatIcon from "@material-ui/icons/Chat";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import { CheckCircle, Cancel, Block } from "@material-ui/icons";
import { kBaseUrl } from "../../constants";
import ViewProfileDialog from "../ViewProfile/ViewProfileDialog";

const useStyle = makeStyles((theme) => ({
  btn: {
    color: theme.palette.primary.main,
  },
  // acceptbtn: {
  //   color: "#fff",
  //   background: "#01c15b",
  //   "&:hover": {
  //     background: "#009926",
  //   },
  // },

  avatar: {
    width: "85%",
    height: "85%",
    marginLeft: 5,
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: "transparent",
    [theme.breakpoints.down("sm")]: {
      width: 65,
      height: 65,
    },
  },
  card: {
    padding: 8,
    boxShadow: theme.shadows[1],
    background: fade(theme.palette.secondary.main, 0.15),
    border: `1px solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down("sm")]: {
      padding: 5,
    },
  },
}));

const Connection = ({
  uid,
  photo,
  name,
  role,
  semester,
  branch,
  suggested,
  invite,
}) => {
  const classes = useStyle();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [sent, setSent] = useState(false);
  const [viewProfile, setViewProfile] = React.useState(false);

  const handleTop = () => {
    if (invite) {
      fetch(kBaseUrl + "accept_connection", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          uid,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data.message))
        .catch((e) => console.log(e));
    } else if (suggested) {
      fetch(kBaseUrl + "make_connection_request", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          uid,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data.message))
        .then(setSent(true))
        .catch((e) => console.log(e));
    } else {
      fetch(kBaseUrl + "remove_connection", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          uid,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data.message))
        .catch((e) => console.log(e));
    }
  };

  const handleBottom = () => {
    if (invite) {
      fetch(kBaseUrl + "reject_connection_request", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          uid,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data.message))
        .catch((e) => console.log(e));
    } else if (suggested) {
      console.log("Suggestion Removed!");
    } else {
      fetch(kBaseUrl + "remove_connection", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          uid,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data.message))
        .catch((e) => console.log(e));
    }
  };

  const handleViewProfile = () => {
    setViewProfile(!viewProfile);
  };

  return (
    <Card variant="outlined" className={classes.card}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item xs={matches && 3}>
          <Avatar
            src={photo}
            alt="N"
            aria-label="Name"
            className={classes.avatar}
          />
        </Grid>
        <Grid
          item
          xs={matches && 8}
          style={{ cursor: "pointer" }}
          onClick={handleViewProfile}
        >
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="flex-start"
          >
            <Typography variant="h6" noWrap={true}>
              {name}
            </Typography>
            <Typography
              variant="body2"
              noWrap={true}
              style={{ fontSize: "1rem", width: "90%" }}
            >
              {role}
            </Typography>
            <Typography variant="body2" style={{ fontSize: "0.9rem" }}>
              {branch}
            </Typography>
            <Typography variant="body2" style={{ fontSize: "0.9rem" }}>
              {"Semester " + semester}
            </Typography>
            <ViewProfileDialog
              setOpen={handleViewProfile}
              open={viewProfile}
              uid={uid}
            />
          </Grid>
        </Grid>
        <Grid item xs={matches && 1}>
          <Grid
            container
            direction="column"
            alignItems="center"
            justify="center"
          >
            <Grid item>
              <IconButton
                color="primary"
                size="small"
                variant="outlined"
                className={classes.btn}
                onClick={handleTop}
              >
                {invite ? (
                  <CheckCircle />
                ) : suggested ? (
                  sent ? (
                    <PersonAddDisabledIcon />
                  ) : (
                    <PersonAddIcon />
                  )
                ) : (
                  <ChatIcon />
                )}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                color="primary"
                size="small"
                variant="outlined"
                className={classes.btn}
                onClick={handleBottom}
              >
                {invite ? <Cancel /> : suggested ? <Block /> : <DeleteIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {/* <Avatar className={classes.avatar} src={photo} title={name} />
      <CardContent>
        <Typography className={classes.name}>{name}</Typography>
        <Typography className={classes.role}>{role}</Typography>
        {/* <Typography className={classes.sem}> Sem {semester} </Typography> 
        <Typography className={classes.branch}>{branch}</Typography>
        <Typography className={classes.count}>
          {count} mutual friends{" "}
        </Typography>
      </CardContent>
      <CardActions>
        <Grid
          container
          direction="row"
          alignItem="center"
          justify="space-evenly"
        >
          <Grid>
            {" "}
            <Button color="primary" variant="outlined" className={classes.btn}>
              <ChatOutlinedIcon />
            </Button>{" "}
          </Grid>
          <Grid>
            {" "}
            <Button color="primary" variant="outlined" className={classes.btn}>
              <DeleteIcon />
            </Button>
          </Grid>
        </Grid>
      </CardActions> */}
    </Card>
  );
};

export default Connection;
