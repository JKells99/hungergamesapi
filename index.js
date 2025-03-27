require ("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const districtRoutes = require("./routes/districts");
const tributeRoutes = require("./routes/tributes");
const gameRoutes = require("./routes/games");
const giftRoutes = require("./routes/gifts");
const db = require("./db");


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/districts", districtRoutes);
app.use("/tributes", tributeRoutes);
app.use("/games", gameRoutes);
app.use("/gifts", giftRoutes);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}`));
