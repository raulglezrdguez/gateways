const ObjectId = require("mongoose").Types.ObjectId;
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");

const express = require("express");
const router = express.Router();

const Gateway = require("../models/Gateway");
const Peripheral = require("../models/Peripheral");

const { validatePeripheralInput } = require("../util/validators");

dotenv.config({ path: "../.env" });

// new peripheral
router.post("/peripheral", async function (req, res) {
  if (req && req.body) {
    const { gatewayId, uid, vendor, status } = req.body;

    if (uid && vendor && status) {
      const { errors, valid } = validatePeripheralInput(uid, vendor, status);
      if (!valid) {
        return res.status(400).send(errors);
      }

      try {
        // Confirm gateway exists and has less than 10 peripherals
        let gatewayDB = await Gateway.findOne({ id: gatewayId });
        if (!gatewayDB) {
          return res.status(400).send({ gatewayId: "Gateway does not exists" });
        }

        if (gatewayDB.peripherals.length === 10) {
          return res
            .status(400)
            .send({ gatewayId: "Gateway contains all their peripherals" });
        }

        // confirm uid does not exists
        const peripheral = await Peripheral.findOne({ uid });
        if (peripheral) {
          return res.status(400).send({ uid: "Uid exists" });
        }

        let newPeripheral = new Peripheral({
          gatewayId,
          uid,
          vendor,
          status,
          createdAt: new Date().toISOString(),
        });

        newPeripheral = await newPeripheral.save();

        gatewayDB.peripherals.push(newPeripheral.id);

        await gatewayDB.save();

        return res.send({
          id: newPeripheral._id,
          createdAt: newPeripheral.createdAt,
          gatewayId: newPeripheral.gatewayId,
          status: newPeripheral.status,
          uid: newPeripheral.uid,
          vendor: newPeripheral.vendor,
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

// update peripheral
router.patch("/peripheral", async function (req, res) {
  if (req && req.body) {
    const { id, uid, vendor, status } = req.body;

    if (id) {
      const { errors, valid } = validatePeripheralInput(uid, vendor, status);
      if (!valid) {
        return res.status(400).send(errors);
      }

      try {
        let peripheralDB = await Peripheral.findOne({ id });
        if (peripheralDB) {
          if (uid !== peripheralDB.uid) {
            const test_uid = await Peripheral.findOne({
              $and: [{ id: { $ne: id } }, { uid: { $eq: uid } }],
            });

            if (test_uid) {
              return res
                .status(400)
                .send({ uid: "Peripheral uid already exists" });
            }
          }

          peripheralDB.uid = uid;
          peripheralDB.vendor = vendor;
          peripheralDB.status = status;

          peripheralDB = await peripheralDB.save();

          return res.send({
            id: peripheralDB._id,
            uid: peripheralDB.uid,
            vendor: peripheralDB.vendor,
            status: peripheralDB.status,
          });
        } else {
          return res.status(404).send({ id: "Peripheral not found" });
        }
      } catch (err) {
        return res.status(500).send({ general: "Internal server error" });
      }
    } else {
      return res.status(400).send({ id: "Id needed" });
    }
  }
});

// delete peripheral
router.delete("/peripheral", async function (req, res) {
  if (req && req.body) {
    const { id } = req.body;

    if (id) {
      try {
        let peripheralDB = await Peripheral.findOne({ id });
        if (peripheralDB) {
          let gatewayDB = await Gateway.findOne({ id: peripheralDB.gatewayId });
          if (gatewayDB) {
            await Gateway.updateOne(
              { id: peripheralDB.gatewayId },
              { $pull: { peripherals: id } }
            );

            await Peripheral.deleteOne({ id });

            return res.send({
              id,
            });
          } else {
            return res.status(404).send({ general: "Gateway not found" });
          }
        } else {
          return res.status(404).send({ general: "Peripheral not found" });
        }
      } catch (err) {
        return res.status(500).send({ general: "Internal server error" });
      }
    } else {
      return res.status(400).send({ general: "Id needed" });
    }
  }
});

// get peripherals
router.get("/peripheral", async function (req, res) {
  if (req && req.query) {
    const { id } = req.query;

    if (id) {
      try {
        const peripheral = await Peripheral.findOne({ id });

        return res.status(200).send(peripheral);
      } catch (err) {
        return res.status(500).send({ general: "Internal server error" });
      }
    }
  }

  try {
    const peripherals = await Peripheral.find();

    return res.status(200).send(peripherals);
  } catch (err) {
    return res.status(500).send({ general: "Internal server error" });
  }
});

module.exports = router;
