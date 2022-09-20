import React, { useContext } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
  fade,
  Tooltip,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CreatePostDialog from "../HomePage/CreatePostDialog";
import { ThemeContext } from "../../Context/ThemeContext";
import StartProjectDialog from "../Project/StartProjectDialog";

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
  const [openProject, setOpenProject] = React.useState(false);
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

  const handleClickOpenProject = () => {
    setAnchorEl(null);
    setOpenProject(!openProject);
  };

  return (
    <div>
      <Tooltip title="Create Menu">
        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
          color="inherit"
        >
          <AddCircleIcon />
        </IconButton>
      </Tooltip>
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
        <CreatePostDialog handleClickOpen={handleClickOpen} open={open} />
        <MenuItem
          className={
            defaultTheme === "dark" ? classes.menuItemDark : classes.menuItem
          }
          onClick={handleClickOpenProject}
        >
          Start Project
        </MenuItem>
        <StartProjectDialog
          handleClickOpen={handleClickOpenProject}
          open={openProject}
        />
        {/* <MenuItem
          className={
            defaultTheme === "dark" ? classes.menuItemDark : classes.menuItem
          }
          onClick={handleClose}
        >
          Write Blog
        </MenuItem> */}
      </Menu>
    </div>
  );
};

export default CreateMenu;
