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
import React from "react";
import PostData from "./PostData";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import PublishIcon from "@material-ui/icons/Publish";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import user from "../../assets/user.png";
import classNames from "classnames";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";

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
    border: "1.5px solid black",
    backgroundColor: "transparent",
  },
  commentAvatar: {
    width: 40,
    height: 40,
    border: "1.2px solid black",
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
    height: 28,
    margin: 4,
  },
  actions: {
    flexGrow: 1,
  },
}));

function Project() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [upvoted, setUpvoted] = React.useState(false);
  const [requested, setrequested] = React.useState(false);
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  const btnClass = classNames(
    classes.btnspace,
    clsx(classes.expand, {
      [classes.expandOpen]: expanded,
    })
  );

  const btnUpvote = classNames(
    classes.btnspace,
    clsx(classes.upvote, {
      [classes.expandOpen]: upvoted,
    })
  );

  const btnRequest = classNames(
    classes.btnspace,
    clsx(classes.upvote, {
      [classes.expandOpen]: requested,
    })
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const cardHeader = (
    <CardHeader
      avatar={
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          variant="dot"
        >
          <Avatar
            src={user}
            alt="N"
            aria-label="Name"
            className={classes.avatar}
          />{" "}
        </StyledBadge>
      }
      action={
        <IconButton color="inherit" aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      }
      title="John Doe"
      subheaderTypographyProps={{
        style: {
          fontSize: 12,
        },
      }}
      subheader="Data Analyst | Semester 7"
      subheadertime="10 min."
    />
  );

  const data =
    "This impressive paella #bellaciao is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. #datascience #python #developer";

  const cardData = (
    <CardContent>
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="flex-start"
      >
        <Grid item>
          <Typography variant="h6">Xender like application</Typography>
        </Grid>
        <Grid item>
          <PostData data={data} />
        </Grid>
        <Grid item>
          <Typography variant="h6" style={{ fontSize: "1.05rem" }}>
            Current Team Members: 3
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
            Requirements:
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1" style={{ margin: 2, marginLeft: 15 }}>
            {"Technology: requirement details"}
          </Typography>
        </Grid>
      </Grid>
    </CardContent>
  );

  const commentHandler = (e) => {
    e.preventDefault();
  };

  const upvoteHandler = () => {
    setUpvoted(!upvoted);
  };

  const requestHandler = () => {
    setrequested(!requested);
  };

  const commentBox = (
    <Paper
      elevation={0}
      component="form"
      onSubmit={commentHandler}
      className={classes.commentBox}
    >
      <Avatar
        src={user}
        alt="N"
        aria-label="Name"
        className={classes.commentAvatar}
      />
      <InputBase
        className={classes.input}
        placeholder="Leave a Comment here..."
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton type="submit" color="primary" aria-label="Send">
        <SendIcon />
      </IconButton>
    </Paper>
  );

  const cardAction = (
    <CardActions className={classes.actions}>
      <Grid container>
        <Grid item xs={matches ? 3 : 4}>
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
        </Grid>
        <Grid item xs={matches ? 3 : 4}>
          <Button
            fullWidth
            aria-label="request"
            className={btnRequest}
            onClick={requestHandler}
          >
            <GroupAddIcon />{" "}
            <Typography variant="button" style={{ marginLeft: 10 }}>
              {requested ? "Requested" : "Request"}
            </Typography>
          </Button>
        </Grid>
        <Grid item xs={matches ? 3 : 4}>
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
        {matches && (
          <Grid item xs={3}>
            <Button fullWidth aria-label="share" className={classes.btnspace}>
              <ShareIcon />{" "}
              <Typography variant="button" style={{ marginLeft: 10 }}>
                Share
              </Typography>
            </Button>
          </Grid>
        )}
      </Grid>
    </CardActions>
  );

  const comment = (
    <Paper
      elevation={0}
      component="form"
      onSubmit={commentHandler}
      className={classes.comment}
    >
      <Avatar
        src={user}
        alt="N"
        aria-label="Name"
        className={classes.commentAvatar}
      />
      <Grid container style={{ marginLeft: 5 }}>
        <Grid item xs={12}>
          <Typography variant="body2" style={{ fontWeight: "bold" }}>
            Dishang Patel
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body2">Awesome!</Typography>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <Card className={classes.root}>
      {cardHeader}
      {cardData}
      <Divider style={{ margin: 8, marginBottom: 0 }} />
      {cardAction}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider style={{ marginLeft: 10, marginRight: 10 }} />
        <CardContent>
          {commentBox}
          {comment}
          {comment}
          {comment}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Project;
