import React, { useContext, useEffect, useState } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import {
  ThemeProvider,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Badge,
  useMediaQuery,
  Grid,
  Box,
  Switch,
  InputBase,
  Paper,
  Tooltip,
} from "@material-ui/core";
// import InputBase from "@material-ui/core/InputBase";
import NotificationDrawer from "../Notifications/NotificationDrawer";
import { kBaseUrl } from "../../constants";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { useHistory, useParams, withRouter } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";
import CreateMenu from "./CreateMenu";
import ProfileMenu from "./ProfileMenu";
import EditProfileDialog from "../ProfilePage/EditProfileDialog";
import logo from "../../assets/logo.png";
import { ThemeContext } from "../../Context/ThemeContext";
import lighttheme from "../../theme";
import darktheme from "../../darktheme";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import { useSocket } from "../../Context/SocketProvider";
import { UserContext } from "../../Context/UserContext";
import { useNotifications } from "../../Context/NotificationProvider";
import { useConnections } from "../../Context/ConnectionProvider";
import { useProjectRequests } from "../../Context/ProjectRequestProvider";
import SnackBar from "../SnackBar";
import { useToast } from "../../Context/ToastProvider";
import { useMyProjects } from "../../Context/MyProjectsProvider";
import { useChats } from "../../Context/ChatsProvider";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
    },
    marginRight: 10,
    cursor: "pointer",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  homeroot: {
    padding: "1px 1px",
    display: "flex",
    alignItems: "center",
    width: 150,
    background: "rgba(255,255,255,0.2)",
    border: `1px solid ${theme.palette.primary.main}`,
    // [theme.breakpoints.down("sm")]: {
    //   width: "80%"
    // }
    // margin: "10px 0px 20px 0px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 5,
  },
  // inputRoot: {
  //   color: "inherit",
  // },
  // inputInput: {
  //   padding: theme.spacing(1, 1, 1, 0),
  //   // vertical padding + font size from searchIcon
  //   paddingLeft: `calc(1em + ${theme.spacing(3)}px)`,
  //   transition: theme.transitions.create("width"),
  //   width: "120px",
  // },
  img: {
    width: 35,
    height: 35,
    cursor: "pointer",
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  let matches = useMediaQuery((theme) => theme.breakpoints.up("md"));
  const { setLogout } = props;
  const [switchToggle, setSwitchToggle] = useState(
    localStorage.getItem("dark-theme") === "true"
  );
  const { defaultTheme } = useContext(ThemeContext);
  const socket = useSocket();
  const { userProfile } = useContext(UserContext);
  const [search, setSearch] = useState("");
  // var count = 0;
  // const [notifCount, setNotifCount] = useState(count);
  // socket.on("initNotification", (data) => {
  //   data.forEach((notif) => {
  //     if (notif.is_unread) {
  //       count += 1;
  //     }
  //   });
  //   setNotifCount(count);
  // });
  const icon = defaultTheme === "dark" ? <Brightness7 /> : <Brightness4 />;
  const appliedTheme = defaultTheme === "dark" ? darktheme : lighttheme;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openNotif = Boolean(anchorEl);
  const {
    notifications,
    setNotifications,
    notifCount,
    setNotifCount,
  } = useNotifications();
  const history = useHistory();
  const { connections, setConnections, invites, setInvites } = useConnections();
  const { requests, setRequests } = useProjectRequests();
  const {
    toast,
    setToast,
    message,
    setMessage,
    messageType,
    setMessageType,
  } = useToast();
  const { myprojects, setMyProjects } = useMyProjects();
  const { count, setCount, chats, setChats } = useChats();

  const [mobileSearch, setMobileSearch] = useState(false);

  useEffect(() => {
    const unreadNotifs =
      notifications &&
      notifications.filter((notification) => notification.is_unread !== false);

    setNotifCount(unreadNotifs.length);
  }, [notifications]);

  const id = openNotif ? "simple-popover" : undefined;

  const handleSwitch = () => {
    setSwitchToggle(!switchToggle);
    props.toggleTheme();
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setMobileSearch(false);
    const string = search;
    setSearch("");
    history.push("/search", { string: string });
  };

  const handleClick = (event) => {
    fetch(kBaseUrl + "fetch_notifications", {
      method: "GET",
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setNotifications(data);
        // const unreadNotifs = data.filter(
        //   (notification) => notification.is_unread !== false
        // );
      })
      .catch((e) => console.log(e));
    setAnchorEl(event.currentTarget);
  };

  const handleClearAll = (event) => {
    fetch(kBaseUrl + "mark_all_as_read", {
      method: "POST",
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then((res) => {
        if (res.status === 200) {
          setNotifCount(0);
          setAnchorEl(null);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    socket.emit("auth", { uid: userProfile.uid });
  }, []);

  useEffect(() => {
    fetch(kBaseUrl + "get_all_my_projects", {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message !== "Unauthenticated") setMyProjects(data);
        var projectRooms = [];
        data.map(({ _id }) => {
          projectRooms.push(_id);
        });
        socket.emit("joinRoom", { uid: userProfile.uid, projectRooms });
      })
      .catch((e) => console.log(e));
  }, []);

  socket.on("connectionAcceptedNotification", (data) => {
    setToast(true);
    setMessage(
      data.data.fname +
      " " +
      data.data.lname +
      " accepted your Connection Request"
    );
    setMessageType("info");
    setConnections([...connections, data.data]);
    setNotifCount(notifCount + 1);
  });

  socket.on("recieveMessage", (data) => {
    let cts = { ...chats };
    cts[data.room] = cts[data.room] && (cts[data.room].length !== 0 ? [...cts[data.room], data] : [data]);
    setChats(cts);
    let dt = { ...count };
    dt[`${data.room}`] = dt[`${data.room}`] === undefined ? 1 : dt[`${data.room}`] + 1;
    setCount(dt);
  });

  socket.on("connectionRequestNotification", (data) => {
    setToast(true);
    setMessage(
      data.data.fname + " " + data.data.lname + " sent you a Connection Request"
    );
    setMessageType("info");
    setInvites([...invites, data.data]);
    setNotifCount(notifCount + 1);
  });

  socket.on("commentNotification", (data) => {
    setToast(true);
    setMessage(
      data.data.fname + " " + data.data.lname + " commented on your Post"
    );
    setMessageType("info");
    setNotifCount(notifCount + 1);
  });

  socket.on("upvoteNotification", (data) => {
    setToast(true);
    setMessage(
      data.data.fname + " " + data.data.lname + " upvoted on your Post"
    );
    setMessageType("info");
    setNotifCount(notifCount + 1);
  });

  socket.on("projectRequestAcceptedNotification", (data) => {
    setToast(true);
    setMessage(
      data.data.fname +
      " " +
      data.data.lname +
      " accepted your request on Project: " +
      data.data.project_title
    );
    setMessageType("info");
    setMyProjects([...myprojects, data.data]);
    setNotifCount(notifCount + 1);
    let cts = { ...chats };
    cts[data.data._id] = [];
    setChats(cts);
  });

  socket.on("projectJoinRequestNotification", (data) => {
    setRequests([...requests, data.data]);
    setNotifCount(notifCount + 1);
    setToast(true);
    setMessage(
      data.data.fname +
      " " +
      data.data.lname +
      " requested to join" +
      data.data.project_title
    );
    setMessageType("info");
  });

  socket.on("projectCommentNotification", (data) => {
    setToast(true);
    setMessage(
      data.data.fname +
      " " +
      data.data.lname +
      " commented on your Project: " +
      data.data.project_title
    );
    setMessageType("info");
    setNotifCount(notifCount + 1);
  });

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Grid
            container
            direction="row"
            // justify="space-between"
            alignItems="center"
          >
            <Grid
              item
              xs={matches ? 3 : 4}
              container
              direction="row"
              // justify="space-between"
              alignItems="center"
            >
              {!mobileSearch && <Box component="span">
                <img
                  src={logo}
                  alt=""
                  className={classes.img}
                  onClick={() => {
                    history.push("/home");
                  }}
                />
              </Box>}
              {matches ? <Typography
                component="span"
                className={classes.title}
                variant="h5"
                noWrap
                onClick={() => {
                  history.push("/home");
                }}
              >
                Lightbox
              </Typography> : (!mobileSearch &&
                <IconButton color="secondary" style={{ padding: 7, backgroundColor: fade("#FFFFFF", 0.2) }} onClick={() => { setMobileSearch(true); }}>
                  <SearchIcon />
                </IconButton>)}
              {(matches || mobileSearch) && (
                <Paper
                  component="form"
                  variant="outlined"
                  color="primary"
                  className={classes.homeroot}
                >
                  <InputBase
                    className={classes.input}
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    inputProps={{ "aria-label": `Search...` }}
                  />
                  <IconButton
                    type="submit"
                    color="secondary"
                    className={classes.iconButton}
                    aria-label="search"
                    onClick={handleSearch}
                  >
                    <SearchIcon />
                  </IconButton>
                </Paper>
              )}
              {/* {matches && (
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                  />
                </div>
              )} */}
            </Grid>
            <ThemeProvider theme={appliedTheme}>
              {matches && (
                <Grid item xs={6}>
                  {/* <TempTabBar /> */}
                  <NavigationMenu history={props.history} />
                </Grid>
              )}
              {/* <div className={classes.grow} /> */}
              <Grid
                item
                xs={matches ? 3 : 8}
                container
                alignItems="center"
                justify="flex-end"
              >
                {/* <div className={classes.sectionDesktop}> */}
                {/* <Switch
                  checked={switchToggle}
                  onChange={handleSwitch}
                  name="checkedB"
                  color="secondary"
                /> */}
                <Tooltip title="Toggle Theme">
                  <IconButton color="inherit" onClick={handleSwitch}>
                    {icon}
                  </IconButton>
                </Tooltip>
                <CreateMenu />
                <Tooltip title="Notifications">
                  <IconButton
                    aria-label="show 17 new notifications"
                    color="inherit"
                    aria-describedby={id}
                    onClick={handleClick}
                  >
                    <Badge badgeContent={notifCount} max={9} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Tooltip>
                <NotificationDrawer
                  id={id}
                  open={openNotif}
                  anchorEl={anchorEl}
                  handleClose={handleClose}
                  handleClearAll={handleClearAll}
                />
                <ProfileMenu setLogout={setLogout} />
                <EditProfileDialog open={false} />
                {/* </div> */}
              </Grid>
            </ThemeProvider>
          </Grid>
        </Toolbar>
        <ThemeProvider theme={appliedTheme}>
          {!matches && <NavigationMenu history={props.history} />}
        </ThemeProvider>
      </AppBar>
      <SnackBar
        open={toast}
        setOpen={() => {
          setToast(!toast);
        }}
        message={message}
        type={messageType}
      />
    </div>
  );
};

export default withRouter(Navbar);
