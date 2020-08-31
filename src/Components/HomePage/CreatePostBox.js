import React from "react";
import Typography from "@material-ui/core/Typography";
import { CardContent, Card } from "@material-ui/core";
import CreatePostDialog from "./CreatePostDialog";

const CreatePostBox = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <Card onClick={handleClickOpen} style={{ margin: 10, cursor: "pointer" }}>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            What's on your mind...
          </Typography>
        </CardContent>
      </Card>

      <CreatePostDialog handleClickOpen={handleClickOpen} open={open} />
    </div>
  );
};

export default CreatePostBox;
