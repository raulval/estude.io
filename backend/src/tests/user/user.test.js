const mongoose = require("mongoose");
const User = require("../../models/user");
const request = require("supertest");
const app = require("../../app");
const assert = require("assert");

const req = request(app);

describe("Cadastro do usuário", () => {
  beforeAll(async () => {
    try {
      await mongoose.connect(String(process.env.MONGO_URI_TEST), {
        useNewUrlParser: true,
      });
      console.log("Conectado ao banco de testes!");
    } catch (err) {
      console.error("Erro ao conectar no banco de testes", err);
    }
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  test("nao deve criar o usuário com email invalido", async () => {
    const user = {
      nome: "Teste",
      email: "teste@email",
      senha: "teste",
    };

    await req
      .post("/auth/cadastrar")
      .send(user)
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("error");
      });
  });

  test("nao deve criar o usuário com corpo vazio", async () => {
    const user = {
      nome: "",
      email: "",
      senha: "",
    };

    await req
      .post("/auth/cadastrar")
      .send(user)
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("error");
      });
  });

  test("deve cadastrar o usuário", async () => {
    const user = {
      nome: "Teste",
      email: "teste@email.com",
      senha: "teste",
    };

    await req
      .post("/auth/cadastrar")
      .send(user)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("user");
      });
  });

  test("nao deve criar o usuário com um email já existente", async () => {
    const user = {
      nome: "Teste",
      email: "teste@email.com",
      senha: "teste",
    };

    await req
      .post("/auth/cadastrar")
      .send(user)
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("error");
      });
  });

  test("nao deve logar o usuário com email ou senha invalidos", async () => {
    const user = {
      email: "teste",
      senha: "teste",
    };

    await req
      .post("/auth/login")
      .send(user)
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("error");
      });
  });

  test("deve logar o usuário", async () => {
    const user = {
      email: "teste@email.com",
      senha: "teste",
    };

    await req
      .post("/auth/login")
      .send(user)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("user");
      });
  });
});
