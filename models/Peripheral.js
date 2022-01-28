const { model, Schema } = require("mongoose");

const peripheralSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    default: function () {
      return this._id;
    },
  },
  gatewayId: { type: Schema.Types.ObjectId, ref: "Gateway" },
  uid: { type: Number, required: true, unique: true }, // a UID
  vendor: { type: String, required: true }, // a unique serial number
  createdAt: { type: String, required: true }, // date created
  status: {
    type: String,
    required: true,
    enum: ["online", "offline"],
  },
});

module.exports = model("Peripheral", peripheralSchema);
