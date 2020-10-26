import React, { useContext, useEffect, useState } from "react";
import { Grid, Box, useMediaQuery } from "@material-ui/core";
import PageHeading from "../PageHeading/PageHeading";
import GroupIcon from "@material-ui/icons/Group";
import Searchbar from "../Searchbar/Searchbar";
import QuickAccessCard from "../QuickAccess/QuickAccessCard";
import SideMenus from "../ConnectionPage/SideMenus";
import { kBaseUrl } from "../../constants";
import AllPendingInvites from "./AllPendingInvites";
import { ThemeContext } from "../../Context/ThemeContext";
import { MoonLoader } from "react-spinners";

function PendingInvitesPage() {
  const handleSearch = (search) => {
    const searchresult = invites.filter((invite) => {
      const str =
        invite.fname +
        " " +
        invite.lname +
        " " +
        invite.title +
        " " +
        invite.branch +
        " semester " +
        invite.semester;
      return str.toLowerCase().includes(search.toLowerCase());
    });
    searchresult !== "" ? setResult(searchresult) : setResult(invites);
  };

  useEffect(() => {
    fetch(kBaseUrl + "request_received", {
      credentials: "include",
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setinvites(data.data);
        setResult(data.data);
      })
      .then(() => setloading(false))
      .catch((e) => console.log(e));
  }, []);

  const [invites, setinvites] = useState([]);
  const [result, setResult] = useState([]);
  const [loading, setloading] = useState(true);
  const { defaultTheme } = useContext(ThemeContext);

  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  return (
    <Box my={matches ? 10 : 15} mx={3}>
      <Grid container direction="row" justify="space-between">
        {matches && (
          <Grid item xs={3}>
            <SideMenus pending={false} suggested={true} />
          </Grid>
        )}
        <Grid item xs={matches ? 6 : 12}>
          <Grid container direction="column">
            <Grid item>
              <PageHeading
                title="Invites"
                countTitle="Total Invites"
                count={result.length}
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
                <AllPendingInvites data={result} />
              )}
            </Grid>
          </Grid>
        </Grid>
        {matches && (
          <Grid item xs={3}>
            <QuickAccessCard />
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default PendingInvitesPage;
