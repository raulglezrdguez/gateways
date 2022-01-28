import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import { re_ipv4 } from "../util/regex";

import AppContext from "../context/AppContext";
import ShowPeripherals from "./ShowPeripherals";

function ShowGateway({ gateway }) {
  const { deleteGateway, updateGateway } = useContext(AppContext);

  const [variables, setVariables] = useState({
    serial: gateway.serial,
    name: gateway.name,
    address: gateway.address,
  });
  const [errors, setErrors] = useState({});

  const [snackbarOpened, setSnackbarOpened] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("message");

  const [edit, setEdit] = useState(false);

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

  const removeGateway = async (id) => {
    const result = await deleteGateway(gateway.id);

    if (result.general) {
      showSnackbarMessage(JSON.stringify(result.general));
    }
  };

  const changeGateway = async () => {
    const result = await updateGateway({ id: gateway.id, ...variables });

    if (result.general) {
      showSnackbarMessage(JSON.stringify(result.general));
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {edit ? (
          <form>
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
              helperText={
                variables.name.length < 4 ? "Short name" : errors.name
              }
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
          </form>
        ) : (
          <>
            <Box
              component="div"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" component="div">
                {gateway.name}
              </Typography>
              {gateway.peripherals.length === 0 && (
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ ml: 2 }}
                  onClick={() => removeGateway(gateway.id)}
                >
                  <DeleteIcon color="error" />
                </IconButton>
              )}
            </Box>

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {gateway.serial}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {gateway.address}
            </Typography>
          </>
        )}
      </CardContent>
      <CardActions
        disableSpacing
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {edit ? (
          <>
            <Button size="small" onClick={changeGateway}>
              Save
            </Button>
            <Button size="small" onClick={() => setEdit(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <Button size="small" onClick={() => setEdit(true)}>
            Edit
          </Button>
        )}
      </CardActions>
      <CardContent>
        <ShowPeripherals gateway={gateway} />
      </CardContent>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarOpened}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={snackbarAction}
      />
    </Card>
  );
}

export default ShowGateway;
