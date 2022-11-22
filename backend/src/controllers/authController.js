const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.json");

const router = express.Router();

router.post("/cadastrar", async (req, res) => {
  const { email, nome, senha } = req.body;

  try {
    if (await User.findOne({ email })) {
      return res.status(400).send({ error: "Email já cadastrado" });
    }

    if (!email || !nome || !senha) {
      return res.status(400).send({ error: "Dados em branco" });
    }

    if (!email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.?([a-z]+)?$/i)) {
      return res.status(400).send({ error: "Email inválido" });
    }

    const user = await User.create(req.body);

    user.senha = undefined;

    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: "Falha ao realizar Cadastro" });
  }
});

router.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const user = await User.findOne({ email }).select("+senha");

  if (!user) {
    return res.status(400).send({ error: "Email não encontrado" });
  }
  if (!(await bcrypt.compare(senha, user.senha))) {
    return res.status(400).send({ error: "Senha incorreta" });
  }

  user.senha = undefined;

  const token = jwt.sign({ id: user.id }, authConfig.secret, {
    expiresIn: 86400,
  });

  res.send({ user, token });
});

module.exports = (app) => app.use("/auth", router);
