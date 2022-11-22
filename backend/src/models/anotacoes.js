const mongoose = require("mongoose");

const AnotacoesSchema = new mongoose.Schema({
  titulo: {
    type: String,
    require: true,
  },
  descricao: {
    type: String,
    require: true,
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  criacao: {
    type: Date,
    default: Date.now,
  },
});

const Anotacoes = mongoose.model("Anotacoes", AnotacoesSchema);

module.exports = Anotacoes;
