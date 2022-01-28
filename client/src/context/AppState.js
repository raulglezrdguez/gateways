import React, { useReducer } from "react";
import { ThemeProvider } from "@mui/material/styles";
import axios from "axios";

import AppContext from "./AppContext";
import AppReducer from "./AppReducer";

import { darkTheme, lightTheme } from "./theme";
import {
  SWITCH_DARKMODE,
  ADD_GATEWAY,
  ADD_PERIPHERAL,
  DELETE_GATEWAY,
  DELETE_PERIPHERAL,
  SET_GATEWAYS,
  UPDATE_GATEWAY,
  UPDATE_PERIPHERAL,
} from "./types";

let darkMode = localStorage.getItem("darkMode");
darkMode = darkMode === "true";

const initialState = {
  darkMode,
  gateways: [],
};

const AppState = (props) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const switchDarkMode = () => {
    dispatch({ type: SWITCH_DARKMODE, payload: "" });
  };

  const setGateways = (payload) => {
    dispatch({ type: SET_GATEWAYS, payload });
  };
  const addGateway = (payload) => {
    dispatch({ type: ADD_GATEWAY, payload });
  };
  const updateGateway = async (payload) => {
    try {
      const result = await axios.patch(
        `${process.env.REACT_APP_SERVER_HOST}api/gateway`,
        payload
      );
      dispatch({ type: UPDATE_GATEWAY, payload });

      return result.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return { general: "No response received" };
      } else {
        return { general: error.message };
      }
    }
  };

  /** delete gateway */
  const deleteGateway = async (payload) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_SERVER_HOST}api/gateway`,
        {
          data: { id: payload },
        }
      );
      dispatch({ type: DELETE_GATEWAY, payload });
      return result.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return { general: "No response received" };
      } else {
        return { general: error.message };
      }
    }
  };

  /** add peripheral */
  const addPeripheral = async (payload) => {
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER_HOST}api/peripheral`,
        payload
      );
      dispatch({ type: ADD_PERIPHERAL, payload: result.data });

      return {};
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return { general: "No response received" };
      } else {
        return { general: error.message };
      }
    }
  };
  const updatePeripheral = async (payload) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_SERVER_HOST}api/peripheral`,
        payload
      );
      dispatch({ type: UPDATE_PERIPHERAL, payload });
      return {};
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return { general: "No response received" };
      } else {
        return { general: error.message };
      }
    }
  };
  const deletePeripheral = async (payload) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_SERVER_HOST}api/peripheral`,
        {
          data: { id: payload.id },
        }
      );
      dispatch({ type: DELETE_PERIPHERAL, payload });
      return result.data;
    } catch (error) {
      if (error.response) {
        return error.response.data;
      } else if (error.request) {
        return { general: "No response received" };
      } else {
        return { general: error.message };
      }
    }
  };

  const theme = state.darkMode ? darkTheme : lightTheme;

  return (
    <AppContext.Provider
      value={{
        darkMode: state.darkMode,
        switchDarkMode,
        gateways: state.gateways,
        setGateways,
        addGateway,
        updateGateway,
        deleteGateway,
        addPeripheral,
        updatePeripheral,
        deletePeripheral,
      }}
    >
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </AppContext.Provider>
  );
};

export default AppState;
