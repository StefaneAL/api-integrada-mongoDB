const express = require("express");
const cors = require("cors");
const app = express();

const travelsRoutes = require("./routes/travelsRoutes");

app.use(cors());

app.use(express.json());
app.use("/", travelsRoutes);

module.exports = app;