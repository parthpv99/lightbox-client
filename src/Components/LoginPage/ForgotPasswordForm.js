import React, { useState } from "react";
import {
  Typography,
  TextField,
  Grid,
  Button,
  useMediaQuery,
  withStyles,
} from "@material-ui/core";
import { kBaseUrl } from "../../constants";
import { useHistory } from "react-router-dom";
// import { kBaseUrl } from "../../constants";
// import { setCookies } from "../../utility";

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

const ForgotPasswordForm = (props) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loginBtnDisable, setLoginBtnDisable] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [verify, setVerify] = useState(false);
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [icon1, setIcon1] = useState({ val: "close", color: "red" });
  const [icon2, setIcon2] = useState({ val: "close", color: "red" });
  const [icon3, setIcon3] = useState({ val: "close", color: "red" });
  const [icon4, setIcon4] = useState({ val: "close", color: "red" });
  const [icon5, setIcon5] = useState({ val: "close", color: "red" });
  const history = useHistory();

  const handleForgotPassword = (event) => {
    event.preventDefault();
    setLoginBtnDisable(true);
    setError(false);

    fetch(kBaseUrl + "verify_email", {
      body: JSON.stringify({ email }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "POST",
    })
      .then((res) => {
        if (res.status === 200) {
          setVerify(true);
        } else {
          if (res.status === 400) setError(true);
          else setError(true);
        }
      })
      .catch((e) => console.log("something went wrong"))
      .finally(() => {
        setLoginBtnDisable(false);
      });
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
    setPassword(pass);
  };

  const confirmPasswordHandler = (e) => {
    const pass = e.target.value;
    setConfirmPassword(pass);
    password !== pass
      ? setIcon5({ val: "close", color: "red" })
      : setIcon5({ val: "check", color: "green" });
  };

  const resetPasswordHandler = () => {
    fetch(kBaseUrl + "verify_forgotPasswordCode", {
      body: JSON.stringify({
        code: verificationCode,
        email: email,
        password: password,
      }),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      method: "POST",
    })
      .then(async (res) => {
        if (res.status === 200) {
          setError(false);
          history.push("/login");
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
    <form onSubmit={handleForgotPassword} style={{ width: "90%" }}>
      <Grid container justify="center">
        <Typography color="error">
          {error && verify
            ? "Invalid Verification Code"
            : error && "User not Exists"}
        </Typography>
      </Grid>
      <DarkTextField
        id="email"
        fullWidth
        autoFocus
        label="Email id"
        variant="outlined"
        style={{ margin: "2% auto" }}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      {!verify && <Grid container direction="row" justify="center" alignItems="center">
        <Button
          id="loginBtn"
          type="submit"
          color="primary"
          variant="contained"
          style={
            matches
              ? { margin: "3%", width: "30%" }
              : { margin: "3%", width: "50%" }
          }
          disabled={loginBtnDisable}
        >
          Get OTP
        </Button>
      </Grid>}
      <Grid container justify="center">
        <Typography color="primary" style={{ marginTop: 8 }}>
          {verify && "Check your EmailID for OTP verification"}
        </Typography>
      </Grid>
      {verify && (
        <>
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
        </>
      )}

      {verify && (
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="space-between"
          style={{ marginTop: 18 }}
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
          <Grid item xs={3}>
            <Button
              id="registerBtn"
              // type="submit"
              color="primary"
              variant="contained"
              onClick={resetPasswordHandler}
            // form="register-profile"
            // style={
            //   matches
            //     ? { margin: "3%", width: "30%" }
            //     : { margin: "3%", width: "50%" }
            // }
            // disabled={joinBtnDisable}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      )}
    </form>
  );
};

export default ForgotPasswordForm;
