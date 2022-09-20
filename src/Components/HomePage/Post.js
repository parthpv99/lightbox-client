import React, { useContext, useEffect } from "react";
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
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import user from "../../assets/user.png";
import Badge from "@material-ui/core/Badge";
import classNames from "classnames";
import InputBase from "@material-ui/core/InputBase";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import ViewPost from "./ViewPost";
import PostData from "./PostData";
import { beautifiedDate } from "../../utility";
import { UserContext } from "../../Context/UserContext";
import { kBaseUrl } from "../../constants";
import { useHistory } from "react-router-dom";
import validate from "../../validate/validateComment";
import useForm from "../../hooks/useForm";
import { v4 } from "uuid";
import Alert from "@material-ui/lab/Alert";
import PostMenu from "./PostMenu";
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
    // width: 600,
    margin: "10px 40px 10px 40px",
    [theme.breakpoints.down("sm")]: {
      margin: 0,
      marginBottom: 10,
    },
  },
  media: {
    height: 200,
    // paddingTop: "56.25%", // 16:9
    // paddingTop: "60%", // 16:9
    cursor: "pointer",
    margin: 1,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    // display: "flex",
    // alignItems: "center",
    // justifyContent: "center",
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
  expandOpen: {
    color: theme.palette.primary.main,
  },
  commentScroll: {
    overflow: "auto",

    "&::-webkit-scrollbar": {
      width: "0.6rem",
    },
    "&::-webkit-scrollbar-track:hover": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      background: "rgba(180,180,180,0.2)",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.palette.primary.main,
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#004A74",
      cursor: "pointer",
    },
    maxHeight: 300,
    padding: 8,
  },
  upvote: {
    margin: "auto",
  },
  avatar: {
    width: 50,
    height: 50,
    border: `2px solid ${theme.palette.primary.main}`,
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
    backgroundColor: "#5F5F5F",
  },
  actions: {
    flexGrow: 1,
  },
}));

const Post = ({ post }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { userProfile } = useContext(UserContext);
  const { defaultTheme } = useContext(ThemeContext);
  const checkUpvote = post && post.upvotes.indexOf(userProfile.uid);
  const [upvoted, setUpvoted] = React.useState(checkUpvote > -1);
  const [commentText, setCommentText] = React.useState(false);
  const [comments, setComments] = React.useState([]);
  const [upvotes, setUpvotes] = React.useState(post && post.upvotes.length);
  const [commentCount, setCommentCount] = React.useState(post && post.comments.length);
  const [copy, setCopy] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

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
    setLoading(true);
    !expanded &&
      fetch(kBaseUrl + `fetch_comments?pid=${post._id}`, {
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
          setLoading(false);
        })
        .catch((e) => console.log(e));

    setExpanded(!expanded);
  };
  // const fd = new FormData();
  const cardHeader = (
    <CardHeader
      style={{ paddingBottom: 0, cursor: "pointer" }}
      onClick={() => { history.push("/connections/" + post.owner_id); }}
      avatar={<Avatar
        src={post.thumbnail_pic !== "" ? post.thumbnail_pic : user}
        alt="N"
        aria-label="Name"
        className={classes.avatar}
      />
      }
      // avatar={
      //   <StyledBadge
      //     overlap="circle"
      //     anchorOrigin={{
      //       vertical: "bottom",
      //       horizontal: "right",
      //     }}
      //     variant="dot"
      //   >
      //     {" "}
      //   </StyledBadge>
      // }
      action={<PostMenu post={post} />}
      title={post.fname + " " + post.lname}
      subheaderTypographyProps={{
        style: {
          fontSize: 13.5,
          // width: "70%",
        },
      }}
      subheader={post.title}
      subheadertime={beautifiedDate(post.createdAt)}
      subheaderTimeTypographyProps={{
        style: {
          fontSize: 12,
        },
      }}
    />
  );

  const history = useHistory();
  const viewPostHandler = () => {
    history.push("/posts/" + post._id);
  };

  const totalImages = post && post.post_image.length;
  const cardMedia = (
    <div>
      <Grid container>
        <Grid item xs={totalImages > 4 || totalImages === 2 ? 6 : 12}>
          <CardMedia
            className={classes.media}
            onClick={viewPostHandler}
            image={post.post_image[0]}
          // image="https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1007&q=80"
          />
        </Grid>
        {totalImages > 1 ? (
          <Grid item xs={totalImages > 1 && totalImages !== 4 ? 6 : 4}>
            <CardMedia
              className={classes.media}
              onClick={viewPostHandler}
              image={post.post_image[1]}
            // image="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
            />
          </Grid>
        ) : null}
        {totalImages > 2 ? (
          <Grid item xs={totalImages === 3 ? 6 : 4}>
            <CardMedia
              className={classes.media}
              onClick={viewPostHandler}
              image={post.post_image[2]}
            // image="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80"
            />
          </Grid>
        ) : null}
        {totalImages > 3 ? (
          <Grid item xs={4}>
            <CardMedia
              className={classes.media}
              onClick={viewPostHandler}
              image={post.post_image[3]}
            // image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1002&q=80"
            />
          </Grid>
        ) : null}
        {totalImages > 4 ? (
          <Grid item xs={4}>
            <CardMedia
              className={classes.media}
              onClick={viewPostHandler}
              image={post.post_image[4]}
            // image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80"
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
  // const data =
  //   "This impressive paella #bellaciao is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like.This impressive paella is a perfect party dish and a fun meal to cook together with your guests. Add 1 cup of frozen peas along with the mussels, if you like. #datascience #python #developer";

  const cardData = (
    <PostData data={post.description} onClickHandler={viewPostHandler} />
  );

  const commentData = {
    comment: "",
  };

  const commentHandler = () => {
    fetch(kBaseUrl + "comment", {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({
        _id: post._id,
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

  if (commentText) {
    values.comment = "";
    setCommentText(false);
  }

  const upvoteHandler = () => {
    fetch(kBaseUrl + "vote", {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({
        flag: upvoted,
        pid: post._id,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        !upvoted ? setUpvotes(upvotes + 1) : setUpvotes(upvotes - 1);
        setUpvoted(!upvoted);
      })
      .catch((e) => console.log(e));
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
    <CardActions className={classes.actions}>
      <Grid container>
        <Grid item xs={4}>
          <Button
            fullWidth
            aria-label="upvote"
            className={btnUpvote}
            onClick={upvoteHandler}
          >
            <ThumbUpIcon />{" "}
            <Typography variant="button" style={{ marginLeft: 10 }}>
              {upvoted ? "Upvoted" : "Upvote"}
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
          <Button
            fullWidth
            aria-label="share"
            className={classes.btnspace}
            onClick={() => {
              navigator.clipboard.writeText(
                "https://www.lightboxapp.tech/posts/" + post._id
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
      </Grid>
    </CardActions>
  );

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
              <Grid item xs={12} container direction="row" alignItems="center">
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
              <Grid item xs={12} container direction="row" alignItems="center">
                <Typography variant="body2" xs={12}>
                  <ReactLinkify properties={{ target: '_blank', style: { color: defaultTheme === 'dark' ? '#0496FF' : '#006BA6' } }}>{comment.comment_text}</ReactLinkify>
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
    </div>
  );

  // const allData = {
  //   images: [
  //     "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  //     "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80",
  //     "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1002&q=80",
  //     "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  //   ],
  //   header: cardHeader,
  //   data: cardData,
  // };

  return (
    <Card className={classes.root}>
      {cardHeader}
      {cardData}
      {post.post_image.length > 0 && cardMedia}
      <Typography
        color="textSecondary"
        variant="body1"
        style={{ fontSize: "0.9rem", margin: "3px 8px" }}
      >
        {upvotes && commentCount
          ? upvotes + " Upvotes & " + commentCount + " Comments"
          : upvotes
            ? upvotes + " Upvotes"
            : commentCount
              ? commentCount + " Comments"
              : null}
      </Typography>
      <Divider
        className={classes.divider}
        style={{ margin: 8, marginBottom: 0, marginTop: 0 }}
      />
      {/* {openImages && <ViewPost  post={post} call={false} />} */}
      {/*pass post photos in above component*/}
      {cardAction}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider
          className={classes.divider}
          style={{ marginLeft: 10, marginRight: 10, height: 0.8 }}
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
      {copy && <Alert severity="success">Post-link copied to clipboard!</Alert>}
    </Card>
  );
};

export default Post;
