import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import AppContext from "../context/AppContext";
import ShowPeripheral from "./ShowPeripheral";

function ShowPeripherals({ gateway }) {
  const { addPeripheral } = useContext(AppContext);

  const [visible, setVisible] = useState(false);
  const [addVisible, setAddVisible] = useState(false);

  const [variables, setVariables] = useState({
    uid: "",
    vendor: "",
    status: "online",
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

  const createPeripheral = async () => {
    const result = await addPeripheral({ ...variables, gatewayId: gateway.id });

    if (result.general) {
      showSnackbarMessage(JSON.stringify(result.general));
    } else {
      setErrors(result);
    }
  };

  return (
    <Stack direction="column" spacing={2} alignItems="center" marginTop={0}>
      <Box
        component="div"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" component="div">
          Peripherals ({gateway.peripherals.length})
        </Typography>
        {gateway.peripherals.length < 10 && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2 }}
            onClick={() => setAddVisible(!addVisible)}
          >
            <AddIcon color="secondary" />
          </IconButton>
        )}
        {gateway.peripherals.length > 0 && (
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2 }}
            onClick={() => setVisible(!visible)}
          >
            {!visible ? (
              <VisibilityIcon color="secondary" />
            ) : (
              <VisibilityOffIcon color="secondary" />
            )}
          </IconButton>
        )}
      </Box>
      {gateway.peripherals.length < 10 && addVisible && (
        <>
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
          <Button
            type="button"
            variant="contained"
            size="small"
            disabled={
              variables.uid === "0" || variables.vendor.length < 4 || loading
            }
            onClick={createPeripheral}
          >
            Add peripheral
          </Button>
        </>
      )}
      {visible && (
        <Stack direction="column" spacing={2} alignItems="center" marginTop={3}>
          {gateway.peripherals.map((p) => (
            <ShowPeripheral key={p.id} peripheral={p} />
          ))}
        </Stack>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackbarOpened}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={snackbarAction}
      />
    </Stack>
  );
}

export default ShowPeripherals;
