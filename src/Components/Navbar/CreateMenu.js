import React, { useContext } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
  fade,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreatePostDialog from "../HomePage/CreatePostDialog";
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

const CreateMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
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

  return (
    <div>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <AddCircleIcon />
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
          Create Post
        </MenuItem>
        <MenuItem
          className={
            defaultTheme === "dark" ? classes.menuItemDark : classes.menuItem
          }
          onClick={handleClose}
        >
          Start Project
        </MenuItem>
        <MenuItem
          className={
            defaultTheme === "dark" ? classes.menuItemDark : classes.menuItem
          }
          onClick={handleClose}
        >
          Write Blog
        </MenuItem>
      </Menu>
      <CreatePostDialog handleClickOpen={handleClickOpen} open={open} />
    </div>
  );
};

export default CreateMenu;
