/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Brightness2Icon from "@mui/icons-material/Brightness2";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import AddIcon from "@mui/icons-material/Add";

import AppContext from "../context/AppContext";
import GatewayIcon from "./GatewayIcon";

const Header = () => {
  const { darkMode, switchDarkMode } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            component={RouterLink}
            to="/"
          >
            <GatewayIcon />
          </IconButton>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1 }}
            style={{ textDecoration: "none", color: "white" }}
          >
            Gateways
          </Typography>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2 }}
            onClick={() => navigate("/newgateway")}
          >
            <AddIcon color="secondary" />
          </IconButton>

          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2 }}
            onClick={switchDarkMode}
          >
            {darkMode ? (
              <WbSunnyIcon color="secondary" />
            ) : (
              <Brightness2Icon color="secondary" />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
