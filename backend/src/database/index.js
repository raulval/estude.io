const mongoose = require("mongoose");
require("dotenv").config();

let URI = String(process.env.MONGO_URI);
let database;

if (process.env.NODE_ENV !== "test") {
  database = mongoose
    .connect(URI)
    .then(() => {
      console.log(`Conectado ao banco!`);
    })
    .catch((error) => {
      console.error(`Erro ao conectar no banco... `, error);
      process.exit(1);
    });
}

module.exports = database;
