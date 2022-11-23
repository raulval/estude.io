const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../../app");
const { connectDB, dropDB, dropCollections } = require("../setupTestsDB");

const req = request(app);

describe("Tarefas Test", () => {
  let token;
  let tarefaId;
  beforeAll(async () => {
    try {
      await connectDB();
    } catch (error) {
      console.log("Erro ao conectar ao banco de teste");
    }

    //get user token
    await req.post("/auth/cadastrar").send({
      nome: "Teste",
      email: "teste@email.com",
      senha: "teste",
    });
    await req
      .post("/auth/login")
      .send({
        email: "teste@email.com",
        senha: "teste",
      })
      .then((res) => {
        token = res.body.token;
      });
  });

  afterAll(async () => {
    await dropCollections();
    await dropDB();
  });

  test("deve criar tarefa", async () => {
    const tarefa = {
      titulo: "Tarefa Teste",
      descricao: "Teste de descrição",
      materia: "Matemática",
      dataHoraEntrega: `${new Date().toISOString()}`,
    };

    await req
      .post("/api/tarefas")
      .send(tarefa)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        tarefaId = res.body.tarefa._id;
        expect(res.body).toHaveProperty("tarefa");
      });
  });

  test("deve listar apenas a tarefa do usuário selecionada", async () => {
    await req
      .get(`/api/tarefas/${tarefaId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("tarefa");
      });
  });

  test("deve listar todas as tarefas do usuário", async () => {
    await req
      .get("/api/tarefas")
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("tarefas");
      });
  });

  test("deve dar erro 401 quando não passa o token de usuário", async () => {
    await req
      .get("/api/tarefas")
      .expect(401)
      .then((res) => {
        expect(res.body).toHaveProperty("error");
      });
  });

  test("não deve criar tarefa enquanto campos estiver vazios", async () => {
    const tarefa = {
      titulo: "",
      descricao: "Teste de descrição",
      materia: "Matemática",
      dataHoraEntrega: `${new Date().toISOString()}`,
    };

    await req
      .post("/api/tarefas")
      .send(tarefa)
      .set("Authorization", `Bearer ${token}`)
      .expect(400)
      .then((res) => {
        expect(res.body).toHaveProperty("error");
      });
  });

  test("deve alterar tarefa selecionada", async () => {
    const tarefa = {
      titulo: "Tarefa Alterada",
      descricao: "Teste de descrição",
      materia: "Matemática",
      dataHoraEntrega: `${new Date().toISOString()}`,
    };

    await req
      .put(`/api/tarefas/${tarefaId}`)
      .send(tarefa)
      .set("Authorization", `Bearer ${token}`)
      .expect(200)
      .then((res) => {
        expect(res.body).toHaveProperty("tarefa");
      });
  });

  test("deve remover tarefa selecionada", async () => {
    await req
      .delete(`/api/anotacoes/${tarefaId}`)
      .set("Authorization", `Bearer ${token}`)
      .expect(200);
  });
});
