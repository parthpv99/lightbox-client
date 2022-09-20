import {
  Avatar,
  Card,
  fade,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import user from "../../assets/user.png";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import BlockIcon from "@material-ui/icons/Block";
import { ThemeContext } from "../../Context/ThemeContext";
import clsx from "clsx";
import { kBaseUrl } from "../../constants";
import { useConnections } from "../../Context/ConnectionProvider";
import { useToast } from "../../Context/ToastProvider";
import { UserContext } from "../../Context/UserContext";

const useStyles = makeStyles((theme) => ({
  acceptbtn: {
    color: "#fff",
    // width: "90%",
    // height: "90%",
    background: "#01c15b",
    "&:hover": {
      background: "#009926",
    },
  },
  rejectbtn: {
    color: "#fff",
    // width: "90%",
    // height: "90%",
    background: "#bf011e",
    "&:hover": {
      background: "#9b0017",
    },
  },
  avatar: {
    width: "85%",
    height: "85%",
    border: `2px solid ${theme.palette.primary.main}`,
    backgroundColor: "transparent",
  },
  card: {
    background: theme.palette.secondary.main,
    boxShadow: theme.shadows[1],
    padding: 8,
    borderRadius: 5,
  },
  darkCard: {
    background: fade(theme.palette.secondary.main, 0.2),
    boxShadow: theme.shadows[1],
    padding: 8,
    borderRadius: 5,
  },
  send: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  sent: {
    transform: "rotate(45deg)",
  },
}));

const InviteCard = ({ suggested, data }) => {
  const classes = useStyles();
  const { defaultTheme } = useContext(ThemeContext);
  const [sent, setSent] = useState(false);
  const {
    connections,
    setConnections,
    invites,
    setInvites,
    suggestions,
    setSuggestions,
  } = useConnections();
  const { setToast, setMessage, setMessageType } = useToast();
  const { userProfile, setUserProfile } = useContext(UserContext);

  const handleAccept = () => {
    if (suggested) {
      fetch(kBaseUrl + "make_connection_request", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify({
          uid: data.uid,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            const sgs = suggestions.filter(
              (suggestion) => suggestion.uid !== data.uid
            );
            setSuggestions(sgs);
            let usr = { ...userProfile };
            usr["requestsMade"] = [...usr["requestsMade"], data.uid];
            setUserProfile(usr);
            setToast(true);
            setMessage("Request Sent to " + data.fname + " " + data.lname);
            setMessageType("info");
          } else {
            setToast(true);
            setMessage("Something Went Wrong!");
            setMessageType("error");
          }
        })
        .then(setSent(true))
        .catch(() => {
          setToast(true);
          setMessage("Something Went Wrong!");
          setMessageType("error");
        });
    } else {
      fetch(kBaseUrl + "accept_connection", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify({
          uid: data.uid,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            setConnections([data, ...connections]);
            const inv = invites.filter((invite) => invite.uid !== data.uid);
            setInvites(inv);
            setToast(true);
            setMessage(
              data.fname + " " + data.lname + " is added to your connection"
            );
            setMessageType("info");
          } else {
            setToast(true);
            setMessage("Something Went Wrong!");
            setMessageType("error");
          }
        })
        .catch(() => {
          setToast(true);
          setMessage("Something Went Wrong!");
          setMessageType("error");
        });
    }
  };

  const handleReject = () => {
    if (suggested) {
      console.log("Suggestion Removed!");
    } else {
      fetch(kBaseUrl + "reject_connection_request", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
        },
        body: JSON.stringify({
          uid: data.uid,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            const inv = invites.filter((invite) => invite.uid !== data.uid);
            setInvites(inv);
            setToast(true);
            setMessage(
              "Request from " + data.fname + " " + data.lname + " is Rejected"
            );
            setMessageType("info");
          } else {
            setToast(true);
            setMessage("Something Went Wrong!");
            setMessageType("error");
          }
        })
        .catch(() => {
          setToast(true);
          setMessage("Something Went Wrong!");
          setMessageType("error");
        });
    }
  };

  return (
    <Card className={defaultTheme === "dark" ? classes.darkCard : classes.card}>
      <Grid container alignItems="center" justify="space-between">
        <Grid item xs={3}>
          <Avatar
            src={data.thumbnail_pic !== "" ? data.thumbnail_pic : user}
            alt="N"
            aria-label="Name"
            className={classes.avatar}
          />
        </Grid>
        <Grid item xs={6}>
          <Grid
            container
            justify="center"
            direction="column"
            alignItems="flex-start"
            style={{ width: 120 }}
          >
            <Typography
              variant="h6"
              noWrap={true}
              style={{ fontSize: "1 rem", width: "95%" }}
            >
              {data.fname + " " + data.lname}
            </Typography>
            <Typography
              variant="body2"
              noWrap={true}
              style={{ fontSize: "0.8rem", width: "95%" }}
            >
              {data.title}
            </Typography>
            <Typography variant="body2" style={{ fontSize: "0.7rem" }}>
              {data.branch + " Sem " + data.semester}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="center"
            spacing={1}
          >
            <Grid item>
              <IconButton
                size="small"
                variant="outlined"
                className={classes.acceptbtn}
                onClick={handleAccept}
              >
                {suggested ? (
                  <AddIcon
                    fontSize="small"
                    className={clsx(classes.send, {
                      [classes.sent]: sent,
                    })}
                  />
                ) : (
                  <CheckIcon fontSize="small" />
                )}
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                size="small"
                variant="outlined"
                className={classes.rejectbtn}
                onClick={handleReject}
              >
                {suggested ? (
                  <BlockIcon fontSize="small" />
                ) : (
                  <CloseIcon fontSize="small" />
                )}
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default InviteCard;
