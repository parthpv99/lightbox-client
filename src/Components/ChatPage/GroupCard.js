import { Badge, Card, fade, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useSocket } from "../../Context/SocketProvider";
import { ThemeContext } from "../../Context/ThemeContext";
import { useChats } from "../../Context/ChatsProvider";

const useStyles = makeStyles((theme) => ({
  card: {
    // background: theme.palette.secondary.main,
    boxShadow: theme.shadows[0],
    cursor: "pointer",
    padding: 8,
    borderRadius: 0,
    borderBottom: "1px solid rgba(0,0,0,0.5)",
    "&:hover": {
      background: fade(theme.palette.primary.main, 0.1),
    },
  },
  activeCard: {
    background: theme.palette.secondary.main,
    boxShadow: theme.shadows[1],
    cursor: "pointer",
    padding: 8,
    borderRadius: 0,
    "&:hover": {
      background: fade(theme.palette.primary.main, 0.1),
    },
  },
  activeDarkCard: {
    background: fade(theme.palette.secondary.main, 0.2),
    boxShadow: theme.shadows[1],
    cursor: "pointer",
    padding: 8,
    borderRadius: 0,
    "&:hover": {
      background: fade(theme.palette.secondary.main, 0.2),
    },
  },
  darkCard: {
    // background: fade(theme.palette.secondary.main, 0.2),
    boxShadow: theme.shadows[0],
    cursor: "pointer",
    padding: 8,
    borderRadius: 0,
    borderBottom: "1px solid white",
    "&:hover": {
      background: fade(theme.palette.secondary.main, 0.2),
    },
  },
}));

function GroupCard({ data, setId, setTitle, activeId }) {
  const classes = useStyles();
  const { defaultTheme } = useContext(ThemeContext);
  const [active, setActive] = useState(false);
  const socket = useSocket();
  const { count, setCount } = useChats();

  const handleGetMessages = () => {
    setTitle(data.project_title);
    setId(data._id);
    setActive(true);
    let dt = { ...count };
    dt[`${data._id}`] = undefined;
    setCount(dt);
  };

  return (
    <Card
      className={
        active && (activeId === data._id)
          ? defaultTheme === "dark"
            ? classes.activeDarkCard
            : classes.activeCard
          : defaultTheme === "dark"
            ? classes.darkCard
            : classes.card
      }
      onClick={handleGetMessages}
    >
      <Grid container direction="row" justify="space-around" alignItems="center">
        <Grid
          item
          xs={10}
          container
          justify="center"
          direction="column"
          alignItems="flex-start"
        >
          <Typography
            variant="h6"
            noWrap={true}
            style={{ fontSize: "1 rem", width: "95%" }}
          >
            {data.project_title}
          </Typography>
          <Typography
            variant="body2"
            noWrap={true}
            style={{ fontSize: "0.8rem", width: "95%" }}
          >
            {data && data.project_members.length === 0
              ? `1 member`
              : `${data.project_members.length + 1} members`}
          </Typography>
        </Grid>
        <Grid item>
          <Badge badgeContent={!activeId ? count[data._id] : undefined} max={9} color="primary" />
        </Grid>
      </Grid>
    </Card>
  );
}

export default GroupCard;
