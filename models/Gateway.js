const { model, Schema } = require("mongoose");

var validateIpv4 = function (email) {
  var re = /\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.|$)){4}\b/;
  return re.test(email);
};

const gatewaySchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    default: function () {
      return this._id;
    },
  },
  serial: { type: String, required: true, unique: true }, // a unique serial number
  name: { type: String, required: true }, // human-readable name
  address: {
    type: String,
    required: true,
    validate: {
      validator: validateIpv4,
      message: "Please fill a valid ipv4 address",
    },
  }, // ipv4
  // peripherals: { type: [peripheralSchema], default: [] }, // multiple associated peripheral devices.
  peripherals: [{ type: Schema.Types.ObjectId, ref: "Peripheral" }],

  createdAt: { type: String, required: true },
});

module.exports = model("Gateway", gatewaySchema);
