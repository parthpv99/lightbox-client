import React, { useContext, useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import user from "../../assets/user.png";
import {
  Grid,
  Card,
  useMediaQuery,
  CardActions,
  Button,
  fade,
  Divider,
  Box,
  Avatar,
  Badge,
  Paper,
  InputBase,
  CardContent,
} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import CustomCarousel from "./CustomCarousel";
import clsx from "clsx";
import { Publish, Comment, Share, MoreVert, Send } from "@material-ui/icons";
import { kBaseUrl } from "../../constants";
import { useHistory, useParams } from "react-router-dom";
import PostData from "./PostData";
import { beautifiedDate } from "../../utility";
import { UserContext } from "../../Context/UserContext";
import validate from "../../validate/validateComment";
import { v4 } from "uuid";
import useForm from "../../hooks/useForm";
import PostMenu from "./PostMenu";
import { MoonLoader } from "react-spinners";
import { useToast } from "../../Context/ToastProvider";
import { ThemeContext } from "../../Context/ThemeContext";
import ReactLinkify from "react-linkify";
import Alert from "@material-ui/lab/Alert";

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
    [theme.breakpoints.down("sm")]: {
      backgroundColor: theme.palette.background.paper,
      paddingBottom: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
  },
  styledRoot: {
    backgroundColor: theme.palette.background.paper,
    padding: 10,
    // marginBottom: 10,
    borderRadius: 5,
  },
  appBar: {
    position: "relative",
    boxShadow: theme.shadows[0],
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  dialog: {
    backgroundColor: "transparent",
  },
  description: {
    backgroundColor: theme.palette.secondary.main,
    paddingLeft: "5%",
  },
  actions: {
    flexGrow: 1,
  },
  expandOpen: {
    color: theme.palette.primary.main,
  },
  upvote: {
    margin: "auto",
  },
  divider: {
    backgroundColor: "#5F5F5F",
  },
  dividerVert: {
    height: 28,
    margin: 4,
    backgroundColor: "#5F5F5F",
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
    fontSize: "1.2rem",
    "&:hover": {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      color: theme.palette.primary.main,
    },
  },
  commentBox: {
    display: "flex",
    alignItems: "center",
    background: "transparent",
    marginTop: 5,
    [theme.breakpoints.up("sm")]: {
      padding: "2px 4px",
    },
  },
  comment: {
    display: "flex",
    alignItems: "center",
    background: "transparent",
    margin: 10,
    [theme.breakpoints.up("sm")]: {
      padding: "6px 12px",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  dataScroll: {
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
    [theme.breakpoints.up("sm")]: {
      height: "25vh",
    },
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
    [theme.breakpoints.up("sm")]: {
      height: "25vh",
    },
  },
}));

export const ViewPost = ({ postdata }) => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const { id } = useParams();
  const [loading, setloading] = useState(true);
  const [data, setData] = useState(null);
  const { userProfile } = useContext(UserContext);
  const [upvoted, setUpvoted] = useState(false);
  const [comments, setComments] = useState([]);
  const [upvotes, setUpvotes] = React.useState();
  const [commentCount, setCommentCount] = React.useState();
  const [commentText, setCommentText] = React.useState(false);
  const { messageType } = useToast();
  const [deleted, setDeleted] = React.useState(false);
  const commentData = {
    comment: "",
  };
  const history = useHistory();
  const { defaultTheme } = useContext(ThemeContext);
  const [copy, setCopy] = React.useState(false);

  useEffect(() => {
    fetch(kBaseUrl + `getpost?pid=${id}`, {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.is_deleted) {
          setDeleted(true);
          setTimeout(() => {
            history.push("/home");
          }, 3000);
        } else {
          setUpvoted(data.upvotes.indexOf(userProfile.uid) > -1);
          setUpvotes(data.upvotes.length);
          setCommentCount(data.comments.length);
          fetch(kBaseUrl + `fetch_comments?pid=${data._id}`, {
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
            })
            .catch((e) => console.log(e));
          setData(data);
        }
      })
      .then(() => setloading(false))
      .catch((e) => console.log(e));
  }, [id, messageType]);

  // const images = [
  //   "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
  //   "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1052&q=80",
  //   "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1002&q=80",
  //   "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80",
  // ];

  const carouselGrid = (
    <Grid item xs={matches ? 8 : 12}>
      {data && <CustomCarousel images={data && data.post_image} />}
    </Grid>
  );

  const btnUpvote = classNames(
    classes.btnspace,
    clsx(classes.upvote, {
      [classes.expandOpen]: upvoted,
    })
  );

  const commentHandler = () => {
    fetch(kBaseUrl + "comment", {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      },
      body: JSON.stringify({
        _id: data._id,
        comment_text: values.comment,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setComments([
          {
            commentor_name: userProfile.fname + " " + userProfile.lname,
            comment_text: values.comment,
            thumbnail_pic: userProfile.thumbnail_pic,
            comment_date: new Date().toISOString(),
            _id: v4(),
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
        value={values.comment}
        onChange={handleChange}
      />
      <Divider className={classes.dividerVert} orientation="vertical" />
      <IconButton type="submit" color="primary" aria-label="Send">
        <Send />
      </IconButton>
    </Paper>
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
        pid: data._id,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        !upvoted ? setUpvotes(upvotes + 1) : setUpvotes(upvotes - 1);
        setUpvoted(!upvoted);
      })
      .catch((e) => console.log(e));
  };

  const cardAction = (
    <div>
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
        style={matches ? { margin: "0 8px" } : { margin: 0 }}
      />
      <CardActions className={classes.actions}>
        <Grid container>
          <Grid item xs={4}>
            <Button
              fullWidth
              aria-label="upvote"
              className={btnUpvote}
              onClick={upvoteHandler}
            >
              <Publish />{" "}
              <Typography variant="button" style={{ marginLeft: 10 }}>
                {upvoted ? "Upvoted" : "Upvote"}
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth aria-label="comment" className={classes.btnspace}>
              <Comment />
              <Typography variant="button" style={{ marginLeft: 10 }}>
                Comment
              </Typography>
            </Button>
          </Grid>
          <Grid item xs={4}>
            <Button fullWidth aria-label="share" className={classes.btnspace} onClick={() => {
              navigator.clipboard.writeText(
                "https://www.lightboxapp.tech/posts/" + data._id
              );
              setCopy(true);
              setTimeout(() => {
                setCopy(false);
              }, 3000);
            }}>
              <Share />{" "}
              <Typography variant="button" style={{ marginLeft: 10 }}>
                Share
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </CardActions>
      <Divider
        className={classes.divider}
        style={matches ? { margin: "0 8px" } : { margin: 0 }}
      />
    </div>
  );

  const cardHeader = (
    <CardHeader
      style={{ paddingBottom: 0, cursor: "pointer" }}
      onClick={() => { history.push("/connections/" + data.owner_id); }}
      avatar={
        <Avatar
          src={data && data.thumbnail_pic !== "" ? data.thumbnail_pic : user}
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
      //     <Avatar
      //       src={data && data.thumbnail_pic !== "" ? data.thumbnail_pic : user}
      //       alt="N"
      //       aria-label="Name"
      //       className={classes.avatar}
      //     />{" "}
      //   </StyledBadge>
      // }
      action={<PostMenu post={data && data} />}
      // <IconButton color="inherit" aria-label="settings">
      //   <MoreVert />
      // </IconButton>
      title={data && data.fname + " " + data.lname}
      subheaderTypographyProps={{
        style: {
          fontSize: 13.5,
          // width: "70%",
        },
      }}
      subheader={data && data.title}
      subheadertime={data && beautifiedDate(data.createdAt)}
      subheaderTimeTypographyProps={{
        style: {
          fontSize: 12,
        },
      }}
    />
  );

  const formatHashtags = (string) => {
    return string
      .split(/((?:^|\s)(?:#[a-z\d-]+))/gi)
      .filter(Boolean)
      .map((v, i) => {
        if (v.includes("#")) {
          return (
            <Typography
              component="span"
              variant="body1"
              key={i}
              color="primary"
              style={{ whiteSpace: "pre-line", cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                history.push("/search", { string: v.substring(2, v.length) });
              }}
            >
              {v}
            </Typography>
          );
        } else {
          return (
            <Typography
              component="span"
              key={i}
              style={{ whiteSpace: "pre-line" }}
            >
              {v}
            </Typography>
          );
        }
      });
  };

  const cardData =
    data && data.post_image.length > 0 ? (
      <div className={classes.dataScroll}>
        <CardContent>
          <Typography variant="body1">
            {data && formatHashtags(data.description)}
          </Typography>
        </CardContent>{" "}
      </div>
    ) : (
      <CardContent>
        <PostData data={data && data.description} />
      </CardContent>
    );

  const dataGrid = (
    <Grid
      item
      xs={matches ? (data && data.post_image.length > 0 ? 4 : 6) : 12}
      className={classes.styledRoot}
    >
      <Card elevation={0} className={classes.dialog}>
        {cardHeader}
        {cardData}
        {matches && cardAction}
        {copy && <Alert severity="success">Post-link copied to clipboard!</Alert>}
        {matches && commentBox}
        {matches && commentSection}
      </Card>
    </Grid>
  );

  {
    /* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
    Open full-screen dialog
  </Button> */
  }

  return (
    <Box mt={matches ? 12 : 15} mx={matches ? 10 : 0} className={classes.root}>
      <Grid container direction="row" justify="center" alignItems="flex-start">
        {loading ? (
          <MoonLoader
            size={60}
            color={defaultTheme === "dark" ? "#B6B6B6" : "#006BA6"}
            loading={loading}
          />
        ) : deleted ? (
          <Typography
            color="textSecondary"
            variant="h5"
            style={{ marginTop: "5%" }}
          >
            This Post is Deleted by Owner. You are being redirected to Home Page
          </Typography>
        ) : (
          <>
            {matches ? (
              <>
                {data && data.post_image.length > 0 && carouselGrid}
                {dataGrid}
              </>
            ) : (
              <>
                {dataGrid}
                {data && data.post_image.length > 0 && carouselGrid}
                {!matches && cardAction}
                {copy && <Alert severity="success">Post-link copied to clipboard!</Alert>}
                {!matches && commentBox}
                {!matches && commentSection}
              </>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
};

export default ViewPost;
