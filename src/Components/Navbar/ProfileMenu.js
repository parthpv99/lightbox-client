import React, { useContext } from "react";
import {
  IconButton,
  MenuItem,
  makeStyles,
  fade,
  Menu,
} from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import EditProfileDialog from "../ProfilePage/EditProfileDialog";
import { useHistory } from "react-router-dom";
import { kBaseUrl } from "../../constants";
import { ThemeContext } from "../../Context/ThemeContext";

const useStyles = makeStyles((theme) => ({
  menuItem: {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
    },
  },
  menuItemDark: {
    color: theme.palette.secondary.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.secondary.main, 0.1),
      color: theme.palette.secondary.main,
    },
  },
}));

const ProfileMenu = ({ setLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();
  const { defaultTheme } = useContext(ThemeContext);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setAnchorEl(null);
    setOpen(!open);
  };

  const handleViewProfile = () => {
    setAnchorEl(null);
    history.push("/viewprofile");
  };

  const logout = () => {
    history.replace("/login");
    setLogout();
  };

  const handleLogout = () => {
    fetch(kBaseUrl + "logout", {
      credentials: "include",
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        data.message !== "SUCCESS" ? console.log(data.message) : logout();
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <AccountCircleIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          className={
            defaultTheme === "dark" ? classes.menuItemDark : classes.menuItem
          }
          onClick={handleClickOpen}
        >
          Edit Profile
        </MenuItem>
        <MenuItem
          className={
            defaultTheme === "dark" ? classes.menuItemDark : classes.menuItem
          }
          onClick={handleViewProfile}
        >
          View Profile
        </MenuItem>
        <MenuItem
          className={
            defaultTheme === "dark" ? classes.menuItemDark : classes.menuItem
          }
          onClick={handleLogout}
        >
          Logout
        </MenuItem>
        <EditProfileDialog handleClickOpen={handleClickOpen} open={open} />
      </Menu>
    </div>
  );
};

export default ProfileMenu;
