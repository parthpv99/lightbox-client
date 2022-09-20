import {
  Avatar,
  Badge,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Divider,
  fade,
  Grid,
  IconButton,
  InputBase,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  withStyles,
} from "@material-ui/core";
import clsx from "clsx";
import React, { useContext } from "react";
import PostData from "../HomePage/PostData";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
// import PublishIcon from "@material-ui/icons/Publish";
import useForm from "../../hooks/useForm";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";
// import MoreVertIcon from "@material-ui/icons/MoreVert";
import user from "../../assets/user.png";
import classNames from "classnames";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import validate from "../../validate/validateComment";
import { beautifiedDate } from "../../utility";
import { kBaseUrl } from "../../constants";
import { UserContext } from "../../Context/UserContext";
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router";
import ProjectMenu from "./ProjectMenu";
import { useToast } from "../../Context/ToastProvider";
import ReactLinkify from "react-linkify";
import { ThemeContext } from "../../Context/ThemeContext";
import { MoonLoader } from "react-spinners";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "10px 40px 10px 40px",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      marginBottom: 10,
    },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    cursor: "pointer",
    margin: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  extendedMedia: {
    color: theme.palette.secondary.main,
    position: "relative",
    top: "50%",
    // left: "50%",
    transform: "translate(0%, -150%)",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  upvote: {
    margin: "auto",
  },
  expandOpen: {
    color: theme.palette.primary.main,
  },
  avatar: {
    width: 50,
    height: 50,
    border: `1.5px solid ${theme.palette.primary.main}`,
    backgroundColor: "transparent",
  },
  commentAvatar: {
    width: 40,
    height: 40,
    border: `1.2px solid ${theme.palette.primary.main}`,
    backgroundColor: "transparent",
  },
  btnspace: {
    // marginLeft: theme.spacing(2),
    fontSize: "1.2rem",
    // marginRight: theme.spacing(2),
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
    },
  },
  commentBox: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  comment: {
    padding: "6px 12px",
    display: "flex",
    alignItems: "center",
    margin: 10,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  divider: {
    backgroundColor: "#5F5F5F",
  },
  dividerVert: {
    height: 28,
    margin: 4,
  },
  hover: {
    cursor: "pointer",
  },
  actions: {
    flexGrow: 1,
  },
}));

function Project({ project, single }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [loading, setloading] = React.useState(false);
  // const [upvoted, setUpvoted] = React.useState(false);
  const { userProfile } = useContext(UserContext);
  const checkRequested =
    project && project.project_requests.indexOf(userProfile.uid);
  const [requested, setrequested] = React.useState(checkRequested > -1);
  const checkMember =
    project && project.project_members.indexOf(userProfile.uid);
  const [member, setMember] = React.useState(checkMember > -1);
  const [copy, setCopy] = React.useState(false);
  const [commentText, setCommentText] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [commentCount, setCommentCount] = React.useState(
    project.comments.length
  );
  const history = useHistory();
  const { setToast, setMessage, setMessageType } = useToast();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const btnClass = classNames(
    classes.btnspace,
    clsx(classes.expand, {
      [classes.expandOpen]: expanded,
    })
  );
  const { defaultTheme } = React.useContext(ThemeContext);

  // const btnUpvote = classNames(
  //   classes.btnspace,
  //   clsx(classes.upvote, {
  //     [classes.expandOpen]: upvoted,
  //   })
  // );

  const btnRequest = classNames(
    classes.btnspace,
    clsx(classes.upvote, {
      [classes.expandOpen]: requested,
    })
  );

  const handleExpandClick = () => {
    setloading(true);
    !expanded &&
      fetch(kBaseUrl + `fetch_project_comments?pid=${project._id}`, {
        credentials: "include",
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
        }
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          setComments(data.comments);
          setCommentCount(data.comments.length);
          setloading(false);
        })
        .catch((e) => console.log(e));

    setExpanded(!expanded);
  };

  const viewProjectHandler = () => {
    history.push("/projects/" + project._id);
  };

  const cardHeader = (
    <CardHeader
      style={{ paddingBottom: 0, cursor: "pointer" }}
      onClick={() => { history.push("/connections/" + project.project_leader); }}
      avatar={
        <Avatar
          src={project.thumbnail_pic !== "" ? project.thumbnail_pic : user}
          alt="N"
          aria-label="Name"
          className={classes.avatar}
        />
      }
      action={
        <ProjectMenu project={project} />
        // <IconButton color="inherit" aria-label="settings">
        //   <MoreVertIcon />
        // </IconButton>
      }
      title={project.fname + " " + project.lname}
      subheaderTypographyProps={{
        style: {
          fontSize: 13.5,
          // width: "70%",
        },
      }}
      subheader={project.title}
      subheadertime={beautifiedDate(project.createdAt)}
      subheaderTimeTypographyProps={{
        style: {
          fontSize: 12,
        },
      }}
    />
  );

  // const data =
  //   "This impressive paella #bellaciao is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. #datascience #python #developer";

  const cardData = (
    <CardContent
      onClick={!single && viewProjectHandler}
      className={classes.hover}
    >
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          <Typography variant="h6">{project.project_title}</Typography>
        </Grid>
        <Grid item>
          <PostData data={project.project_description} />
        </Grid>
        <Grid item>
          <Typography variant="h6" style={{ fontSize: "1.05rem" }}>
            Team Members:&nbsp;&nbsp;{project.project_members.length}
          </Typography>
        </Grid>
        {/* Loop here */}
        {/* <Grid item>
          <Typography variant="body1" style={{ margin: 2, marginLeft: 15 }}>
            {"name: Technology"}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" style={{ margin: 2, marginLeft: 15 }}>
            {"name: Technology"}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" style={{ margin: 2, marginLeft: 15 }}>
            {"name: Technology"}
          </Typography>
        </Grid> */}
        <Grid item>
          <Typography
            variant="h6"
            style={{ fontSize: "1.05rem", marginTop: 10 }}
          >
            Required Skills:
            {project.project_requirement.map((requirement, index) => (
              <Typography
                component="div"
                variant="body1"
                key={index}
                color="primary"
                style={{ marginLeft: 10 }}
                onClick={(e) => {
                  e.stopPropagation();
                  history.push("/search", { string: requirement });
                }}
              >
                {requirement}
              </Typography>
            ))}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="h6"
            style={{ fontSize: "1.05rem", marginTop: 10 }}
          >
            Basic Requirements:
            <ReactLinkify>
              <Typography variant="body1" style={{ margin: 2, marginLeft: 15 }}>
                {project.requirement_description}
              </Typography>
            </ReactLinkify>
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  );

  const commentData = {
    comment: "",
  };

  const commentHandler = () => {
    fetch(kBaseUrl + "project_comment", {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({
        _id: project._id,
        comment_text: values.comment,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setComments([
          {
            commentor_name: userProfile.fname + " " + userProfile.lname,
            comment_text: values.comment,
            thumbnail_pic: userProfile.thumbnail_pic,
            comment_date: new Date().toISOString(),
            _id: data._id,
          },
          ...comments,
        ]);
        setCommentCount(commentCount + 1);
        setCommentText(true);
      })
      .catch((e) => console.log(e));
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    commentHandler,
    validate,
    commentData,
    commentData
  );

  // const upvoteHandler = () => {
  //   setUpvoted(!upvoted);
  // };

  if (commentText) {
    values.comment = "";
    setCommentText(false);
  }

  const requestHandler = () => {
    // console.log(project._id);
    fetch(kBaseUrl + "join_project", {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({
        flag: requested,
        pid: project._id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setrequested(data.requested);
        setToast(true);
        setMessage(
          data.requested ? "Request to join Project " + project.project_title + " is sent to Owner" : "Request to join Project " + project.project_title + " is removed"
        );
        setMessageType("info");
      })
      .catch(() => {
        setToast(true);
        setMessage("Something Went Wrong!");
        setMessageType("error");
      });
  };

  const commentBox = (
    <Paper
      elevation={0}
      component="form"
      onSubmit={handleSubmit}
      className={classes.commentBox}
    >
      <Avatar
        src={
          userProfile && userProfile.thumbnail_pic !== ""
            ? userProfile.thumbnail_pic
            : user
        }
        alt="N"
        aria-label="Name"
        className={classes.commentAvatar}
      />
      <InputBase
        name="comment"
        className={classes.input}
        autoComplete="off"
        placeholder="Leave a Comment here..."
        value={commentText ? "" : values.comment}
        onChange={handleChange}
      />
      <Divider className={classes.dividerVert} orientation="vertical" />
      <IconButton type="submit" color="primary" aria-label="Send">
        <SendIcon />
      </IconButton>
    </Paper>
  );

  const cardAction = (
    <div>
      <Typography
        color="textSecondary"
        variant="body1"
        style={{ fontSize: "0.9rem", margin: "3px 8px" }}
      >
        {commentCount ? commentCount + " Comments" : null}
      </Typography>
      <Divider
        className={classes.divider}
        style={matches ? { margin: "0 8px" } : { margin: 0 }}
      />
      <CardActions className={classes.actions}>
        <Grid container>
          {/* <Grid item xs={matches ? 3 : 4}>
          <Button
            fullWidth
            aria-label="upvote"
            className={btnUpvote}
            onClick={upvoteHandler}
          >
            <PublishIcon />{" "}
            <Typography variant="button" style={{ marginLeft: 10 }}>
              {upvoted ? "Upvoted" : "Upvote"}
            </Typography>
          </Button>
        </Grid> */}
          <Grid item xs={4}>
            <Button
              fullWidth
              aria-label="request"
              className={btnRequest}
              onClick={requestHandler}
              disabled={member || project.project_leader === userProfile.uid}
            >
              <GroupAddIcon />{" "}
              <Typography variant="button" style={{ marginLeft: 10 }}>
                {requested ? "Requested" : "Request"}
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button
              fullWidth
              aria-label="comment"
              className={btnClass}
              onClick={handleExpandClick}
              aria-expanded={expanded}
            >
              <CommentIcon />
              <Typography variant="button" style={{ marginLeft: 10 }}>
                Comment
              </Typography>
            </Button>
          </Grid>
          {/* {matches && ( */}
          <Grid item xs={4}>
            <Button
              fullWidth
              aria-label="share"
              className={classes.btnspace}
              onClick={() => {
                navigator.clipboard.writeText(
                  "https://www.lightboxapp.tech/projects/" + project._id
                );
                setCopy(true);
                setTimeout(() => {
                  setCopy(false);
                }, 3000);
              }}
            >
              <ShareIcon />{" "}
              <Typography variant="button" style={{ marginLeft: 10 }}>
                Share
              </Typography>
            </Button>
          </Grid>
          {/* )} */}
        </Grid>
      </CardActions>
    </div>
  );

  // const comment = (
  //   <Paper
  //     elevation={0}
  //     component="form"
  //     onSubmit={commentHandler}
  //     className={classes.comment}
  //   >
  //     <Avatar
  //       src={user}
  //       alt="N"
  //       aria-label="Name"
  //       className={classes.commentAvatar}
  //     />
  //     <Grid container style={{ marginLeft: 5 }}>
  //       <Grid item xs={12}>
  //         <Typography variant="body2" style={{ fontWeight: "bold" }}>
  //           Dishang Patel
  //         </Typography>
  //       </Grid>
  //       <Grid item xs={12}>
  //         <Typography variant="body2">Awesome!</Typography>
  //       </Grid>
  //     </Grid>
  //   </Paper>
  // );

  const commentSection = (
    <div className={classes.commentScroll}>
      {comments && comments.length > 0 &&
        comments.map((comment) => (
          <Paper key={comment._id} elevation={0} className={classes.comment}>
            <Avatar
              src={comment.thumbnail_pic !== "" ? comment.thumbnail_pic : user}
              alt="N"
              aria-label="Name"
              className={classes.commentAvatar}
            />
            <Grid container style={{ marginLeft: 5 }}>
              <Grid item container direction="row" alignItems="center">
                <Grid item xs={8}>
                  <Typography variant="body2" style={{ fontWeight: "bold" }}>
                    {comment.commentor_name}
                  </Typography>
                </Grid>
                <Grid item xs={4} container justify="flex-end">
                  <Typography variant="body2">
                    {beautifiedDate(comment.comment_date)}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12}>

                <Typography variant="body2"><ReactLinkify properties={{ target: '_blank', style: { color: defaultTheme === 'dark' ? '#0496FF' : '#006BA6' } }}>{comment.comment_text}</ReactLinkify></Typography>

              </Grid>
            </Grid>
          </Paper>
        ))}
    </div>
  );

  return (
    <Card className={classes.root}>
      {cardHeader}
      {cardData}
      {/* <Divider
        className={classes.divider}
        style={{ margin: 8, marginBottom: 0 }}
      /> */}
      {cardAction}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider
          className={classes.divider}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
        <CardContent>
          {commentBox}
          {errors.comment && (
            <Typography
              variant="body1"
              color="error"
              style={{ margin: "0 8px" }}
            >
              {errors.comment}
            </Typography>
          )}
        </CardContent>
        {loading ?
          <Grid container direction="row" justify="center" style={{ marginBottom: 10 }}>
            <MoonLoader
              size={30}
              color={defaultTheme === "dark" ? "#B6B6B6" : "#006BA6"}
              loading={loading}
            />
          </Grid>
          : commentSection}
      </Collapse>
      {copy && (
        <Alert severity="success">Project-link copied to clipboard!</Alert>
      )}
    </Card>
  );
}

export default Project;
