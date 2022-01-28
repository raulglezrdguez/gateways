import React, { useContext, useState } from "react";
import {
  Button,
  IconButton,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

import RedTypography from "../components/RedTypography";
import { re_ipv4 } from "../util/regex";

import AppContext from "../context/AppContext";

function NewGateway() {
  const { addGateway } = useContext(AppContext);
  const [variables, setVariables] = useState({
    serial: "",
    name: "",
    address: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbarOpened, setSnackbarOpened] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("message");

  const showSnackbarMessage = (message) => {
    setSnackbarMessage(message);
    setSnackbarOpened(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpened(false);
  };

  const snackbarAction = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnackbar}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const newGateway = async () => {
    try {
      setLoading(true);
      const result = await axios.post(
        `${process.env.REACT_APP_SERVER_HOST}api/gateway`,
        variables
      );
      addGateway(result.data);
      showSnackbarMessage("Gateway created!");
    } catch (error) {
      if (error.response) {
        error.response.data ? setErrors(error.response.data) : setErrors({});
      } else if (error.request) {
        // setErrors({ general: "No response received" });
        showSnackbarMessage("No response received");
      } else {
        // setErrors({ general: error.message });
        showSnackbarMessage(error.message);
      }
    }
    setLoading(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    newGateway();
  };

  return (
    <Stack direction="column" spacing={2} alignItems="center" marginTop={3}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} alignItems="center">
          <Typography variant="h6" gutterBottom component="div">
            New gateway
          </Typography>
          <TextField
            required
            id="serial"
            name="serial"
            label="Serial number"
            type="text"
            value={variables.serial}
            onChange={(e) => {
              setVariables({
                ...variables,
                serial: e.target.value.trim(),
              });
              setErrors({});
            }}
            error={
              variables.serial.length < 4 ||
              (errors.serial && errors.serial !== "")
            }
            helperText={
              variables.serial.length < 4 ? "Short serial" : errors.serial
            }
          />
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            type="text"
            value={variables.name}
            onChange={(e) => {
              setVariables({
                ...variables,
                name: e.target.value,
              });
              setErrors({});
            }}
            error={
              variables.name.length < 4 || (errors.name && errors.name !== "")
            }
            helperText={variables.name.length < 4 ? "Short name" : errors.name}
          />

          <TextField
            required
            id="address"
            name="address"
            label="Ipv4 address"
            type="string"
            value={variables.address}
            onChange={(e) => {
              setVariables({
                ...variables,
                address: e.target.value,
              });
              setErrors({});
            }}
            error={
              !re_ipv4.test(String(variables.address).toLowerCase()) ||
              (errors.address && errors.address !== "")
            }
            helperText={
              !re_ipv4.test(String(variables.address).toLowerCase())
                ? "Incorrect address"
                : errors.address
            }
          />

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={
              variables.serial.length < 4 ||
              variables.name.length < 4 ||
              !re_ipv4.test(String(variables.address).toLowerCase()) ||
              loading
            }
          >
            Add gateway
          </Button>
          {errors.general ? (
            <RedTypography>{errors.general}</RedTypography>
          ) : null}
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={snackbarOpened}
            autoHideDuration={5000}
            onClose={handleCloseSnackbar}
            message={snackbarMessage}
            action={snackbarAction}
          />
        </Stack>
      </form>
    </Stack>
  );
}

export default NewGateway;
