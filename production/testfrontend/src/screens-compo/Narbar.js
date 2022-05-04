import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  makeStyles,
  useTheme,
  Popover,
  MenuList,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  InputBase,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import { textAlign } from "@mui/system";
import { border } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo.jpg";
import { MyAlgoLogin } from "./MyAlgo";
import { MetaMaskLogin } from "./MetaMask";
import { fontWeight } from "@mui/system";

const useStyles = makeStyles({
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12,
  },
});

function Popover1() {
  return (
    <div>
      <Link to="/tracks" style={{ textDecoration: "none" }}>
        <Typography sx={{ p: 2 }}>Tracks</Typography>
      </Link>
      <Link to="/artists" style={{ textDecoration: "none" }}>
        <Typography sx={{ p: 2 }}>Artists</Typography>
      </Link>
      <Link to="/trending" style={{ textDecoration: "none" }}>
        <Typography sx={{ p: 2 }}>Trending</Typography>
      </Link>
    </div>
  );
}

function Popover2() {
  return (
    <MenuList>
      <MenuItem>Algo</MenuItem>
      {/* <MyAlgoLogin
        myAlgoWallet={this.state.myAlgoWallet}
        setAddress={this.setMyAlgoAddress}
      /> */}
      <MenuItem>Eth</MenuItem>
      {/* <MetaMaskLogin
        provider={this.state.ethersProvider}
        setAddress={this.setMetaMaskAddress}
      /> */}
    </MenuList>
  );
}

const NarBar = () => {
  //Hooks
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  //Boolean(anchorEl) This is use to convert a null value in to a boolean
  //anchorEl Is us to set the position of the menu

  const classes = useStyles();

  const theme = useTheme(); //Get a copy of our default theme in our component so that we can access the breakpoints and pass the useMediaQuery

  //Functions
  //  const handleClickTab = (e, newValue) => {
  //    //The second value contains the current index
  //    setValue(newValue);
  //  };

  // const handleOpenMenu = (e) => {
  //   setAnchorEl(e.currentTarget);
  // };
  // const handleCloseMenu = () => {
  //   setAnchorEl(null);
  // };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const open = Boolean(anchorEl);
  // const id = open ? "simple-popover" : undefined;

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

  const [popover1, setPopover1] = React.useState({
    anchorEl: null,
    child: <Popover1 />,
  });
  const [popover2, setPopover2] = React.useState({
    anchorEl: null,
    child: <Popover2 />,
  });

  return (
    <>
      <AppBar
        position="sticky"
        // width="100%"
        style={{
          padding: "0 0 0 0",
        }}
      >
        <Toolbar>
          <Link to="/">
            <img
              // className={classes.logo}
              alt="logo"
              src={logo}
              style={{
                display: "flex",
                height: "50px",
                padding: "0 0 0 0",
                // border: "0 0 0 0",
                // margin: "0 0 0 0",
              }}
            />
          </Link>
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
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Tracks, artists..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <section className={classes.rightToolbar}>
            {/* <Stack direction="row"> */}
              <Button
                style={{ fontSize: "18px", fontWeight:"bold" }}
                onClick={(event) =>
                  setPopover1({ ...popover1, anchorEl: event.currentTarget })
                }
                aria-describedby="explorePopover"
                // aria-haspopup="true"
              >
                Explore
              </Button>
              <Button style={{ fontSize: "18px", fontWeight:"bold" }} href="/create">
                Create
              </Button>
              <Button
                style={{ fontSize: "18px" , fontWeight:"bold"}}
                onClick={(event) =>
                  setPopover2({ ...popover2, anchorEl: event.currentTarget })
                }
                aria-describedby="signinPopover"
                // aria-haspopup="true"
              >
                Sign In
              </Button>
            {/* </Stack> */}
          </section>

          <Popover
            id="menu2Popover"
            open={Boolean(popover1.anchorEl)}
            onClose={() => setPopover1({ ...popover1, anchorEl: null })}
            anchorEl={popover1.anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {popover1.child}
          </Popover>
          <Popover
            id="menu4Popover"
            open={Boolean(popover2.anchorEl)}
            onClose={() => setPopover2({ ...popover2, anchorEl: null })}
            anchorEl={popover2.anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            {popover2.child}
          </Popover>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default NarBar;
