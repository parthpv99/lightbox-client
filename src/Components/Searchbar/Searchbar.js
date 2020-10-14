import React, { useState } from "react";
import { Paper, makeStyles, InputBase, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.4)",
    border: `1px solid ${theme.palette.primary.main}`,
    margin: "10px 0px 20px 0px",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 5,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function Searchbar({ hintText, handleSearch }) {
  const [search, setSearch] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    handleSearch(search);
  };

  const classes = useStyles();
  return (
    <div>
      <Paper
        component="form"
        variant="outlined"
        color="primary"
        className={classes.root}
      >
        <InputBase
          className={classes.input}
          placeholder={hintText}
          onChange={(e) => setSearch(e.target.value)}
          inputProps={{ "aria-label": `${hintText}` }}
        />
        <IconButton
          type="submit"
          color="primary"
          className={classes.iconButton}
          aria-label="search"
          onClick={searchHandler}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </div>
  );
}

export default Searchbar;
