import React, { useContext, useEffect, useState } from "react";
import Posts from "./Posts";
import { Grid, Box, useMediaQuery, Typography } from "@material-ui/core";
import CreatePostBox from "./CreatePostBox";
import TopBlogsCard from "./TopBlogsCard";
import QuickAccessCard from "../QuickAccess/QuickAccessCard";
import { kBaseUrl } from "../../constants";
import { MoonLoader } from "react-spinners";
import { ThemeContext } from "../../Context/ThemeContext";
import { usePosts } from "../../Context/PostsProvider";

const HomePage = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const { posts, setPosts } = usePosts();
  const [loading, setLoading] = useState(true);
  const { defaultTheme } = useContext(ThemeContext);
  const [pagecount, setPagecount] = useState(0);
  const [end, setEnd] = useState(false);
  const [caught, setCaught] = useState(false);

  useEffect(() => {
    !caught &&
      fetch(kBaseUrl + "dashboard?page=" + (pagecount + 1), {
        credentials: "include",
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0 && pagecount !== 0) setCaught(true);
          let dt = [...posts, ...data];
          let flags = {};
          const unique = dt.filter(function (data) {
            if (flags[data._id]) {
              return false;
            }
            flags[data._id] = true;
            return true;
          });
          // const unique = [...new Set(dt.map((obj) => JSON.stringify(obj))),].map((str) => JSON.parse(str));
          // console.log(unique);
          setPosts(unique);
          setLoading(false);
          setPagecount(pagecount + 1);
        })
        .catch((e) => console.log(e));
  }, [end]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [end]);

  const handleScroll = (e) => {
    if (
      Math.round(
        document.documentElement.scrollHeight -
        document.documentElement.scrollTop
      ) === window.innerHeight ||
      Math.round(
        document.documentElement.scrollHeight -
        document.documentElement.scrollTop
      ) ===
      window.innerHeight + 1
    ) {
      setEnd(!end);
    }
  };

  return (
    <Box
      style={{ overflow: "auto" }}
      onScroll={handleScroll}
      my={matches ? 10 : 15}
      mx={matches ? 3 : 0}
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignContent="center"
      >
        {matches && (
          <Grid item xs={3}>
            <TopBlogsCard />
          </Grid>
        )}
        <Grid item xs={matches ? 6 : 12}>
          <Grid container direction="column">
            {matches && (
              <Grid item xs={12}>
                <CreatePostBox />
              </Grid>
            )}
            <Grid item xs={12} container direction="column" justify="center" style={{ minHeight: "120px" }}>
              {loading ? (
                <Grid item container direction="row" justify="center">
                  <MoonLoader
                    size={60}
                    color={defaultTheme === "dark" ? "#B6B6B6" : "#006BA6"}
                    loading={loading}
                  />
                </Grid>
              ) : posts && posts.length !== 0 ? (
                <Posts posts={posts} end={caught} />
              ) : (
                <Typography
                  style={{ textAlign: "center" }}
                  variant="h6"
                  color="textSecondary"
                >
                  No Posts to show!
                </Typography>
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
  );
};

export default HomePage;
