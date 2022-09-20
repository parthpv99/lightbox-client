import { Box, Grid, Typography, useMediaQuery } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { MoonLoader } from "react-spinners";
import { kBaseUrl } from "../../constants";
import { ThemeContext } from "../../Context/ThemeContext";
import { useToast } from "../../Context/ToastProvider";
import Project from "./Project";

function ViewProject() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [data, setData] = useState();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const { messageType } = useToast();
  const history = useHistory();
  const { defaultTheme } = useContext(ThemeContext);

  useEffect(() => {
    fetch(kBaseUrl + `getproject?pid=${id}`, {
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
          setData(data);
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [id, messageType]);

  return (
    <Box my={matches ? 10 : 15} mx={3}>
      <Grid container direction="row" justify="center" alignContent="center">
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
            This Project is Deleted by Owner. You are being redirected to Home
            Page
          </Typography>
        ) : (
          <Grid item xs={matches ? 6 : 12}>
            <Project project={data} single={true} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default ViewProject;
