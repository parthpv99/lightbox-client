import React from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import {AppBar, Toolbar, IconButton, Typography, Badge, useMediaQuery, Grid} from "@material-ui/core";
// import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { withRouter } from "react-router-dom";
import NavigationMenu from "./NavigationMenu";
import CreateMenu from "./CreateMenu";
import ProfileMenu from "./ProfileMenu";
import EditProfileDialog from "../ProfilePage/EditProfileDialog";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "flex",
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
  sectionDesktop: {
    display: "flex",
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  let matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

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
            <Grid item xs={matches ? 3 : 6} container>
              <Typography className={classes.title} variant="h5" noWrap>
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
              <Grid item xs={6}>
                <div style={{ marginLeft: "5%" }}>
                  <NavigationMenu history={props.history} />
                </div>
              </Grid>
            )}
            {/* <div className={classes.grow} /> */}
            <Grid item xs={matches ? 3 : 6} container justify="flex-end">
              <div className={classes.sectionDesktop}>
                <IconButton color="inherit">
                  <SearchIcon />
                </IconButton>
                <CreateMenu />
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
                  <Badge badgeContent={5} max={9} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
                <ProfileMenu />
                <EditProfileDialog />
              </div>
            </Grid>
          </Grid>
        </Toolbar>
        {!matches && <NavigationMenu history={props.history} />}
      </AppBar>
    </div>
  );
};

export default withRouter(Navbar);
