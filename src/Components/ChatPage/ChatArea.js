import {
  Box,
  Card,
  fade,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
import { UserContext } from "../../Context/UserContext";
import { formatAMPM, getDate } from "../../utility";
import chatimage from "../../assets/chat.png";
import chatimagedark from "../../assets/chatdark.png";
import ReactLinkify from "react-linkify";

const useStyles = makeStyles((theme) => ({
  chatArea: {
    height: "445px",
    padding: 8,
    maxHeight: "480px",
    overflowY: "auto",
    width: "100%",
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
      background: fade(theme.palette.primary.main, 0.8),
      cursor: "pointer",
    },
  },
  sent: {
    margin: 5,
    padding: "8px 8px 2px 15px",
    background:
      localStorage.getItem("dark-theme") !== "true"
        ? fade(theme.palette.success.main, 0.2)
        : fade(theme.palette.success.main, 0.5),
    borderRadius: "10px 0px 10px 10px",
    textAlign: "justify",
    textJustify: "inter-word",
    maxWidth: "450px",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "300px"
    }
  },
  receiver_name: {
    marginLeft: 5,
    fontSize: 12,
    fontWeight: "bold"
  },
  time: {
    textAlign: "right",
    fontSize: 10,
    fontWeight: 5,
    // fontStyle: "italic",
    marginRight: 5,
    marginTop: 2,
  },
  date: {
    fontSize: 11,
    padding: 3,
    background:
      localStorage.getItem("dark-theme") !== "true"
        ? fade(theme.palette.warning.main, 0.2)
        : fade(theme.palette.warning.main, 0.5),
  },
  received: {
    margin: "2px 5px 5px 5px",
    padding: "8px 15px 2px 8px",
    background:
      localStorage.getItem("dark-theme") !== "true"
        ? fade(theme.palette.info.main, 0.2)
        : fade(theme.palette.info.main, 0.5),
    borderRadius: "0px 10px 10px 10px",
    maxWidth: "450px",
    textAlign: "justify",
    textJustify: "inter-word",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "300px"
    }
  },
  msg: {
    marginTop: 5,
  },
  chatimage: {
    maxWidth: "80%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "100%",
    }
  }
}));

function ChatArea({ chats }) {
  const classes = useStyles();
  const { userProfile } = useContext(UserContext);
  const bottomRef = useRef();
  const { defaultTheme } = useContext(ThemeContext);

  const scrollToBottom = () => {
    bottomRef.current.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  return (
    <Box component="div" className={classes.chatArea}>
      <Grid container direction="column">
        <Grid item xs={12}>
          {chats && chats.length !== 0 ? (
            chats.map((chat, index) => (
              <div key={index}>
                {chat.user_id === userProfile.uid ? (
                  <Grid container direction="row" justify="flex-end">
                    <Grid item className={classes.msg}>
                      <Card className={classes.sent}>
                        <ReactLinkify properties={{ target: '_blank', style: { color: defaultTheme === 'dark' ? '#0496FF' : '#006BA6' } }} >
                          {chat.message}
                        </ReactLinkify>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          className={classes.time}
                        >
                          {formatAMPM(chat.timestamps)}
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid item container direction="row" justify="flex-start">
                    <Grid item className={classes.msg}>
                      <Typography
                        variant="body1"
                        color="textSecondary"
                        className={classes.receiver_name}
                      >
                        {chat.name}
                      </Typography>
                      <Card className={classes.received}>
                        <ReactLinkify properties={{ target: '_blank', style: { color: defaultTheme === 'dark' ? '#0496FF' : '#006BA6' } }} >
                          {chat.message}
                        </ReactLinkify>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          className={classes.time}
                        >
                          {formatAMPM(chat.timestamps)}
                        </Typography>
                      </Card>
                    </Grid>
                  </Grid>
                )}
              </div>
            ))
          ) : (
            <Grid container direction="column" justify="center">
              <Typography
                variant="body1"
                color="textSecondary"
                style={{ textAlign: "center", fontSize: 25 }}
              >
                Send A Message to start Conversation.
                </Typography>
              <img src={defaultTheme === "dark" ? chatimagedark : chatimage} className={classes.chatimage} alt="Chat Image" />
            </Grid>
          )}
          <div ref={bottomRef}></div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ChatArea;
