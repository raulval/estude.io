const mongoose = require("../database");

const TarefasSchema = new mongoose.Schema({
  titulo: {
    type: String,
    require: true,
  },
  descricao: {
    type: String,
    require: true,
  },
  materia: {
    type: String,
    require: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  dataHoraEntrega: {
    type: Date,
  },
  criacao: {
    type: Date,
    default: Date.now,
  },
});

const Tarefas = mongoose.model("Tarefas", TarefasSchema);

module.exports = Tarefas;
