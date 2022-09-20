import { Box, Grid, useMediaQuery } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { kBaseUrl } from "../../constants";
import Projects from "../ProjectsPage/Projects";
import QuickAccessCard from "../QuickAccess/QuickAccessCard";
import UserDetailsCard from "../ViewProfile/UserDetailsCard";
import PostAddIcon from "@material-ui/icons/PostAdd";
import { ThemeContext } from "../../Context/ThemeContext";
import PageHeading from "../PageHeading/PageHeading";

function MyProjects() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { connections } = useConnections();
  const { defaultTheme } = useContext(ThemeContext);

  useEffect(() => {
    fetch(kBaseUrl + "get_all_my_projects", {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
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
            {/* <Grid item>
              <DashboardCard
            self={true}
            connectionslength={connections.length}
            postslength={posts.length}
            blogslength={0}
            projectslength={0}
          />
            </Grid>
            <Grid item>
              <SkillsCard self={true} />
            </Grid> */}
            <Grid item>
              <PageHeading
                title="My Projects"
                countTitle="Total Projects"
                count={projects.length}
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
                <Projects projects={projects} />
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

export default MyProjects;
