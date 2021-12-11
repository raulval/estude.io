const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/estudeio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log("Conectado ao banco!");
  })
  .catch((err) => {
    console.log("Erro ao conectar no banco... " + err);
  });

module.exports = mongoose;
