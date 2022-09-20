import React, { useContext, useEffect, useState } from "react";
import { Grid, Box, useMediaQuery, Typography, makeStyles } from "@material-ui/core";
import QuickAccessCard from "../QuickAccess/QuickAccessCard";
import { kBaseUrl } from "../../constants";
import { MoonLoader } from "react-spinners";
import { ThemeContext } from "../../Context/ThemeContext";
import { useLocation, useParams } from "react-router";
import TopBlogsCard from "../HomePage/TopBlogsCard";
import SearchResults from "./SearchResults";

const useStyle = makeStyles((theme) => ({
  heading: {
    fontWeight: "bold",
    [theme.breakpoints.down("sm")]: {
      fontSize: 25,
    },
  },
}));

function SearchResultPage() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const { defaultTheme } = useContext(ThemeContext);
  const { state } = useLocation();
  var string = "";
  var empty = false;
  const classes = useStyle();

  if (state === undefined) {
    empty = true;
  } else {
    string = state.string;
  }

  if (string.trim() === "") {
    empty = true;
  }

  useEffect(() => {
    fetch(kBaseUrl + "search?query=" + string.trim(), {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [string]);

  return (
    <Box my={matches ? 10 : 15} mx={matches ? 3 : 2}>
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
            <Grid item xs={12} container direction="column" alignItems="center">
              <Grid item xs={12}>
                <Typography
                  variant="h4"
                  color="textSecondary"
                  className={classes.heading}
                >
                  {!empty && "Search Results for '" + string + "'"}
                </Typography>
              </Grid>
              {empty ? (
                <Typography
                  style={{ textAlign: "center" }}
                  variant="h6"
                  color="textSecondary"
                  style={{ marginTop: "7%" }}
                >
                  Please Enter a valid Search String
                </Typography>
              ) : loading ? (
                <MoonLoader
                  size={60}
                  color={defaultTheme === "dark" ? "#B6B6B6" : "#006BA6"}
                  loading={loading}
                />
              ) : results && (results.users.length +
                results.posts.length +
                results.projects.length !==
                0) ? (
                <SearchResults
                  users={results.users}
                  posts={results.posts}
                  projects={results.projects}
                  string={string}
                />
              ) : (
                <Typography
                  style={{ textAlign: "center" }}
                  variant="h6"
                  color="textSecondary"
                  style={{ marginTop: "7%" }}
                >
                  No search result found!
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
}

export default SearchResultPage;
