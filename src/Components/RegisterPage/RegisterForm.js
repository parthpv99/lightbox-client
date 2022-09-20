import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  useMediaQuery,
  withStyles,
} from "@material-ui/core";
// import { useHistory } from "react-router-dom";
import { kBaseUrl } from "../../constants";
import { setCookies } from "../../utility";
import EditProfileDialog from "../ProfilePage/EditProfileDialog";
import { useSocket } from "../../Context/SocketProvider";
import { useHistory } from "react-router-dom";

const DarkTextField = withStyles((theme) => ({
  root: {
    "& input:valid + fieldset": {
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
    },
    "& input:invalid + fieldset": {
      borderColor:
        localStorage.getItem("dark-theme") === "true"
          ? theme.palette.secondary.main
          : "grey",
      borderWidth: 1,
    },
    "& .MuiInputBase-root.Mui-disabled + fieldset": {
      borderColor:
        localStorage.getItem("dark-theme") === "true"
          ? theme.palette.secondary.main
          : "grey",
    },
    "& .MuiFormLabel-root.Mui-disabled": {
      color: theme.palette.primary.main,
    },
  },
}))(TextField);

const RegisterForm = ({ setLogin }) => {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);
  const [existingUser, setExistingUser] = useState(false);
  const [verify, setVerify] = useState(false);
  const [valid, setValid] = useState(false);
  const [updateProfile, setUpdateProfile] = useState(false);
  const socket = useSocket();
  const [joinBtnDisable, setJoinBtnDisable] = useState(false);
  const [icon1, setIcon1] = useState({ val: "close", color: "red" });
  const [icon2, setIcon2] = useState({ val: "close", color: "red" });
  const [icon3, setIcon3] = useState({ val: "close", color: "red" });
  const [icon4, setIcon4] = useState({ val: "close", color: "red" });
  const [icon5, setIcon5] = useState({ val: "close", color: "red" });
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const history = useHistory();
  const [open, setOpen] = useState(false);

  // const handleClickOpen = () => {
  //   setOpen(!open);
  // };

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleRegistration = (event) => {
    event.preventDefault();
    setJoinBtnDisable(true);
    setError(false);
    if (validateEmail(email) && valid && password === confirmPassword) {
      const user = JSON.stringify({ email: email, password: password });

      fetch(kBaseUrl + "register", {
        body: user,
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
      })
        .then(async (res) => {
          // console.log(res);
          if (res.status === 200) {
            let accessToken = "access-token";
            let token = res.headers.get(accessToken);
            setCookies(accessToken, token);
            const data = await res.json();
            // console.log(data);
            setVerify(true);
            setUpdateProfile(data.isProfileUpdated);
            // socket.emit("auth", { uid: data._id });
            // if (!data.isProfileUpdated) {
            //   // history.replace("/completeprofile");
            // }
          } else {
            if (res.status === 400) { setError(true); setExistingUser(false); }
            else if (res.status === 401) { setError(true); setExistingUser(true); }
            else setError(true);
          }
        })
        .catch((e) => console.log("something went wrong"))
        .finally(() => {
          setJoinBtnDisable(false);
        });
    } else {
      setError(true);
      setJoinBtnDisable(false);
    }
  };

  const passwordHandler = (e) => {
    const pass = e.target.value;
    pass.length < 8
      ? setIcon1({ val: "close", color: "red" })
      : setIcon1({ val: "check", color: "green" });
    pass.match(/(?=.*[A-Z])/)
      ? setIcon2({ val: "check", color: "green" })
      : setIcon2({ val: "close", color: "red" });
    pass.match(/(?=.*\d)/)
      ? setIcon3({ val: "check", color: "green" })
      : setIcon3({ val: "close", color: "red" });
    pass.match(/(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_``{|}~])/)
      ? setIcon4({ val: "check", color: "green" })
      : setIcon4({ val: "close", color: "red" });
    setValid(true);
    setPassword(pass);
  };

  const confirmPasswordHandler = (e) => {
    const pass = e.target.value;
    setConfirmPassword(pass);
    if (password !== pass) { setIcon5({ val: "close", color: "red" }); setValid(false); }
    else { setIcon5({ val: "check", color: "green" }); setValid(true); };
  };

  const joinNowHandler = (event) => {
    event.preventDefault();
    fetch(kBaseUrl + "verify_account", {
      body: JSON.stringify({
        code: verificationCode,
        email: email,
      }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "POST",
    })
      .then(async (res) => {
        // console.log(res);
        if (res.status === 200) {
          if (!updateProfile) {
            history.replace("/completeprofile");
          }
        } else {
          setError(true);

          // if (res.status === 400) setError(true);
          // else setError(true);
        }
      })
      .catch((e) => console.log("something went wrong"))
      .finally(() => {
        // setJoinBtnDisable(false);
      });
  };

  return (
    <>
      <form
        id="register-profile"
        onSubmit={handleRegistration}
        style={{ width: "90%" }}
      >
        {/* <EditProfileDialog setLogin={setLogin} required={true} open={open} /> */}
        <Grid container justify="center">
          <Typography color="error">
            {error && verify
              ? "Invalid Verification Code"
              : error && (existingUser ? "Account Already Exist! Try to Login" : "Invalid Email or Password")}
          </Typography>
        </Grid>
        <DarkTextField
          id="email"
          fullWidth
          autoFocus
          autoComplete="off"
          label="Email ID"
          variant="outlined"
          style={{ margin: "2% auto" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <DarkTextField
          fullWidth
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          style={{ margin: "2% auto" }}
          onChange={passwordHandler}
          required
        />

        <Grid container justify="flex-start">
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            style={{ marginBottom: "-5%" }}
          >
            <i
              className="material-icons"
              style={{ fontSize: "1.2rem", color: icon1.color }}
            >
              {icon1.val}
            </i>
            <p> Atleast 8 Characters </p>
          </Grid>
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            style={{ marginBottom: "-5%" }}
          >
            <i
              className="material-icons"
              style={{ fontSize: "1.2rem", color: icon2.color }}
            >
              {icon2.val}
            </i>
            <p> Atleast one capital alphabet </p>
          </Grid>
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            style={{ marginBottom: "-5%" }}
          >
            <i
              className="material-icons"
              style={{ fontSize: "1.2rem", color: icon3.color }}
            >
              {icon3.val}
            </i>
            <p> Atleast one number </p>
          </Grid>
          <Grid container justify="flex-start" alignItems="center">
            <i
              className="material-icons"
              style={{ fontSize: "1.2rem", color: icon4.color }}
            >
              {icon4.val}
            </i>
            <p> Atleast one special character </p>
          </Grid>
        </Grid>

        <DarkTextField
          fullWidth
          id="confirmpassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          value={confirmPassword}
          style={{ margin: "2% auto" }}
          onChange={confirmPasswordHandler}
          required
        />
        <Grid container justify="flex-start">
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            style={{ marginBottom: "-5%" }}
          >
            <i
              className="material-icons"
              style={{ fontSize: "1.2rem", color: icon5.color }}
            >
              {icon5.val}
            </i>
            <p> Password matched</p>
          </Grid>
        </Grid>

        {!verify && <Grid container justify="center">
          <Button
            id="registerBtn"
            type="submit"
            color="primary"
            variant="contained"
            form="register-profile"
            style={
              matches
                ? { margin: "3%", width: "30%" }
                : { margin: "3%", width: "50%" }
            }
            disabled={joinBtnDisable}
          >
            Get OTP
          </Button>
        </Grid>}
        <Grid container justify="center">
          <Typography color="primary" style={{ marginTop: 8 }}>
            {verify && "Check your EmailID for OTP verification"}
          </Typography>
        </Grid>
      </form>
      {verify && (
        <form id="verify-otp" onSubmit={joinNowHandler}>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-between"
          >
            <Grid item xs={8}>
              <DarkTextField
                id="vfcode"
                fullWidth
                autoComplete="off"
                label="Verification Code"
                variant="outlined"
                onInput={(e) => {
                  setVerificationCode(e.target.value.toString().slice(0, 6));
                  // e.target.value = Math.max(0, parseInt(e.target.value))
                  //   .toString()
                  //   .slice(0, 6);
                }}
                style={{ margin: "2% auto" }}
                value={verificationCode}
                // onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
            </Grid>
            <Grid item>
              <Button
                id="otpBtn"
                type="submit"
                color="primary"
                variant="contained"
                form="verify-otp"
              // style={
              //   matches
              //     ? { margin: "3%", width: "30%" }
              //     : { margin: "3%", width: "50%" }
              // }
              // disabled={joinBtnDisable}
              >
                Join now
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
};

export default RegisterForm;
