const http = require("http");
const path = require("path");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const gatewaysRoutes = require("./routes/gateways");
const peripheralsRoutes = require("./routes/peripherals");

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

const httpServer = http.createServer(app);

app.use("/api", gatewaysRoutes);
app.use("/api", peripheralsRoutes);

mongoose
  .connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb connected");
    return httpServer.listen({ port: process.env.PORT || 4000 });
  })
  .then(() => {
    console.log(`Server ready at http://localhost:${process.env.PORT || 4000}`);
  });
