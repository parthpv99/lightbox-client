import React, { useContext, useState } from "react";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Grid,
  makeStyles,
  Typography,
  withStyles,
} from "@material-ui/core";
import user from "../../assets/user.png";
import EditIcon from "@material-ui/icons/Edit";
import EditProfileDialog from "../ProfilePage/EditProfileDialog";
import { UserContext } from "../../Context/UserContext";
import { useConnections } from "../../Context/ConnectionProvider";
import { kBaseUrl } from "../../constants";
import { useToast } from "../../Context/ToastProvider";

const StyledBadge = withStyles((theme) => ({
  badge: {
    width: 25,
    height: 25,
    cursor: "pointer",
    borderRadius: "50%",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "15px 20px 15px 20px",
    [theme.breakpoints.up("sm")]: {
      position: "fixed",
      width: "22%",
    },
  },
  avatar: {
    width: 90,
    height: 90,
    border: `3px solid ${theme.palette.primary.main}`,
    backgroundColor: "transparent",
    // cursor: "pointer",
  },
  name: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    paddingBottom: 0,
    color: theme.palette.primary.main,
  },
  college: {
    fontSize: "1.1rem",
    fontWeight: 500,
    textAlign: "center",
  },
  text: {
    paddingBottom: 0,
    textAlign: "center",
  },
  // btn: {

  // },
}));

function UserDetailsCard({ self, data }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const { userProfile, setUserProfile } = useContext(UserContext);
  self && (data = userProfile);
  const {
    connections,
    invites,
    suggestions,
    setConnections,
    setInvites,
    setSuggestions,
  } = useConnections();
  const connect = connections && connections.find((connection) => connection.uid === data.uid);
  const invitation = invites && invites.find((invite) => invite.uid === data.uid);
  const suggestion = suggestions && suggestions.find((suggs) => suggs.uid === data.uid);
  const { setToast, setMessage, setMessageType } = useToast();
  const RequestMade = userProfile && userProfile.requestsMade.find((request) => request === data.uid);
  const requested = RequestMade && RequestMade.length > 0;

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleAcceptConnection = () => {
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
  };

  const handleRejectConnection = () => {
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
  };

  const handleMakeConnection = () => {
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
          let usr = { ...userProfile };
          usr["requestsMade"] = [...usr["requestsMade"], data.uid];
          setUserProfile(usr);
          setSuggestions(sgs);
          setToast(true);
          setMessage("Request Sent to " + data.fname + " " + data.lname);
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
  };

  return (
    <Card className={classes.card}>
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item>
          {self ? (
            <StyledBadge
              overlap="circle"
              badgeContent={
                <label onClick={handleClickOpen}>
                  <EditIcon fontSize="small" />
                </label>
              }
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <Avatar
                src={
                  userProfile && userProfile.thumbnail_pic !== ""
                    ? userProfile.thumbnail_pic
                    : user
                }
                alt="User Profile"
                aria-label="Name"
                className={classes.avatar}
              />
            </StyledBadge>
          ) : (
            <Avatar
              src={
                data && data.thumbnail_pic !== "" ? data.thumbnail_pic : user
              }
              alt="User Profile"
              aria-label="Name"
              className={classes.avatar}
            />
          )}
        </Grid>
        <Grid item>
          <Typography className={classes.name}>
            {data && data.fname + " " + data.lname}
          </Typography>
        </Grid>
        {!self && invitation && invitation.uid === data.uid ? (
          <Grid
            item
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={5}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.btn}
                onClick={handleAcceptConnection}
              >
                Accept
              </Button>
            </Grid>
            <Grid item xs={5}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.btn}
                onClick={handleRejectConnection}
              >
                Reject
              </Button>
            </Grid>
          </Grid>
        ) :
          (!self && <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Grid item xs={9}>
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.btn}
                onClick={
                  !requested && handleMakeConnection
                }
                disabled={connect && connect.uid === data.uid}
              >
                {connect && connect.uid === data.uid
                  ? `Connection`
                  : (suggestion && suggestion.uid === data.uid
                    ? `Create Connection`
                    : (requested ? (!self && `Requested`) : 'Create Connection'))}
              </Button>
            </Grid>
          </Grid>
          )}

        <Grid item>
          <Typography className={classes.text}>{data && data.title}</Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.text}>
            {data && data.branch + " Semester " + data.semester}
          </Typography>
        </Grid>
        <Grid item>
          <Typography className={classes.college}>
            {data && data.college}
          </Typography>
        </Grid>
      </Grid>
      <EditProfileDialog handleClickOpen={handleClickOpen} open={open} />
    </Card>
  );
}

export default UserDetailsCard;
