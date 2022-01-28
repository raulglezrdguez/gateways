/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Grid, Paper } from "@mui/material";
import axios from "axios";

import Home from "./pages/Home";
import NewGateway from "./pages/NewGateway";

import Header from "./components/Header";

import AppContext from "./context/AppContext";

const AppRoot = () => {
  const { setGateways } = useContext(AppContext);

  const [loading, setLoading] = useState(false);

  const getGateways = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_HOST}api/gateway`
      );
      setGateways(response.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
      } else if (error.request) {
        console.log("No response received");
      } else {
        console.log(error.message);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    getGateways();
  }, []);

  return (
    <Router>
      <Paper style={{ minHeight: "95vh" }} variant="outlined">
        <Grid container direction="column" justifyContent="center" padding={1}>
          <Header />
          {loading ? null : (
            <Routes>
              <Route path={"newgateway"} element={<NewGateway />} />
              <Route path={"*"} element={<Home />} />
            </Routes>
          )}
        </Grid>
      </Paper>
    </Router>
  );
};

export default AppRoot;
