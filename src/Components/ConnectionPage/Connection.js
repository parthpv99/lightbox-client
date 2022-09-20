import React, { useContext, useState } from "react";
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
import { useHistory } from "react-router-dom";
import { useConnections } from "../../Context/ConnectionProvider";
import { useToast } from "../../Context/ToastProvider";
import { UserContext } from "../../Context/UserContext";

const useStyle = makeStyles((theme) => ({
  btn: {
    color: theme.palette.primary.main,
  },
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
    width: "100%",
    background: fade(theme.palette.secondary.main, 0.15),
    border: `1px solid ${theme.palette.primary.main}`,
    [theme.breakpoints.down("sm")]: {
      padding: 5,
    },
  },
}));

const Connection = ({ data, suggested, invite, photo, search }) => {
  const classes = useStyle();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [sent, setSent] = useState(false);
  const history = useHistory();
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

  const handleTop = () => {
    if (invite) {
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
            setConnections([...connections, data]);
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
    } else if (suggested) {
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
        .then(async (res) => {
          if (res.status === 200) {
            const msg = await res.json();
            if (msg.message === "Request made successfully") {
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
            }
            else {
              setToast(true);
              setMessage("Request already sent to " + data.fname + " " + data.lname);
              setMessageType("warning");
            }
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
      console.log("Chat Functionality!");
    }
  };

  const handleBottom = () => {
    if (invite) {
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
    } else if (suggested) {
      console.log("Suggestion Removed!");
    } else {
      fetch(kBaseUrl + "remove_connection", {
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
            const cnc = connections.filter(
              (connection) => connection.uid !== data.uid
            );
            setConnections(cnc);
            setToast(true);
            setMessage(
              data.fname + " " + data.lname + " is Removed from connections"
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

  const handleViewProfile = () => {
    // console.log("/connections/" + uid);
    history.push("/connections/" + data.uid);
  };

  return (
    <Card variant="outlined" className={classes.card}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignContent="space-around"
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
            style={{ width: !matches && 150 }}
          >
            <Typography variant="h6" style={{ width: "90%" }} noWrap={true}>
              {data.fname + " " + data.lname}
            </Typography>
            <Typography
              variant="body2"
              noWrap={true}
              style={{ fontSize: "1rem", width: "90%" }}
            >
              {data.title}
            </Typography>
            <Typography variant="body2" style={{ fontSize: "0.9rem", width: "90%" }} noWrap={true}>
              {data.branch}
            </Typography>
            <Typography variant="body2" style={{ fontSize: "0.9rem" }}>
              {"Semester " + data.semester}
            </Typography>
          </Grid>
        </Grid>
        {!search && (
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
        )}
      </Grid>
    </Card>
  );
};

export default Connection;
