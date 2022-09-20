import React, { useContext, useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Grid,
  withStyles,
} from "@material-ui/core";
// import { useHistory } from "react-router-dom";
import { kBaseUrl } from "../../constants";
import { UserContext } from "../../Context/UserContext";
import { useSocket } from "../../Context/SocketProvider";
import { MoonLoader } from "react-spinners";
import { ThemeContext } from "../../Context/ThemeContext";
import { useConnections } from "../../Context/ConnectionProvider";
import { useNotifications } from "../../Context/NotificationProvider";
import { useHistory } from "react-router";

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

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loginBtnDisable, setLoginBtnDisable] = useState(false);
  const { setUserProfile } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const socket = useSocket();
  const { defaultTheme } = useContext(ThemeContext);
  const { setConnections, setSuggestions, setInvites } = useConnections();
  const { setNotifications } = useNotifications();
  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    setLoginBtnDisable(true);
    setError(false);
    setLoading(true);

    if (
      email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ) &&
      !password.length < 8
    ) {
      const user = JSON.stringify({ email: email, password: password });

      fetch(kBaseUrl + "login", {
        body: user,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        method: "POST",
      })
        .then(async (res) => {
          if (res.status === 200) {
            // let accessToken = "access-token";
            // let token = res.headers.get(accessToken);
            // setCookies(accessToken, token);
            // console.log(res);
            // need userProfile
            //setUserProfile(res);
            const data = await res.json();
            localStorage.setItem("access-token", data.token);
            if (!data.isProfileCompleted) {
              history.replace("/completeProfile");
            } else {
              fetch(kBaseUrl + "fetch_profile", {
                credentials: "include",
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
                },
              })
                .then((res) => {
                  return res.json();
                })
                .then((data) => {
                  setUserProfile(data);
                  socket.emit("auth", { uid: data.uid });
                })
                .then(() => {
                  fetch(kBaseUrl + "myconnections", {
                    credentials: "include",
                    method: "GET",
                    headers: {
                      "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
                    },
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      setConnections(data);
                    })
                    .catch((e) => console.log(e));
                })
                .then(() => {
                  fetch(kBaseUrl + "request_received", {
                    credentials: "include",
                    method: "GET",
                    headers: {
                      "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
                    },
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      setInvites(data);
                    })
                    .catch((e) => console.log(e));
                })
                .then(() => {
                  fetch(kBaseUrl + "suggest_connection", {
                    credentials: "include",
                    method: "GET",
                    headers: {
                      "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
                    },
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      setSuggestions(data);
                    })
                    .catch((e) => console.log(e));
                })
                .then(() => {
                  fetch(kBaseUrl + "fetch_notifications", {
                    credentials: "include",
                    method: "GET",
                    headers: {
                      "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
                    },
                  })
                    .then((res) => {
                      if (res.ok) {
                        return res.json();
                      } else {
                        throw new Error(res.status);
                      }
                    })
                    .then((data) => {
                      setNotifications(data);
                    })
                    .catch((e) => console.log(e));
                })
                .then(() => {
                  props.setLogin();
                });
            }
          } else {
            if (res.status === 400) setError(true);
            else setError(true);
          }
        })
        .catch((e) => console.log("something went wrong"))
        .finally(() => {
          setLoginBtnDisable(false);
          setLoading(false);
        });
    } else {
      setError(true);
      setLoading(false);
      setLoginBtnDisable(false);
    }
  };

  return (
    <div>
      {loading ? (
        <MoonLoader
          size={100}
          color={defaultTheme === "dark" ? "#B6B6B6" : "#006BA6"}
          loading={loading}
        />
      ) : (
        <form onSubmit={handleLogin}>
          <Grid container justify="center">
            <Typography color="error">
              {error && "Invalid Email or Password"}
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
          <DarkTextField
            fullWidth
            id="password"
            label="password"
            variant="outlined"
            type="password"
            value={password}
            style={{ margin: "2% auto" }}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Grid container justify="center">
            <Button
              id="loginBtn"
              type="submit"
              color="primary"
              variant="contained"
              style={{ margin: "3%", width: "30%" }}
              disabled={loginBtnDisable}
            >
              Login
            </Button>
          </Grid>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
