import {
  SWITCH_DARKMODE,
  SET_GATEWAYS,
  ADD_GATEWAY,
  ADD_PERIPHERAL,
  DELETE_GATEWAY,
  DELETE_PERIPHERAL,
  UPDATE_GATEWAY,
  UPDATE_PERIPHERAL,
} from "./types";

const AppReducer = (state, action) => {
  const { type, payload } = action;
  let darkMode = null;
  let gateways = null;
  let peripherals = null;
  let index = -1;
  let index2 = -1;

  switch (type) {
    case SWITCH_DARKMODE:
      darkMode = !state.darkMode;
      localStorage.setItem("darkMode", darkMode);
      return { ...state, darkMode };
    case SET_GATEWAYS:
      return { ...state, gateways: payload };
    case ADD_GATEWAY:
      gateways = [...state.gateways, payload];
      return { ...state, gateways };
    case DELETE_GATEWAY:
      gateways = state.gateways.filter((g) => g.id !== payload);
      return { ...state, gateways };
    case UPDATE_GATEWAY:
      gateways = [...state.gateways];
      index = gateways.findIndex((g) => g.id === payload.id);
      if (index !== -1) {
        gateways[index].serial = payload.serial;
        gateways[index].name = payload.name;
        gateways[index].address = payload.address;
      }
      return { ...state, gateways };

    case ADD_PERIPHERAL:
      gateways = [...state.gateways];
      index = gateways.findIndex((g) => g.id === payload.gatewayId);
      if (index !== -1) {
        peripherals = [...gateways[index].peripherals, payload];
        gateways[index].peripherals = peripherals;
      }
      return { ...state, gateways };

    case DELETE_PERIPHERAL:
      gateways = [...state.gateways];
      index = gateways.findIndex((g) => g.id === payload.gatewayId);
      peripherals = [...gateways[index].peripherals].filter(
        (p) => p.id !== payload.id
      );
      gateways[index].peripherals = peripherals;
      return { ...state, gateways };
    case UPDATE_PERIPHERAL:
      gateways = [...state.gateways];
      index = gateways.findIndex((g) => g.id === payload.gatewayId);
      if (index !== -1) {
        peripherals = [...gateways[index].peripherals];
        index2 = peripherals.findIndex((p) => p.id === payload.id);
        if (index2 !== -1) {
          peripherals[index2].uid = payload.uid;
          peripherals[index2].vendor = payload.vendor;
          peripherals[index2].status = payload.status;
          gateways[index].peripherals = peripherals;

          return { ...state, gateways };
        }
      }
      return state;

    default:
      return state;
  }
};

export default AppReducer;
