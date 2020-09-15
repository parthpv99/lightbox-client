import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles, fade } from "@material-ui/core";
import EditProfileDialog from "../ProfilePage/EditProfileDialog";

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
        <MenuItem className={classes.menu} onClick={handleClose}>
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
