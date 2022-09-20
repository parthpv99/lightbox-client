import React, { useContext, useEffect, useState } from "react";
import MyConnections from "./MyConnections";
import { Grid, Box, useMediaQuery } from "@material-ui/core";
import PageHeading from "../PageHeading/PageHeading";
import GroupIcon from "@material-ui/icons/Group";
import Searchbar from "../Searchbar/Searchbar";
import QuickAccessCard from "../QuickAccess/QuickAccessCard";
import SideMenus from "./SideMenus";
import { kBaseUrl } from "../../constants";
import { MoonLoader } from "react-spinners";
import { ThemeContext } from "../../Context/ThemeContext";
import { useConnections } from "../../Context/ConnectionProvider";
import { useToast } from "../../Context/ToastProvider";
import MobileConnectionPage from "./MobileConnectionPage";

const ConnectionPage = () => {
  // const [connections, setConnections] = useState([]);
  const { connections, setConnections } = useConnections();
  const [result, setResult] = useState(connections);
  const [loading, setloading] = useState(true);
  const { defaultTheme } = useContext(ThemeContext);
  const { message } = useToast();

  useEffect(() => {
    fetch(kBaseUrl + "myconnections", {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then(async (res) => {
        if (res.status === 200) {
          const data = await res.json();
          setConnections(data);
          setResult(data);
        }
      })
      .then(() => setloading(false))
      .catch((e) => console.log(e));
    // setResult(connections);
  }, [message]);

  const handleSearch = (search) => {
    const searchresult = connections.filter((connection) => {
      const str =
        connection.fname +
        " " +
        connection.lname +
        " " +
        connection.title +
        " " +
        connection.branch +
        " semester " +
        connection.semester;
      return str.toLowerCase().includes(search.toLowerCase());
    });
    searchresult !== "" ? setResult(searchresult) : setResult(connections);
  };

  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <Box my={matches ? 10 : 15} mx={3}>
      <Grid container direction="row" justify="space-between">
        {matches && (
          <Grid item xs={3}>
            <SideMenus suggested={true} pending={true} />
          </Grid>
        )}
        <Grid item xs={matches ? 6 : 12}>
          {matches ?
            <Grid container direction="column">
              <Grid item>
                <PageHeading
                  title="Connections"
                  countTitle="Total Connections"
                  count={result && result.length}
                  icon={
                    <GroupIcon style={{ fontSize: "300%", color: "#5F5F5F" }} />
                  }
                />
              </Grid>
              <Grid item container justify="flex-end" direction="row">
                <Grid item xs={matches ? 5 : 12}>
                  <Searchbar
                    hintText="Search Connections..."
                    handleSearch={handleSearch}
                  />
                </Grid>
              </Grid>
              <Grid item container justify="center" alignItems="center">
                {loading ? (
                  <MoonLoader
                    size={60}
                    color={defaultTheme === "dark" ? "#B6B6B6" : "#006BA6"}
                    loading={loading}
                  />
                ) : (
                  <MyConnections data={result} />
                )}
              </Grid>
            </Grid> : <MobileConnectionPage connections={result} />}
        </Grid>
        {matches && (
          <Grid item xs={3}>
            <QuickAccessCard />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ConnectionPage;
