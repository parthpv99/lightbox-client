import { Box, Grid, Typography, useMediaQuery } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import QuickAccessCard from "../QuickAccess/QuickAccessCard";
import UserDetailsCard from "./UserDetailsCard";
import DashboardCard from "./DashboardCard";
import SkillsCard from "./SkillsCard";
import PageHeading from "../PageHeading/PageHeading";
import PostAddIcon from "@material-ui/icons/PostAdd";
import Posts from "../HomePage/Posts";
import { kBaseUrl } from "../../constants";
import { useConnections } from "../../Context/ConnectionProvider";
import { ThemeContext } from "../../Context/ThemeContext";
import { MoonLoader } from "react-spinners";
import { useToast } from "../../Context/ToastProvider";
import { useMyPosts } from "../../Context/MyPostsProvider";

function ViewProfilePage() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const { myposts, setMyPosts } = useMyPosts();
  const [loading, setLoading] = useState(true);
  const { connections } = useConnections();
  const { defaultTheme } = useContext(ThemeContext);

  useEffect(() => {
    fetch(kBaseUrl + "view_my_profile", {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setMyPosts(data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, []);

  return (
    <Box my={matches ? 10 : 15} mx={3}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignContent="center"
      >
        {matches && (
          <Grid item xs={3}>
            <UserDetailsCard self={true} />
          </Grid>
        )}
        <Grid item xs={matches ? 6 : 12}>
          <Grid container direction="column" spacing={3}>
            {!matches && (
              <Grid item>
                <UserDetailsCard self={true} />
              </Grid>
            )}
            <Grid item>
              <DashboardCard
                self={true}
                connectionslength={connections && connections.length}
                postslength={myposts && myposts.length}
                blogslength={0}
                projectslength={0}
              />
            </Grid>
            <Grid item>
              <SkillsCard self={true} />
            </Grid>
            <Grid item>
              <PageHeading
                title="Activities"
                countTitle="Total Activities"
                count={myposts && myposts.length}
                icon={
                  <PostAddIcon style={{ fontSize: "300%", color: "#5F5F5F" }} />
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
                <Posts posts={myposts} />
              )}
              {/* <Typography
                  style={{ textAlign: "center" }}
                  variant="h6"
                  color="textSecondary"
                >
                  You haven't Posted Yet! Create your first ever post.
                </Typography>
              */}
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
  );
}

export default ViewProfilePage;
