import React from "react";
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

const useStyles = makeStyles((theme) => ({
  menu: {
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
    },
  },
}));

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();

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
        <MenuItem className={classes.menu} onClick={handleClickOpen}>
          Edit Profile
        </MenuItem>
        <MenuItem className={classes.menu} onClick={handleViewProfile}>
          View Profile
        </MenuItem>
        <MenuItem className={classes.menu} onClick={handleClose}>
          Logout
        </MenuItem>
        <EditProfileDialog handleClickOpen={handleClickOpen} open={open} />
      </Menu>
    </div>
  );
};

export default ProfileMenu;
