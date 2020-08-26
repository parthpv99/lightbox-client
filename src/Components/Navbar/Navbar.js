import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withRouter } from "react-router-dom";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import HomeIcon from "@material-ui/icons/Home";
import ForumIcon from "@material-ui/icons/Forum";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import GroupIcon from "@material-ui/icons/Group";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
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
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    // display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  tabs: {
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[0],
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const menuId = "primary-search-account-menu";
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
    switch (newValue) {
      case 1:
        props.history.push("/connections");
        break;
      case 2:
        props.history.push("/chats");
        break;
      case 3:
        props.history.push("/forums");
        break;
      default:
        props.history.push("/home");
    }
  };

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <Typography className={classes.title} variant="h5" noWrap>
            Lightbox
          </Typography>
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
          <div style={{ marginLeft: "5%" }}>
            <Paper square className={classes.tabs}>
              <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                TabIndicatorProps={{
                  style: {
                    height: "0.25rem",
                  },
                }}
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="icon tabs example"
              >
                <Tab icon={<HomeIcon />} aria-label="home" />
                <Tab icon={<GroupAddIcon />} aria-label="connection" />
                <Tab icon={<ForumIcon />} aria-label="chat" />
                <Tab icon={<GroupIcon />} aria-label="forum" />
              </Tabs>
            </Paper>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
              <AddCircleIcon />
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={5} max={9} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Navbar);
