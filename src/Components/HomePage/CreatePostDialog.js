import React, { useContext } from "react";
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
// import axios from "axios";
import { kBaseUrl } from "../../constants";
import { ThemeContext } from "../../Context/ThemeContext";
import useForm from "../../hooks/useForm";
import validate from "../../validate/validateCreatePost";

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
  textAreaDark: {
    background: "transparent",
    resize: "none",
    color: "white",
    border: "1px solid transparent",
    width: "100%",
    outlineColor: "transparent",
    fontFamily: "roboto",
    fontSize: "1.2rem",
    "&::-webkit-scrollbar": {
      width: "0.6rem",
    },
    "&::-webkit-scrollbar-track:hover": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      background: "rgba(180,180,180,0.2)",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      // backgroundColor: "rgba(0,0,0,.1)",
      // outline: "1px solid slategrey",
      // background: "#B4B4B4",
      background: theme.palette.primary.main,
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      // background: "#A3A3A3",
      background: theme.palette.text.secondary,
      cursor: "pointer",
    },
  },
  textArea: {
    resize: "none",
    border: "1px solid transparent",
    width: "100%",
    outlineColor: "transparent",
    fontFamily: "roboto",
    fontSize: "1.2rem",
    "&::-webkit-scrollbar": {
      width: "0.6rem",
    },
    "&::-webkit-scrollbar-track:hover": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      background: "rgba(180,180,180,0.2)",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      // backgroundColor: "rgba(0,0,0,.1)",
      // outline: "1px solid slategrey",
      // background: "#B4B4B4",
      background: theme.palette.primary.main,
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      // background: "#A3A3A3",
      background: "#004A74",
      cursor: "pointer",
    },
  },
  btnDark: {
    color: theme.palette.primary.main,
    background: "#0496FF",
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
  dialog: {
    "&::-webkit-scrollbar": {
      width: "0.6rem",
    },
    "&::-webkit-scrollbar-track:hover": {
      boxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.00)",
      background: "rgba(180,180,180,0.2)",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb": {
      // backgroundColor: "rgba(0,0,0,.1)",
      // outline: "1px solid slategrey",
      // background: "#B4B4B4",
      background: theme.palette.primary.main,
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      // background: "#A3A3A3",
      background: "#004A74",
      cursor: "pointer",
    },
  },
}));

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6" color="primary">
        {children}
      </Typography>
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
  const [fileData, setFileData] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [tags, setTags] = React.useState([]);
  const classes = useStyles();
  const { defaultTheme } = useContext(ThemeContext);

  var hashtags = [];
  const formatHashtags = (string) => {
    string
      // .split(/((?:^|\s)(?:#[a-z\d-]+))/gi)
      .split(/\B(\#[a-zA-Z]+\b)(?!;)/gi)
      .filter(Boolean)
      .map((v, i) => {
        if (v.includes("#")) {
          hashtags.push(v);
        }
      });
    setTags(hashtags);
  };

  const data = {
    description: "",
  };

  const errorData = {
    description: "",
  };

  const submit = () => {
    formatHashtags(description);
    console.log({
      images: fileData,
      description: description,
      tags: hashtags,
    });

    //   fetch(kBaseUrl + "post", {
    //     credentials: "include",
    //     // mode: "no-cors",
    //     method: "POST",
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       images: fileData,
    //       description: description,
    //       tags: hashtags,
    //     }),
    //   })
    //     .then((res) => {
    //       if (res.status == 200) {
    //         handleWarningDiscard();
    //       }
    //     })
    //     .catch((e) => console.log(e));
  };

  const { handleChange, handleSubmit, values, errors } = useForm(
    submit,
    validate,
    data,
    errorData
  );

  const handleWarningClickOpen = () => {
    images && values.description ? setOpenWarning(true) : handleClickOpen();
  };

  const handleClose = () => {
    setDescription("");
    setImages([]);
    handleClickOpen();
  };

  const handleWarningClose = () => {
    setOpenWarning(false);
  };

  const handleWarningDiscard = () => {
    setOpenWarning(false);
    handleClose();
  };

  // const handleDescription = (event) => {
  //   setDescription(event.target.value);
  // };

  const displaySelectedImages = (event) => {
    const files = [...event.target.files];
    let flag = false;
    let sizeExceeded = false;

    // const submitFile = async () => {
    //   try {
    //     if (!file) {
    //       throw new Error('Select a file first!');
    //     }

    //     await axios.post(`/test-upload`, formData, {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     });
    //     // handle success
    //   } catch (error) {
    //     // handle error
    //   }
    // };
    // console.log(form);
    const urls = files.map((url) => {
      if (
        url.type === "image/png" ||
        url.type === "image/gif" ||
        url.type === "image/jpeg" ||
        url.type === "image/jpg"
      ) {
        if (url.size >= 8388608) {
          sizeExceeded = true;
        }
        return URL.createObjectURL(url);
      } else {
        flag = true;
        return null;
      }
    });

    var base64images = [];
    files.map((file, index) => {
      let reader = new FileReader();
      reader.onload = function (e) {
        // this.setState({uploadedImage: e.target.result});
        // console.log(e.target.result);
        base64images.push({ data: e.target.result, name: files[index].name });
      };
      reader.readAsDataURL(file);
    });

    // console.log(base64images);

    // fetch(urls[0])
    //   .then(function (response) {
    //     return response.blob();
    //   })
    //   .then(function (blob) {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(blob);
    //     console.log(reader.result);
    //   });

    // const reader = new FileReader();
    // const print = reader.readAsDataURL(event.target.files[0]);
    // console.log(print);
    // const buffer = FS.readFileSync(urls[0]);
    // console.log(urls);

    // const formData = new FormData();
    // const form = files.map((file, index) => {
    //   formData.append("post_images", file);
    //   return formData;
    // });
    // console.log("Form Data: ", form);

    flag && alert("Only Image Files are Supported !");
    sizeExceeded && alert("Please Select images smaller than 8 MB size!");
    if (!flag && !sizeExceeded) {
      setImages(urls);
      setFileData(base64images);
      // console.log(fileData);
    } else {
      setImages(null);
      setFileData(null);
    }
  };

  const removeImage = (index) => {
    const imgs = [...images];
    const fls = [...fileData];
    imgs.splice(index, 1);
    fls.splice(index, 1);
    setImages(imgs);
    setFileData(fls);
    console.log(fileData);
  };

  // const formData = new FormData();
  // const form = images.map((file, index) => {
  //   formData.append("post_images", file);
  //   console.log(formData);
  //   return formData;
  // });

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
      <DialogContent className={classes.dialog}>
        {WarningDialog}
        <TextareaAutosize
          rowsMin={15}
          rowsMax={15}
          name="description"
          aria-label="maximum height"
          placeholder="Write Your Thoughts..."
          value={values.description}
          className={
            defaultTheme === "dark" ? classes.textAreaDark : classes.textArea
          }
          onChange={handleChange}
        />
        {errors.description && (
          <Typography color="error">{errors.description}</Typography>
        )}
        <input
          accept="image/png,image/gif,image/jpeg,image/jpg"
          className={classes.input}
          name="post_images"
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
          onClick={handleSubmit}
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

// const imgs = [...images];
//     imgs.splice(index, 1);

//     setImages(imgs);
