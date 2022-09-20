import React, { useContext, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import Dialog from "@material-ui/core/Dialog";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
// import CloseIcon from "@material-ui/icons/Close";
// import Slide from "@material-ui/core/Slide";
import { Grid, Box, useMediaQuery } from "@material-ui/core";
import QuickAccessCard from "../QuickAccess/QuickAccessCard";
import UserDetailsCard from "./UserDetailsCard";
import DashboardCard from "./DashboardCard";
import SkillsCard from "./SkillsCard";
import PageHeading from "../PageHeading/PageHeading";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Posts from "../HomePage/Posts";
import { useParams } from "react-router-dom";
import { kBaseUrl } from "../../constants";
import { MoonLoader } from "react-spinners";
import { ThemeContext } from "../../Context/ThemeContext";
import { UserContext } from "../../Context/UserContext";

const useStyles = makeStyles((theme) => ({
  appBar: {
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  description: {
    backgroundColor: theme.palette.secondary.main,
    paddingLeft: "5%",
  },
  background: {
    backgroundColor: theme.palette.background.default,
  },
}));

export const ViewUserProfile = () => {
  const classes = useStyles();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [data, setData] = useState({});
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { defaultTheme } = useContext(ThemeContext);
  const { userProfile } = useContext(UserContext);

  useEffect(() => {
    fetch(kBaseUrl + "fetch_profile?uid=" + id, {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        fetch(kBaseUrl + "view_my_profile?uid=" + id, {
          credentials: "include",
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
          }
        })
          .then((res) => res.json())
          .then((data) => {
            setPosts(data);
            setLoading(false);
          });
      })
      .catch((e) => console.log(e));
  }, [id]);

  return (
    <div className={classes.background}>
      <Box my={matches ? 10 : 15} mx={3}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignContent="center"
        >
          {matches && (
            <Grid item xs={3}>
              <UserDetailsCard self={id === userProfile.uid} data={data} />
            </Grid>
          )}
          <Grid item xs={matches ? 6 : 12}>
            <Grid container direction="column" spacing={3}>
              {!matches && (
                <Grid item>
                  <UserDetailsCard self={id === userProfile.uid} data={data} />
                </Grid>
              )}
              <Grid item>
                <DashboardCard
                  self={false}
                  connectionslength={
                    data.hasOwnProperty("connections")
                      ? data.connections.length
                      : 0
                  }
                  postslength={posts && (posts.length > -1 ? posts.length : 0)}
                  blogslength={0}
                  projectslength={0}
                />
              </Grid>
              <Grid item>
                <SkillsCard self={false} data={data} />
              </Grid>
              <Grid item>
                <PageHeading
                  title="Activities"
                  countTitle="Total Activities"
                  count={posts && posts.length}
                  icon={
                    <PostAddIcon
                      style={{ fontSize: "300%", color: "#5F5F5F" }}
                    />
                  }
                />
              </Grid>
              <Grid item container alignItems="center" direction="column">
                {loading ? (
                  <MoonLoader
                    size={60}
                    color={defaultTheme === "dark" ? "#B6B6B6" : "#006BA6"}
                    loading={loading}
                  />
                ) : (
                  <Posts posts={posts} />
                )}
              </Grid>
            </Grid>
          </Grid>
          {matches && (
            <Grid item xs={3}>
              <QuickAccessCard />
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default ViewUserProfile;
