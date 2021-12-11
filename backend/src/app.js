const express = require("express");
const cors = require("cors");
// const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());

// app.use(require("./database"));
require("./controllers/authController")(app);
require("./controllers/anotacoesController")(app);
require("./controllers/tarefasController")(app);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
