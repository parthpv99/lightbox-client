import React, { useContext } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
  fade,
  Grid,
  Typography,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CreatePostDialog from "../HomePage/CreatePostDialog";
import { ThemeContext } from "../../Context/ThemeContext";
import StartProjectDialog from "../Project/StartProjectDialog";
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { UserContext } from "../../Context/UserContext";
import { kBaseUrl } from "../../constants";
import { useProjects } from "../../Context/ProjectsProvider";
import { useToast } from "../../Context/ToastProvider";
import { useConnections } from "../../Context/ConnectionProvider";
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { useMyProjects } from "../../Context/MyProjectsProvider";

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

function ProjectMenu({ project }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openProject, setOpenProject] = React.useState(false);
  const classes = useStyles();
  const { defaultTheme } = useContext(ThemeContext);
  const { userProfile, setUserProfile } = useContext(UserContext);
  const { projects, setProjects } = useProjects();
  const { myprojects, setMyProjects } = useMyProjects();
  const {
    connections,
    setConnections,
    suggestions,
    setSuggestions,
  } = useConnections();
  const { setToast, setMessage, setMessageType } = useToast();

  const connect = connections && connections.find(
    (connection) => connection.uid === project.project_leader
  );
  const [connected, setConnected] = React.useState(
    connect && connect.uid === project.project_leader
  );
  const [sent, setSent] = React.useState(false);

  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setAnchorEl(null);
    setOpen(!open);
  };

  const handleCompleteProject = () => {
    fetch(kBaseUrl + "complete_project", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({
        _id: project._id,
      }),
    }).then((res) => {
      if (res.status === 200) {
        const prj = projects.filter((prjct) => prjct._id !== project._id);
        setProjects(prj);
        const mprj = myprojects && myprojects.filter((prjct) => prjct._id !== project._id);
        setMyProjects(mprj);
        setToast(true);
        setMessage(project.project_title + " is now Completed");
        setMessageType("info");
      } else {
        setToast(true);
        setMessage("Something Went Wrong!");
        setMessageType("error");
      }
    }).catch(e => {
      setToast(true);
      setMessage("Something Went Wrong!");
      setMessageType("error");
    });
    setAnchorEl(null);
  };

  const handleClickOpenProject = () => {
    setAnchorEl(null);
    setOpenProject(!openProject);
  };

  const handleCreateConnection = () => {
    fetch(kBaseUrl + "make_connection_request", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({
        uid: project.project_leader,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          const sgs = suggestions.filter(
            (suggestion) => suggestion.uid !== project.project_leader
          );
          setSuggestions(sgs);
          let usr = { ...userProfile };
          usr["requestsMade"] = [...usr["requestsMade"], project.project_leader];
          setUserProfile(usr);
          setToast(true);
          setMessage("Request Sent to " + project.fname + " " + project.lname);
          setMessageType("info");
        } else {
          setToast(true);
          setMessage("Something Went Wrong!");
          setMessageType("error");
        }
      })
      .then(setSent(true))
      .catch(() => {
        setToast(true);
        setMessage("Something Went Wrong!");
        setMessageType("error");
      });
    setAnchorEl(null);
  };

  const handleRemoveConnection = () => {
    fetch(kBaseUrl + "remove_connection", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({
        uid: project.project_leader,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          const cnc = connections.filter(
            (connection) => connection.uid !== project.project_leader
          );
          setConnections(cnc);
          setToast(true);
          setMessage(
            project.fname + " " + project.lname + " is Removed from connections"
          );
          setMessageType("info");
        } else {
          setToast(true);
          setMessage("Something Went Wrong!");
          setMessageType("error");
        }
      })
      .catch(() => {
        setToast(true);
        setMessage("Something Went Wrong!");
        setMessageType("error");
      });
    setAnchorEl(null);
  };

  const handleDeleteProject = () => {
    fetch(kBaseUrl + "delete_project", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({
        _id: project._id,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          const prj = projects.filter((prjct) => prjct._id !== project._id);
          setProjects(prj);
          const mprj = myprojects && myprojects.filter((prjct) => prjct._id !== project._id);
          setMyProjects(mprj);
          setToast(true);
          setMessage(project.project_title + " is Deleted from your Projects");
          setMessageType("info");
        } else {
          setToast(true);
          setMessage("Something Went Wrong!");
          setMessageType("error");
        }
      })
      .catch(() => {
        setToast(true);
        setMessage("Something Went Wrong!");
        setMessageType("error");
      });
    setAnchorEl(null);
  };

  return (
    <div onClick={e => e.stopPropagation()}>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="inherit"
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {project.project_leader === userProfile.uid && (
          <div>
            <MenuItem
              className={
                defaultTheme === "dark"
                  ? classes.menuItemDark
                  : classes.menuItem
              }
              onClick={handleClickOpenProject}
            >
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <EditIcon fontSize="small" />
                </Grid>
                <Grid item>
                  <Typography>Edit Project</Typography>
                </Grid>
              </Grid>
            </MenuItem>
            <StartProjectDialog
              handleClickOpen={handleClickOpenProject}
              open={openProject}
              edit={true}
              projectdata={project}
            />
            <MenuItem
              className={
                defaultTheme === "dark"
                  ? classes.menuItemDark
                  : classes.menuItem
              }
              onClick={handleDeleteProject}
            >
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <DeleteForeverIcon fontSize="small" />
                </Grid>
                <Grid item>
                  <Typography>Delete Project</Typography>
                </Grid>
              </Grid>
            </MenuItem>
            <MenuItem
              className={
                defaultTheme === "dark"
                  ? classes.menuItemDark
                  : classes.menuItem
              }
              onClick={handleCompleteProject}
            >
              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                spacing={2}
              >
                <Grid item>
                  <AssignmentTurnedInIcon fontSize="small" />
                </Grid>
                <Grid item>
                  <Typography>Complete Project</Typography>
                </Grid>
              </Grid>
            </MenuItem>
          </div>
        )}
        {project.project_leader !== userProfile.uid && connected && (
          <MenuItem
            className={
              defaultTheme === "dark" ? classes.menuItemDark : classes.menuItem
            }
            onClick={handleRemoveConnection}
          >
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <RemoveCircleOutlineIcon fontSize="small" />
              </Grid>
              <Grid item>
                <Typography>Remove Connection</Typography>
              </Grid>
            </Grid>
          </MenuItem>
        )}
        {project.project_leader !== userProfile.uid && !connected && (
          <MenuItem
            className={
              defaultTheme === "dark" ? classes.menuItemDark : classes.menuItem
            }
            onClick={handleCreateConnection}
          >
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Grid item>
                <PersonAddIcon fontSize="small" />
              </Grid>
              <Grid item>
                <Typography>Create Connection</Typography>
              </Grid>
            </Grid>
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

export default ProjectMenu;
