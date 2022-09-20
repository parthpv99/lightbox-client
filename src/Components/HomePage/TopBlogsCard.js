import { Button, Card, CardHeader, Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { ThemeContext } from "../../Context/ThemeContext";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: "0px 20px 15px 20px",
    position: "fixed",
    width: "22%",
  },
  title: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 600,
    textAlign: "center",
    fontSize: "1.2rem",
    color: theme.palette.primary.main,
  },
  darkLink: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.main,
    },
    display: "inline-block",
    marginBottom: 15,
    fontSize: 16
  },
  link: {
    color: "black",
    textDecoration: "none",
    "&:hover": {
      color: theme.palette.primary.main,
    },
    display: "inline-block",
    marginBottom: 15,
    fontSize: 16
  },
}));

function TopBlogsCard() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const { defaultTheme } = useContext(ThemeContext);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('https://dev.to/api/articles?&top=60&tag=culture&per_page=4', { method: "GET" })
      .then((res) => res.json())
      .then(data => {
        var blgs = [...data];
        fetch('https://dev.to/api/articles?&top=60&tag=life&per_page=2', { method: "GET" })
          .then((res) => res.json())
          .then(data => {
            setBlogs([...blgs, ...data]);
            setLoading(false);
          }).catch(e => console.log(e));
      }).catch(e => console.log(e));
  }, []);


  return (
    <Card className={classes.card}>
      <CardHeader
        styles={{ marginTop: "0px" }}
        className={classes.title}
        title="Top Blogs"
      />
      <Grid container direction="column" spacing={2}>
        {
          loading ? <Grid container direction="row" justify="center">
            <MoonLoader
              size={30}
              color={defaultTheme === "dark" ? "#B6B6B6" : "#006BA6"}
              loading={loading}
            />
          </Grid> : blogs && blogs.length !== 0 ? blogs.map(blog => <div key={blog.id}>
            <Grid item>
              <a
                href={blog.url}
                target="_blank"
                className={
                  defaultTheme === "dark" ? classes.darkLink : classes.link
                }
              >
                {blog.title}
              </a>
            </Grid>
          </div>) : <Typography variant="body2" color="textSecondary">No Blogs Available</Typography>
        }
        {/* <Grid item>
          <a
            href="https://dev.to/theme_selection/reactjs-roadmap-for-developers-2824"
            target="_blank"
            className={
              defaultTheme === "dark" ? classes.darkLink : classes.link
            }
          >
            Roadmap to ReactJS
          </a>
        </Grid>
        <Grid item>
          <a
            href="https://www.sciencedirect.com/science/article/pii/B9780080420660500392"
            target="_blank"
            className={
              defaultTheme === "dark" ? classes.darkLink : classes.link
            }
          >
            Modern Surveying Techniques for Mining and Civil Engineering
          </a>
        </Grid>
        <Grid item>
          <a
            href="https://medium.com/autodesk-university/three-autocad-productivity-tips-for-success-abc5a19211f1"
            target="_blank"
            className={
              defaultTheme === "dark" ? classes.darkLink : classes.link
            }
          >
            Three AutoCAD Productivity Tips for Success
          </a>
        </Grid>
        <Grid item>
          <a
            href="https://www.geeksforgeeks.org/top-10-algorithms-every-machine-learning-engineer-should-know/"
            target="_blank"
            className={
              defaultTheme === "dark" ? classes.darkLink : classes.link
            }
          >
            Top 10 Algorithms for ML
          </a>
        </Grid> */}
        {/* <Grid item>
          <Grid container justify="flex-end">
            <Button color="primary">See more...</Button>
          </Grid>
        </Grid> */}
      </Grid>
    </Card>
  );
}

export default TopBlogsCard;
