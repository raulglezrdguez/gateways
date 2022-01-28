import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  IconButton,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

import AppContext from "../context/AppContext";

function ShowPeripheral({ peripheral }) {
  const { deletePeripheral, updatePeripheral } = useContext(AppContext);

  const [variables, setVariables] = useState({
    uid: peripheral.uid,
    vendor: peripheral.vendor,
    status: peripheral.status,
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

  const removePeripheral = async (id) => {
    const result = await deletePeripheral(peripheral);

    if (result.general) {
      showSnackbarMessage(JSON.stringify(result.general));
    }
  };

  const changePeripheral = async () => {
    const result = await updatePeripheral({
      id: peripheral.id,
      gatewayId: peripheral.gatewayId,
      ...variables,
    });

    if (result.general) {
      showSnackbarMessage(JSON.stringify(result.general));
    } else {
      setErrors(result);
    }
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        {edit ? (
          <Box
            component="div"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TextField
              required
              id="uid"
              name="uid"
              label="uid"
              type="number"
              value={variables.uid}
              onChange={(e) => {
                setVariables({
                  ...variables,
                  uid: e.target.value,
                });
                setErrors({});
              }}
              error={variables.uid === "0" || (errors.uid && errors.uid !== "")}
              helperText={variables.uid === "0" ? "Incorrect uid" : errors.uid}
            />
            <TextField
              required
              id="vendor"
              name="vendor"
              label="vendor"
              type="text"
              value={variables.vendor}
              onChange={(e) => {
                setVariables({
                  ...variables,
                  vendor: e.target.value,
                });
                setErrors({});
              }}
              error={
                variables.vendor.length < 4 ||
                (errors.vendor && errors.vendor !== "")
              }
              helperText={
                variables.vendor.length < 4 ? "Short vendor" : errors.vendor
              }
            />
            <FormControlLabel
              control={
                <Switch
                  checked={variables.status === "online"}
                  onChange={(event) => {
                    setVariables({
                      ...variables,
                      status: event.target.checked ? "online" : "offline",
                    });
                  }}
                  inputProps={{ "aria-label": "status" }}
                />
              }
              label={variables.status}
            />
          </Box>
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
                {peripheral.uid}
              </Typography>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ ml: 2 }}
                onClick={() => removePeripheral(peripheral.id)}
              >
                <DeleteIcon color="error" />
              </IconButton>
            </Box>

            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {peripheral.vendor}
            </Typography>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {peripheral.status}
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
            <Button size="small" onClick={changePeripheral}>
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

export default ShowPeripheral;
