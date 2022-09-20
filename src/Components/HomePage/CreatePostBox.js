import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import { CardContent, Card, Button, Grid, Tooltip } from "@material-ui/core";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import CreatePostDialog from "./CreatePostDialog";
import StartProjectDialog from "../Project/StartProjectDialog";

const CreatePostBox = () => {
  const [open, setOpen] = React.useState(false);
  const [openProject, setOpenProject] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  const handleClickOpenProject = () => {
    setOpenProject(!openProject);
  };

  return (
    <div>
      <Card style={{ margin: "10px 40px 10px 40px", cursor: "pointer" }}>
        <CardContent>
          <Typography
            variant="h6"
            color="textSecondary"
            component="p"
            style={{ textAlign: "center" }}
            onClick={handleClickOpen}
          >
            <b> What's on your mind ? </b>
          </Typography>
          <hr />
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-around"
          >
            <Grid item>
              <Tooltip title="Start Project">
                <Button color={"primary"} onClick={handleClickOpenProject}>
                  <EmojiObjectsOutlinedIcon />
                  <span style={{ paddingTop: "15" }}> Idea / Project </span>
                </Button>
              </Tooltip>
              <StartProjectDialog
                handleClickOpen={handleClickOpenProject}
                open={openProject}
              />
            </Grid>
            <Grid item>
              <Tooltip title="Create Post">
                <Button color={"primary"} onClick={handleClickOpen}>
                  <PhotoCameraOutlinedIcon />
                  <span style={{ paddingTop: "15" }}> Post </span>
                </Button>
              </Tooltip>
            </Grid>
            <Grid item>
              <Button
                color={"primary"}
                form="create-post"
                onClick={handleClickOpen}
                disabled
              >
                <DescriptionOutlinedIcon />
                <span style={{ paddingTop: "15" }}> Blog / Article </span>
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <CreatePostDialog handleClickOpen={handleClickOpen} open={open} />
    </div>
  );
};

export default CreatePostBox;
