const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("./database");

// const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

require("./controllers/authController")(app);
require("./controllers/anotacoesController")(app);
require("./controllers/tarefasController")(app);

module.exports = app;
