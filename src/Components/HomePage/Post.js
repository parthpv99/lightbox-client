import React from "react";
import { makeStyles, withStyles, fade } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PublishIcon from "@material-ui/icons/Publish";
import CommentIcon from "@material-ui/icons/Comment";
import ShareIcon from "@material-ui/icons/Share";
import SendIcon from "@material-ui/icons/Send";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import user from "../../assets/user.png";
import Badge from "@material-ui/core/Badge";
import classNames from "classnames";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";

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
    maxWidth: 600,
    margin: 10,
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

const Post = () => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [upvoted, setUpvoted] = React.useState(false);

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
        <IconButton aria-label="settings">
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
      subheaderTimeTypographyProps={{
        style: {
          fontSize: 10,
        },
      }}
    />
  );

  const imageHandler = () => {
    console.log("Image Pressed");
  };

  const totalImages = 10;
  const cardMedia = (
    <div>
      <Grid container>
        <Grid item xs={totalImages > 4 || totalImages === 2 ? 6 : 12}>
          <CardMedia
            className={classes.media}
            onClick={imageHandler}
            image="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1007&q=80"
          />
        </Grid>
        {totalImages > 1 ? (
          <Grid item xs={totalImages > 1 && totalImages !== 4 ? 6 : 4}>
            <CardMedia
              className={classes.media}
              onClick={imageHandler}
              image="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            />
          </Grid>
        ) : null}
        {totalImages > 2 ? (
          <Grid item xs={totalImages === 3 ? 6 : 4}>
            <CardMedia
              className={classes.media}
              onClick={imageHandler}
              image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80"
            />
          </Grid>
        ) : null}
        {totalImages > 3 ? (
          <Grid item xs={4}>
            <CardMedia
              className={classes.media}
              onClick={imageHandler}
              image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1002&q=80"
            />
          </Grid>
        ) : null}
        {totalImages > 4 ? (
          <Grid item xs={4}>
            <CardMedia
              className={classes.media}
              onClick={imageHandler}
              image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80"
            >
              {/* <span className={classes.extendedMedia}>+{totalImages - 5}</span> */}
              {totalImages > 5 ? (
                <Typography variant="h6" className={classes.extendedMedia}>
                  +{totalImages - 5}
                </Typography>
              ) : null}
            </CardMedia>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );

  const cardData = (
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        This impressive paella is a perfect party dish and a fun meal to cook
        together with your guests. Add 1 cup of frozen peas along with the
        mussels, if you like.
      </Typography>
    </CardContent>
  );

  const commentHandler = (e) => {
    e.preventDefault();
  };

  const upvoteHandler = () => {
    setUpvoted(!upvoted);
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
        <Grid item xs={4}>
          <Button
            fullWidth
            aria-label="upvote"
            className={btnUpvote}
            onClick={upvoteHandler}
          >
            <PublishIcon />{" "}
            <Typography variant="button" style={{ marginLeft: 10 }}>
              Upvote
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
        <Grid item xs={4}>
          <Button fullWidth aria-label="share" className={classes.btnspace}>
            <ShareIcon />{" "}
            <Typography variant="button" style={{ marginLeft: 10 }}>
              Share
            </Typography>
          </Button>
        </Grid>
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
      {cardMedia}
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
};

export default Post;
