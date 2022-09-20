import { Box, Grid, Typography, useMediaQuery } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { kBaseUrl } from "../../constants";
import { useProjects } from "../../Context/ProjectsProvider";
import { ThemeContext } from "../../Context/ThemeContext";
import QuickAccessCard from "../QuickAccess/QuickAccessCard";
import PendingProjectInvites from "./PendingProjectInvites";
import Projects from "./Projects";

function ProjectsPage() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const { projects, setProjects } = useProjects();
  const [loading, setLoading] = useState(true);
  const [pagecount, setPagecount] = useState(0);
  const [end, setEnd] = useState(false);
  const [caught, setCaught] = useState(false);
  const { defaultTheme } = useContext(ThemeContext);

  useEffect(() => {
    !caught &&
      fetch(kBaseUrl + "get_all_projects?page=" + (pagecount + 1), {
        credentials: "include",
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
        }
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.length === 0 && pagecount !== 0) setCaught(true);
          let dt = [...projects, ...data];
          let flags = {};
          const unique = dt.filter(function (data) {
            if (flags[data._id]) {
              return false;
            }
            flags[data._id] = true;
            return true;
          });
          // const unique = [...new Set(dt.map((obj)=>JSON.stringify(obj))),].map((str)=>JSON.parse(str));
          setProjects(unique);
          setLoading(false);
          setPagecount(pagecount + 1);
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);
        });
    // return () => {
    //   setProjects([]);
    // };
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
            <PendingProjectInvites />
          </Grid>
        )}
        <Grid item xs={matches ? 6 : 12}>
          <Grid item xs={12} container direction="column" alignItems="center" style={{ minHeight: "120px" }}>
            {loading ? (
              <MoonLoader
                size={60}
                color={defaultTheme === "dark" ? "#B6B6B6" : "#006BA6"}
                loading={loading}
              />
            ) : projects && projects.length !== 0 ? (
              <Projects projects={projects} end={caught} />
            ) : (
              <Typography
                style={{ textAlign: "center" }}
                variant="h6"
                color="textSecondary"
              >
                No Projects to show!
              </Typography>
            )}
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

export default ProjectsPage;
