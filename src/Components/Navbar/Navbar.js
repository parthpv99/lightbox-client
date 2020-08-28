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
import { useMediaQuery, Grid } from "@material-ui/core";
import NavigationMenu from "./NavigationMenu";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  title: {
    display: "block",
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
}));

const Navbar = (props) => {
  const classes = useStyles();
  const menuId = "primary-search-account-menu";
  let matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

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
              {matches && (
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
              )}
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
                {!matches && (
                  <IconButton color="inherit">
                    <SearchIcon />
                  </IconButton>
                )}
                <IconButton color="inherit">
                  <AddCircleIcon />
                </IconButton>
                <IconButton
                  aria-label="show 17 new notifications"
                  color="inherit"
                >
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
            </Grid>
          </Grid>
        </Toolbar>
        {!matches && <NavigationMenu history={props.history} />}
      </AppBar>
    </div>
  );
};

export default withRouter(Navbar);
