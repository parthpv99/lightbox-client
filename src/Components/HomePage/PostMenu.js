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
import EditIcon from "@material-ui/icons/Edit";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import { UserContext } from "../../Context/UserContext";
import { useConnections } from "../../Context/ConnectionProvider";
import { kBaseUrl } from "../../constants";
import { usePosts } from "../../Context/PostsProvider";
import { useToast } from "../../Context/ToastProvider";

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

function PostMenu({ post }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const { posts, setPosts } = usePosts();
  const classes = useStyles();
  const { defaultTheme } = useContext(ThemeContext);
  const { userProfile, setUserProfile } = useContext(UserContext);

  const {
    connections,
    setConnections,
    suggestions,
    setSuggestions,
  } = useConnections();
  const { setToast, setMessage, setMessageType } = useToast();

  const connect = connections && connections.find(
    (connection) => connection.uid === post.owner_id
  );
  const [connected, setConnected] = React.useState(
    connect && connect.uid === post.owner_id
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

  const handleCreateConnection = () => {
    fetch(kBaseUrl + "make_connection_request", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({
        uid: post.owner_id,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          const sgs = suggestions.filter(
            (suggestion) => suggestion.uid !== post.owner_id
          );
          setSuggestions(sgs);
          let usr = { ...userProfile };
          usr["requestsMade"] = [...usr["requestsMade"], post.owner_id];
          setUserProfile(usr);
          setToast(true);
          setMessage("Request Sent to " + post.fname + " " + post.lname);
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
        uid: post.owner_id,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          const cnc = connections.filter(
            (connection) => connection.uid !== post.owner_id
          );
          setConnections(cnc);
          setToast(true);
          setMessage(
            post.fname + " " + post.lname + " is Removed from connections"
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

  const handleDeletePost = () => {
    fetch(kBaseUrl + "delete_post", {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({
        _id: post._id,
      }),
    })
      .then((res) => {
        if (res.status === 200) {
          const pst = posts.filter((pst) => pst._id !== post._id);
          setPosts(pst);
          setToast(true);
          setMessage("Post Deleted Successfully");
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

  const handleClickOpen = () => {
    setAnchorEl(null);
    setOpen(!open);
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
        {post.owner_id === userProfile.uid && (
          <div>
            <MenuItem
              className={
                defaultTheme === "dark"
                  ? classes.menuItemDark
                  : classes.menuItem
              }
              onClick={handleClickOpen}
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
                  <Typography>Edit Post</Typography>
                </Grid>
              </Grid>
            </MenuItem>
            <CreatePostDialog
              handleClickOpen={handleClickOpen}
              open={open}
              postdata={post}
              edit={true}
            />
            <MenuItem
              className={
                defaultTheme === "dark"
                  ? classes.menuItemDark
                  : classes.menuItem
              }
              onClick={handleDeletePost}
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
                  <Typography>Delete Post</Typography>
                </Grid>
              </Grid>
            </MenuItem>
          </div>
        )}
        {post.owner_id !== userProfile.uid && connected && (
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
        {post.owner_id !== userProfile.uid && !connected && (
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

export default PostMenu;
