import {
  createTheme,
  ThemeProvider,
  styled,
  alpha,
} from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { makeStyles, Popover } from "@material-ui/core";
import { Button, InputBase, AppBar, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.jpg";
import { MyAlgoLogin } from "./MyAlgo";

//style of navbar menu "explore", "create", "sign in"
const useStyles = makeStyles({
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12,
  },
});

//color theme for button
const theme = createTheme({
  palette: {
    blue: {
      // Purple and green play nicely together.
      main: "#59DFDD",
    },
    secondary: {
      //
      main: "#59DFDD",
    },
  },
});

const NarBar = () => {
  //use the style for menu bar
  const classes = useStyles();


  const handleFailure = (result) => {
    alert(result);
  };

  //mui button setup
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  //mui search bar setup style
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));
  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  return (
    <>
      <AppBar
        sx={{ bgcolor: "#292828" }}
        position="sticky"
        style={{
          padding: "0 0 0 0",
        }}
      >
        <Toolbar>
          {/* logo */}
          <Link to="/">
            <img
              alt="logo"
              src={logo}
              style={{
                display: "flex",
                height: "50px",
                padding: "0 0 0 0",
              }}
            />
          </Link>

          {/* title */}
          <Link to="/">
            <Typography
              variant="h4"
              align="justify"
              style={{
                paddingLeft: 18,
                position: "relative",
                bottom: -4,
              }}
            >
              MIDIchef
            </Typography>
          </Link>

          {/* search bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tracks, artists..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* menu bar */}
          <ThemeProvider theme={theme}>
            <section className={classes.rightToolbar}>
              <Button
                color="blue"
                style={{ fontSize: "18px", fontWeight: "bold" }}
                onClick={handleClick}
                aria-describedby="explorePopover"
              >
                Explore
              </Button>
              <Link to="/create">
                <Button
                  color="blue"
                  style={{ fontSize: "18px", fontWeight: "bold" }}
                >
                  Create
                </Button>
              </Link>
              <Link to="/auth">
                <MyAlgoLogin />
              </Link>
            </section>
          </ThemeProvider>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Link to="/tracks" style={{ textDecoration: "none" }}>
              <Typography sx={{ p: 1, fontWeight: "bold", color: "#292828" }}>
                Tracks
              </Typography>
            </Link>
            <Link to="/artists" style={{ textDecoration: "none" }}>
              <Typography sx={{ p: 1, fontWeight: "bold", color: "#292828" }}>
                Artists
              </Typography>
            </Link>
            <Link to="/trending" style={{ textDecoration: "none" }}>
              <Typography sx={{ p: 1, fontWeight: "bold", color: "#292828" }}>
                Trending
              </Typography>
            </Link>
          </Popover>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default NarBar;
