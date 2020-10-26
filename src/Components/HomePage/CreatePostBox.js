import React, { useContext } from "react";
import Typography from "@material-ui/core/Typography";
import { CardContent, Card, Button, Grid } from "@material-ui/core";
import EmojiObjectsOutlinedIcon from "@material-ui/icons/EmojiObjectsOutlined";
import PhotoCameraOutlinedIcon from "@material-ui/icons/PhotoCameraOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import CreatePostDialog from "./CreatePostDialog";

const CreatePostBox = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Card
        onClick={handleClickOpen}
        style={{ margin: "10px 40px 10px 40px", cursor: "pointer" }}
      >
        <CardContent>
          <Typography
            variant="h6"
            color="textSecondary"
            component="p"
            style={{ textAlign: "center" }}
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
              <Button color={"primary"} onClick={handleClickOpen}>
                <EmojiObjectsOutlinedIcon></EmojiObjectsOutlinedIcon>
                <span style={{ paddingTop: "15" }}> Idea / Event </span>
              </Button>
            </Grid>
            <Grid item>
              <Button color={"primary"} onClick={handleClickOpen}>
                <PhotoCameraOutlinedIcon></PhotoCameraOutlinedIcon>
                <span style={{ paddingTop: "15" }}> Photo </span>
              </Button>
            </Grid>
            <Grid item>
              <Button
                color={"primary"}
                form="create-post"
                onClick={handleClickOpen}
              >
                <DescriptionOutlinedIcon></DescriptionOutlinedIcon>
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
