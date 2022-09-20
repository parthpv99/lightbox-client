import {
  Avatar,
  Card,
  fade,
  Grid,
  IconButton,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import user from "../../assets/user.png";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";
// import AddIcon from "@material-ui/icons/Add";
// import BlockIcon from "@material-ui/icons/Block";
import { ThemeContext } from "../../Context/ThemeContext";
// import clsx from "clsx";
import { kBaseUrl } from "../../constants";
import { useProjectRequests } from "../../Context/ProjectRequestProvider";
import { useToast } from "../../Context/ToastProvider";

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

const ProjectInviteCard = ({ data }) => {
  const classes = useStyles();
  const { defaultTheme } = useContext(ThemeContext);
  const { requests, setRequests } = useProjectRequests();
  const { setToast, setMessage, setMessageType } = useToast();

  const handleAccept = () => {
    fetch(kBaseUrl + "accept_user", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({
        uid: data._id,
        _id: data.project_id,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          const inv = requests.filter((request) => request.rid !== data.rid);
          setRequests(inv);
          setToast(true);
          setMessage(
            data.fname +
            " " +
            data.lname +
            " joined Project " +
            data.project_title
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

  const handleReject = () => {
    fetch(kBaseUrl + "reject_user", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({
        uid: data._id,
        _id: data.project_id,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          const inv = requests.filter((request) => request._id !== data._id);
          setRequests(inv);
          setToast(true);
          setMessage(
            "Request of " +
            data.fname +
            " " +
            data.lname +
            " is Rejected for Project " +
            data.project_title
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
              {/* Project Title */}
              {data.project_title}
            </Typography>
            <Typography
              variant="body2"
              noWrap={true}
              style={{ fontSize: "0.8rem", width: "95%" }}
            >
              {/* Dishang Patel */}
              {data.fname + " " + data.lname}
            </Typography>
            <Typography noWrap={true} variant="body2" style={{ fontSize: "0.7rem", width: "95%" }}>
              {/* NodeJS Developer */}
              {data.title}
            </Typography>
            <Typography variant="body2" style={{ fontSize: "0.7rem" }}>
              {/* 3 members */}
              {data.count + " members"}
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
                <CheckIcon fontSize="small" />
              </IconButton>
            </Grid>
            <Grid item>
              <IconButton
                size="small"
                variant="outlined"
                className={classes.rejectbtn}
                onClick={handleReject}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProjectInviteCard;
