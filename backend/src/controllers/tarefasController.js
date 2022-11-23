const express = require("express");
const authMiddleware = require("../middlewares/auth");

const Tarefas = require("../models/tarefas");

const router = express.Router();

router.use(authMiddleware);

router.get("/", async (req, res) => {
  try {
    const tarefas = await Tarefas.find().populate("usuario");

    return res.send({ tarefas });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao carregar tarefas" });
  }
});

router.get("/:tarefaId", async (req, res) => {
  try {
    const tarefa = await Tarefas.findById(req.params.tarefaId).populate(
      "usuario"
    );

    return res.send({ tarefa });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao carregar tarefa" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { titulo, descricao, materia, dataHoraEntrega } = req.body;

    if (!titulo || !dataHoraEntrega) {
      return res.status(400).send({ error: "Dados em branco" });
    }

    const tarefa = await Tarefas.create({
      titulo,
      descricao,
      materia,
      dataHoraEntrega,
      usuario: req.userId,
    });

    await tarefa.save();

    return res.send({ tarefa });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao criar uma tarefa" });
  }
});

router.put("/:tarefaId", async (req, res) => {
  try {
    const { titulo, descricao, materia, dataHoraEntrega } = req.body;

    const tarefa = await Tarefas.findByIdAndUpdate(
      req.params.tarefaId,
      {
        titulo,
        descricao,
        materia,
        dataHoraEntrega,
      },
      { new: true }
    );

    await tarefa.save();

    return res.send({ tarefa });
  } catch (err) {
    return res.status(400).send({ error: "Erro ao editar tarefa" });
  }
});

router.delete("/:tarefaId", async (req, res) => {
  try {
    await Tarefas.findByIdAndRemove(req.params.tarefaId);

    return res.send();
  } catch (err) {
    return res.status(400).send({ error: "Erro ao deletar tarefa" });
  }
});

module.exports = (app) => app.use("/api/tarefas", router);
