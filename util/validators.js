const re_email =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const re_ipv4 = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;

module.exports.validateGatewayInput = (serial, name, address) => {
  const errors = {};

  if (serial.trim() === "") {
    errors.serial = "Serial number is empty";
  }
  if (name.trim() === "") {
    errors.name = "Human-readable name is empty";
  }
  if (address.trim() === "") {
    errors.address = "Ipv4 address is empty";
  } else {
    if (!address.match(re_ipv4)) {
      errors.email = "Incorrect ipv4 address";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validatePeripheralInput = (uid, vendor, status) => {
  const errors = {};

  if (!uid) {
    errors.uid = "uid is empty";
  }
  if (vendor.trim() === "") {
    errors.vendor = "Vendor is empty";
  }
  if (status.trim() === "") {
    errors.status = "Status is empty";
  }
  if (!["online", "offline"].includes(status)) {
    errors.status = "Status is wrong";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
