import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CancelIcon from "@material-ui/icons/Cancel";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import PhotoCamera from "@material-ui/icons/PhotoCamera";

const styles = (theme) => ({
  root: {
    margin: 0,
    minWidth: "600px",
    padding: theme.spacing(2),
    [theme.breakpoints.down("sm")]: {
      minWidth: "350px",
    },
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles((theme) => ({
  textArea: {
    resize: "none",
    border: "1px solid transparent",
    width: "100%",
    outlineColor: "transparent",
    fontFamily: "roboto",
    fontSize: "1.2rem",
  },
  input: {
    display: "none",
  },
  action: {
    flexGrow: 1,
  },
  closeButtonDiv: {
    position: "relative",
  },
  close: {
    position: "absolute",
    left: "88%",
    transform: "translate(0%, 10%)",
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const CreatePostDialog = ({ open, handleClickOpen }) => {
  const [openWarning, setOpenWarning] = React.useState(false);
  const [images, setImages] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const classes = useStyles();

  const handleWarningClickOpen = () => {
    images && description ? setOpenWarning(true) : handleClickOpen();
  };

  const handleClose = (event) => {
    setDescription("");
    setImages([]);
    handleClickOpen();
  };

  const handleWarningClose = () => {
    setOpenWarning(false);
  };

  const handleWarningDiscard = (event) => {
    setOpenWarning(false);
    setDescription("");
    setImages([]);
    handleClickOpen();
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const displaySelectedImages = (event) => {
    const files = [...event.target.files];
    const urls = files.map((url) => URL.createObjectURL(url));

    setImages(urls);
  };

  const removeImage = (index) => {
    const imgs = [...images];
    imgs.splice(index, 1);

    setImages(imgs);
  };
  const WarningDialog = (
    <Dialog
      open={openWarning}
      onClose={handleWarningClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
    >
      <DialogTitle style={{ color: "black" }} id="alert-dialog-title">
        {"Are you sure you want to discard the changes?"}
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleWarningClose} color="primary">
          Keep
        </Button>
        <Button onClick={handleWarningDiscard} color="primary" autoFocus>
          Discard
        </Button>
      </DialogActions>
    </Dialog>
  );

  return (
    <Dialog
      disableBackdropClick
      onClose={handleWarningClickOpen}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle
        id="customized-dialog-title"
        onClose={handleWarningClickOpen}
        style={{ color: "black" }}
      >
        Create A Post
      </DialogTitle>
      <DialogContent>
        {WarningDialog}
        <TextareaAutosize
          rowsMin={15}
          rowsMax={15}
          aria-label="maximum height"
          placeholder="Write Your Thoughts..."
          value={description}
          className={classes.textArea}
          onChange={handleDescription}
        />
        <input
          accept="image/*"
          className={classes.input}
          id="icon-button-file"
          type="file"
          onChange={displaySelectedImages}
          multiple
        />
        {images &&
          images.map((image, index) => (
            <div key={index} className={classes.closeButtonDiv}>
              <IconButton
                className={classes.close}
                aria-label="remove picture"
                onClick={() => removeImage(index)}
              >
                <CancelIcon fontSize="large" />
              </IconButton>
              <img src={image} width="100%" alt="" />
            </div>
          ))}
      </DialogContent>
      <DialogActions className={classes.action}>
        <label htmlFor="icon-button-file">
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="span"
          >
            <PhotoCamera />
          </IconButton>
        </label>
        <Button
          autoFocus
          onClick={handleClose}
          variant="contained"
          color="primary"
        >
          Post
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePostDialog;
