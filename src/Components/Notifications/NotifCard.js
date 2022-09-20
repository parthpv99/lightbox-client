import React from "react";
import { Avatar, Card, fade, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { kBaseUrl } from "../../constants";
import { useHistory } from "react-router-dom";
import { useNotifications } from "../../Context/NotificationProvider";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 40,
    height: 40,
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: "transparent",
  },
  card: {
    cursor: "pointer",
    margin: 5,
    padding: theme.spacing(2),
    background:
      localStorage.getItem("dark-theme") === "true"
        ? fade(theme.palette.secondary.main, 0.2)
        : fade(theme.palette.primary.main, 0.1),
    boxShadow: theme.shadows[1],
    borderRadius: 5,
    "&:hover": {
      background:
        localStorage.getItem("dark-theme") === "true"
          ? fade(theme.palette.secondary.main, 0.1)
          : fade(theme.palette.primary.main, 0.15),
    },
  },
  read: {
    cursor: "pointer",
    margin: 5,
    padding: theme.spacing(2),
    background:
      localStorage.getItem("dark-theme") === "true"
        ? fade(theme.palette.secondary.main, 0.05)
        : theme.palette.secondary.main,
    boxShadow: theme.shadows[1],
    borderRadius: 5,
    "&:hover": {
      background:
        localStorage.getItem("dark-theme") === "true"
          ? fade(theme.palette.secondary.main, 0.02)
          : fade(theme.palette.primary.main, 0.05),
    },
  },
}));

function NotifCard({ photo, message, read, url, receiver, _id, handleClose }) {
  const classes = useStyles();
  const history = useHistory();
  const {
    notifications,
    setNotifications,
    notifCount,
    setNotifCount,
  } = useNotifications();
  const onClick = () => {
    // console.log(url);
    if (read) {
      handleClose();
      history.push(url);
    } else {
      fetch(kBaseUrl + "mark_as_read", {
        credentials: "include",
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify({
          receiver: receiver,
          _id: _id,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          let notifs = notifications;
          for (let i = 0; i < notifs.length; i++) {
            if (notifs[i]._id === _id) {
              notifs[i].is_unread = false;
            }
          }
          setNotifications(notifs);
          setNotifCount(notifCount - 1);
          handleClose();
          history.push(url);
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <Card className={read ? classes.read : classes.card} onClick={onClick}>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={2}>
          <Avatar
            src={photo}
            alt="N"
            aria-label="Name"
            className={classes.avatar}
          />
        </Grid>
        <Grid item xs={10} container direction="column">
          <Typography variant="body1">{message}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

export default NotifCard;
