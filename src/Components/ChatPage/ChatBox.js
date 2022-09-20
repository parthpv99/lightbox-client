import {
  Box,
  Card,
  CardHeader,
  Divider,
  fade,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { Send } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { kBaseUrl } from "../../constants";
import { useSocket } from "../../Context/SocketProvider";
import { ThemeContext } from "../../Context/ThemeContext";
import { UserContext } from "../../Context/UserContext";
import ChatArea from "./ChatArea";
import validate from "../../validate/validateChat";
import useForm from "../../hooks/useForm";

const useStyles = makeStyles((theme) => ({
  card: {
    // padding: "0px 20px 15px 20px",
    // position: "fixed",
    // width: "22%",
  },
  title: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 600,
    textAlign: "center",
    fontSize: "1.2rem",
    color: theme.palette.primary.main,
    background: fade(theme.palette.secondary.main, 0.1),
    borderBottom:
      localStorage.getItem("dark-theme") !== "true"
        ? `0.5px solid ${fade(theme.palette.text.primary, 0.2)}`
        : `1px solid ${theme.palette.secondary.main}`,
    // position: "fixed",
  },
  chatArea: {
    height: "445px",
    padding: 8,
    maxHeight: "480px",
    overflowY: "auto",
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
  messageField: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    borderTop:
      localStorage.getItem("dark-theme") !== "true"
        ? `0.5px solid ${fade(theme.palette.text.primary, 0.2)}`
        : `1px solid ${theme.palette.secondary.main}`,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    backgroundColor: "#5F5F5F",
    height: 28,
    margin: 4,
  },
  sent: {
    margin: 5,
    padding: "8px 8px 8px 15px",
    background:
      localStorage.getItem("dark-theme") !== "true"
        ? fade(theme.palette.success.main, 0.2)
        : fade(theme.palette.success.main, 0.5),
    borderRadius: "10px 0px 10px 10px",
    textAlign: "justify",
    textJustify: "inter-word",
    maxWidth: "450px",
  },
  receiver_name: {
    marginLeft: 5,
    fontSize: 12,
  },
  time: {
    textAlign: "right",
    fontSize: 11,
    marginRight: 5,
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
    margin: 5,
    padding: "8px 15px 8px 8px",
    background:
      localStorage.getItem("dark-theme") !== "true"
        ? fade(theme.palette.info.main, 0.2)
        : fade(theme.palette.info.main, 0.5),
    borderRadius: "0px 10px 10px 10px",
    maxWidth: "450px",
    textAlign: "justify",
    textJustify: "inter-word",
  },
}));

function ChatBox({ id, title, chats, setChats }) {
  const classes = useStyles();
  const [messagetext, setMessageText] = useState(false);
  const socket = useSocket();
  const { userProfile } = useContext(UserContext);
  // const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const { defaultTheme } = useContext(ThemeContext);
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  // useEffect(() => {
  //   fetch(kBaseUrl + "get_messages", {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       pid: id,
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setChats(data.msgs);
  //       setLoading(false);
  //     });
  // }, [id]);
  const chatData = {
    chat: "",
  };

  const handleSendMessage = () => {
    socket.emit("sendMessage", {
      msg: values.chat,
      pid: id,
      uid: userProfile.uid,
      user_name: `${userProfile.fname} ${userProfile.lname}`,
    });
    var newChat = {
      message: values.chat,
      name: `${userProfile.fname} ${userProfile.lname}`,
      user_id: userProfile.uid,
      timestamps: new Date(),
    };
    let ct = { ...chats };
    ct[id] = [...ct[id], newChat];
    setChats(ct);
    setMessageText(true);
    // chats ? setChats({[...chats, newChat]}) : setChats([newChat]);
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    handleSendMessage,
    validate,
    chatData,
    chatData
  );



  if (messagetext) {
    values.chat = "";
    setMessageText(false);
  }

  socket.on("recieveMessage", (data) => {
    let cts = { ...chats };
    cts[data.room] = cts[data.room] && (cts[data.room].length !== 0 ? [...cts[data.room], data] : [data]);
    setChats(cts);
  });

  if (errors.chat !== "") {
    setTimeout(() => {
      errors.chat = "";
    }, 1000);
  }

  return (
    <Box style={{ alignItems: "center", width: "100%" }}>
      <Card className={classes.card}>
        {matches && <CardHeader
          styles={{ marginTop: "0px" }}
          className={classes.title}
          title={title}
        />}
        {/* Chat Area */}
        {loading ? (
          <Grid container direction="row" justify="center">
            <MoonLoader
              size={40}
              color={defaultTheme === "dark" ? "#B6B6B6" : "#006BA6"}
              loading={loading}
            />
          </Grid>
        ) : (
          <ChatArea chats={chats[id]} />
        )}
        {/* Message BOX */}
        {errors.chat && (
          <Typography
            variant="body1"
            color="error"
            style={{ margin: "0 8px" }}
          >
            {errors.chat}
          </Typography>
        )}
        <Paper component="form" onSubmit={handleSubmit} className={classes.messageField}>
          <InputBase
            name="chat"
            className={classes.input}
            placeholder="Type here..."
            value={messagetext ? "" : values.chat}
            inputProps={{ "aria-label": "type here..." }}
            onChange={handleChange}
          />
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton
            color="primary"
            className={classes.iconButton}
            aria-label="directions"
            type="submit"
          >
            <Send />
          </IconButton>
        </Paper>
      </Card>
    </Box>
  );
}

export default ChatBox;
