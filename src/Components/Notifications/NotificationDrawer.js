import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import MuiDialogContent from "@material-ui/core/DialogContent";
import { Box, Divider, Grid, IconButton, Tooltip, withStyles } from "@material-ui/core";
import { ThemeContext } from "../../Context/ThemeContext";
import user from "../../assets/user.png";
import NotifCard from "./NotifCard";
import { Close, ClearAll } from "@material-ui/icons";
import { useNotifications } from "../../Context/NotificationProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    width: 380,
  },
  divider: {
    backgroundColor: "#5F5F5F",
  },
  scroll: {
    height: 450,
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
      background: theme.palette.primary.main,
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#004A74",
      cursor: "pointer",
    },
  }
}));

export default function NotificationDrawer({
  id,
  open,
  anchorEl,
  handleClose,
  handleClearAll,
}) {
  const classes = useStyles();
  const { defaultTheme } = useContext(ThemeContext);
  const { notifications } = useNotifications();

  return (
    <div>
      {/* <Button aria-describedby={id} variant="contained" color="primary" onClick={handleClick}>
        Open Popover
      </Button> */}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div className={classes.root}>
          <div>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={8}>
                <Typography
                  color={defaultTheme === "dark" ? "secondary" : "primary"}
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                >
                  Notifications
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}
                container
                direction="row"
                justify="space-around"
              >
                <Grid item xs={1}>
                  <Tooltip title="Mark All as Read">
                    <IconButton color="inherit" onClick={handleClearAll}>
                      <ClearAll />
                    </IconButton>
                  </Tooltip>
                </Grid>
                <Grid item xs={1}>
                  <Tooltip title="Close">
                    <IconButton color="inherit" onClick={handleClose}>
                      <Close />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Grid>
            <Divider className={classes.divider} />
          </div>
          <Box className={classes.scroll}>
            {notifications && notifications.length > 0 ? (
              notifications &&
              notifications.map((notification) => (
                <NotifCard
                  photo={
                    notification.thumbnail_pic !== ""
                      ? notification.thumbnail_pic
                      : user
                  }
                  message={notification.message}
                  read={!notification.is_unread}
                  url={notification.url}
                  key={notification._id}
                  _id={notification._id}
                  receiver={notification.receiver}
                  handleClose={handleClose}
                />
              ))
            ) : (
              <Typography color="textSecondary">
                No new notifications
              </Typography>
            )}
            {/* <NotifCard
              photo={user}
              name="Dishang Patel"
              message="is now a Connection."
            />
            <NotifCard
              photo={user}
              name="Dishang Patel"
              message="is now a Connection."
            />
            <NotifCard
              photo={user}
              name="Dishang Patel"
              message="is now a Connection."
            />
            <NotifCard
              photo={user}
              name="Dishang Patel"
              message="is now a Connection."
            />
            <NotifCard
              photo={user}
              name="Dishang Patel"
              message="is now a Connection."
            />
            <NotifCard
              photo={user}
              name="Dishang Patel"
              message="is now a Connection."
            />
            <NotifCard
              photo={user}
              name="Dishang Patel"
              message="is now a Connection."
            />
            <NotifCard
              photo={user}
              name="Dishang Patel"
              message="is now a Connection."
            />
            <NotifCard
              photo={user}
              name="Dishang Patel"
              message="is now a Connection."
            />
            <NotifCard
              photo={user}
              name="Dishang Patel"
              message="is now a Connection."
            />
            <NotifCard
              photo={user}
              name="Dishang Patel"
              message="is now a Connection."
            /> */}
          </Box>
        </div>
      </Popover>
    </div>
  );
}
