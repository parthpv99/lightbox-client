import React, { useContext, useState } from "react";
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
} from "@material-ui/core";
// import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { withRouter } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";
import CreateMenu from "./CreateMenu";
import ProfileMenu from "./ProfileMenu";
import EditProfileDialog from "../ProfilePage/EditProfileDialog";
import logo from "../../assets/logo.png";
import { ThemeContext } from "../../Context/ThemeContext";
import lighttheme from "../../theme";
import darktheme from "../../darktheme";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.2rem",
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
    padding: theme.spacing(0, 1),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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
  const appliedTheme = defaultTheme === "dark" ? darktheme : lighttheme;

  const handleSwitch = () => {
    setSwitchToggle(!switchToggle);
    props.toggleTheme();
  };

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
            <Grid item xs={matches ? 2 : 4} container alignItems="center">
              <Box component="span">
                <img src={logo} alt="" className={classes.img} />
              </Box>
              <Typography
                component="span"
                className={classes.title}
                variant="h5"
                noWrap
              >
                Lightbox
              </Typography>
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
            {matches && (
              <Grid item xs={7}>
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
              <Switch
                checked={switchToggle}
                onChange={handleSwitch}
                name="checkedB"
                color="secondary"
              />
              <ThemeProvider theme={appliedTheme}>
                {/* <IconButton color="inherit">
                  <SearchIcon />
                </IconButton> */}
                <CreateMenu />
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={5} max={9} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <ProfileMenu setLogout={setLogout} />
                <EditProfileDialog open={false} />
              </ThemeProvider>
              {/* </div> */}
            </Grid>
          </Grid>
        </Toolbar>
        {!matches && <NavigationMenu history={props.history} />}
      </AppBar>
    </div>
  );
};

export default withRouter(Navbar);
