import { Box, Grid, Typography, useMediaQuery } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { kBaseUrl } from "../../constants";
import { useChats } from "../../Context/ChatsProvider";
import QuickAccessCard from "../QuickAccess/QuickAccessCard";
import ChatBox from "./ChatBox";
import ChatGroupsCard from "./ChatGroupsCard";
import MobileChat from "./MobileChat";

const ChatPage = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [id, setId] = useState("");
  const [title, setTitle] = useState();
  const { chats, setChats } = useChats();

  const setProjectId = (id) => {
    setId(id);
  };
  const setProjectTitle = (title) => {
    setTitle(title);
  };

  return (
    <Box my={matches ? 10 : 15} mx={matches ? 3 : 0}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignContent="center"
      >
        {matches && (
          <Grid item xs={3}>
            <ChatGroupsCard setId={setProjectId} setTitle={setProjectTitle} activeId={id} />
          </Grid>
        )}
        <Grid item xs={matches ? 6 : 12}>
          {matches ? (id && title !== "" ? (
            <ChatBox id={id} title={title} chats={chats} setChats={setChats} />
          ) : (
            <Typography
              variant="body1"
              color="textSecondary"
              style={{ textAlign: "center", fontSize: 25 }}
            >
              Select a Project to start Chat
            </Typography>
          )) : <MobileChat chats={chats} setChats={setChats} />}
        </Grid>
        {matches && (
          <Grid item xs={3}>
            <QuickAccessCard />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ChatPage;
