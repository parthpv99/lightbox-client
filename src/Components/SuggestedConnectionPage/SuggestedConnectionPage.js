import React, { useContext, useEffect, useState } from "react";
import AllSuggestedInvites from "./AllSuggestedInvites";
import { Grid, Box, useMediaQuery } from "@material-ui/core";
import PageHeading from "../PageHeading/PageHeading";
import GroupIcon from "@material-ui/icons/Group";
import Searchbar from "../Searchbar/Searchbar";
import QuickAccessCard from "../QuickAccess/QuickAccessCard";
import SideMenus from "../ConnectionPage/SideMenus";
import { kBaseUrl } from "../../constants";
import { MoonLoader } from "react-spinners";
import { ThemeContext } from "../../Context/ThemeContext";
import { useConnections } from "../../Context/ConnectionProvider";
import { useToast } from "../../Context/ToastProvider";

function SuggestedConnectionPage() {
  const [loading, setloading] = useState(true);
  const { suggestions, setSuggestions } = useConnections();
  const [result, setResult] = useState(suggestions);
  const { defaultTheme } = useContext(ThemeContext);
  const { message } = useToast();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));

  useEffect(() => {
    fetch(kBaseUrl + "suggest_connection", {
      credentials: "include",
      method: "GET",
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("access-token")}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setSuggestions(data);
        setResult(data);
      })
      .then(() => setloading(false))
      .catch((e) => console.log(e));
  }, [message]);

  const handleSearch = (search) => {
    const searchresult = suggestions.filter((suggestion) => {
      const str =
        suggestion.fname +
        " " +
        suggestion.lname +
        " " +
        suggestion.title +
        " " +
        suggestion.branch +
        " semester " +
        suggestion.semester;
      return str.toLowerCase().includes(search.toLowerCase());
    });
    searchresult !== "" ? setResult(searchresult) : setResult(suggestions);
  };

  return (
    <Box my={matches ? 10 : 15} mx={3}>
      <Grid container direction="row" justify="space-between">
        {matches && (
          <Grid item xs={3}>
            <SideMenus pending={true} suggested={false} />
          </Grid>
        )}
        <Grid item xs={matches ? 6 : 12}>
          <Grid container direction="column">
            <Grid item>
              <PageHeading
                title="Suggestions"
                countTitle="Total Suggestions"
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
                <AllSuggestedInvites data={result} />
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

export default SuggestedConnectionPage;
