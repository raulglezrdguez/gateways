const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

const express = require("express");
const router = express.Router();

const Gateway = require("../models/Gateway");

const { validateGatewayInput } = require("../util/validators");

dotenv.config({ path: "../.env" });

// new gateway
router.post("/gateway", async function (req, res) {
  if (req && req.body) {
    const { serial, name, address } = req.body;

    if (serial && name && address) {
      const { errors, valid } = validateGatewayInput(serial, name, address);
      if (!valid) {
        return res.status(400).send(errors);
      }

      try {
        // Confirm serial does not exist
        let gatewayDB = await Gateway.findOne({ serial });
        if (gatewayDB) {
          return res.status(400).send({ serial: "Serial already exists" });
        }

        let newGateway = new Gateway({
          serial,
          name,
          address,
          peripherals: [],
          createdAt: new Date().toISOString(),
        });

        newGateway = await newGateway.save();

        return res.send({
          id: newGateway._id,
          serial: newGateway.serial,
          name: newGateway.name,
          address: newGateway.address,
          peripherals: [],
        });
      } catch (err) {
        return res.status(500).send({ general: "Internal server error" });
      }
    } else {
      return res.status(400).send({ general: "Invalid data" });
    }
  } else {
    return res.status(400).send({ general: "Invalid data" });
  }
});

// update gateway
router.patch("/gateway", async function (req, res) {
  if (req && req.body) {
    const { id, serial, name, address } = req.body;

    if (id) {
      const { errors, valid } = validateGatewayInput(serial, name, address);
      if (!valid) {
        return res.status(400).send(errors);
      }

      try {
        let gatewayDB = await Gateway.findOne({ id });
        if (gatewayDB) {
          if (serial !== gatewayDB.serial) {
            const test_serial = await Gateway.findOne({ serial });

            if (test_serial) {
              return res
                .status(400)
                .send({ serial: "Gateway serial already exists" });
            }
          }

          gatewayDB.serial = serial;
          gatewayDB.name = name;
          gatewayDB.address = address;

          gatewayDB = await gatewayDB.save();

          return res.send({
            id: gatewayDB._id,
            serial: gatewayDB.serial,
            name: gatewayDB.name,
            address: gatewayDB.address,
          });
        } else {
          return res.status(404).send({ id: "Gateway not found" });
        }
      } catch (err) {
        return res.status(500).send({ general: "Internal server error" });
      }
    } else {
      return res.status(400).send({ id: "Id needed" });
    }
  } else {
    return res.status(400).send({ id: "Id needed" });
  }
});

// delete gateway
router.delete("/gateway", async function (req, res) {
  if (req && req.body) {
    const { id } = req.body;

    if (id) {
      try {
        let gatewayDB = await Gateway.findOne({ id });
        if (gatewayDB) {
          if (gatewayDB.peripherals.length > 0) {
            return res
              .status(400)
              .send({ serial: "Gateway contains peripherals" });
          } else {
            await Gateway.deleteOne({ id });

            return res.send({
              id,
            });
          }
        } else {
          return res.status(404).send({ id: "Gateway not found" });
        }
      } catch (err) {
        return res.status(500).send({ general: "Internal server error" });
      }
    } else {
      return res.status(400).send({ id: "Id needed" });
    }
  } else {
    return res.status(400).send({ id: "Id needed" });
  }
});

router.get("/gateway", async function (req, res) {
  if (req && req.query) {
    const { id } = req.query;
    console.log(id);

    if (id) {
      try {
        const gateway = await Gateway.findOne({ id }).select("-_id");

        return res.status(200).send(gateway);
      } catch (err) {
        return res.status(500).send({ general: "Internal server error" });
      }
    }
  }

  try {
    const gateways = await Gateway.find()
      .populate({
        path: "peripherals",
        select: "id uid vendor createdAt status gatewayId -_id",
      })
      .select("-_id");

    return res.status(200).send(gateways);
  } catch (err) {
    return res.status(500).send({ general: "Internal server error" });
  }
});

module.exports = router;
