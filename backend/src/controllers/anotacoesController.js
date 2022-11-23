const express = require("express");
const authMiddleware = require("../middlewares/auth");

const Anotacoes = require("../models/anotacoes");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const anotacoes = await Anotacoes.find().populate("usuario");

    return res.send({ anotacoes });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao carregar anotações" });
  }
});

router.get("/:anotacaoId", async (req, res) => {
  try {
    const anotacao = await Anotacoes.findById(req.params.anotacaoId).populate(
      "usuario"
    );

    return res.send({ anotacao });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao carregar anotação" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    if (!titulo || !descricao) {
      return res.status(400).send({ error: "Preencha todos os campos" });
    }

    const anotacao = await Anotacoes.create({
      titulo,
      descricao,
      usuario: req.userId,
    });

    await anotacao.save();

    return res.send({ anotacao });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao criar uma anotação" });
  }
});

router.put("/:anotacaoId", async (req, res) => {
  try {
    const { titulo, descricao } = req.body;

    const anotacao = await Anotacoes.findByIdAndUpdate(
      req.params.anotacaoId,
      {
        titulo,
        descricao,
      },
      { new: true }
    );

    await anotacao.save();

    return res.send({ anotacao });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao editar anotação" });
  }
});

router.delete("/:anotacaoId", async (req, res) => {
  try {
    await Anotacoes.findByIdAndRemove(req.params.anotacaoId);

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: "Erro ao deletar anotação" });
  }
});

module.exports = (app) => app.use("/api/anotacoes", router);
