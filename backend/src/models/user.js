const mongoose = require("../database");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    lowercase: true,
  },
  senha: {
    type: String,
    require: true,
    select: false,
  },
});

UserSchema.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
