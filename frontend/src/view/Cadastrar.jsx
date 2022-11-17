import axios from "axios";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "../styles/cadastrar.css";

function Login() {
  const [nome, setNome] = useState();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [carregando, setCarregando] = useState(0);
  const baseURL = `${process.env.REACT_APP_BASE_URL}/auth/cadastrar`;

  const dispatch = useDispatch();
  const history = useHistory();
  function cadastrar() {
    setCarregando(1);

    const dadosCadastro = {
      nome: nome,
      email: email,
      senha: senha,
    };

    const headers = {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=UTF-8",
    };

    axios
      .post(baseURL, dadosCadastro, {
        headers: headers,
      })
      .then((res) => {
        setCarregando(0);
        toast.success("Cadastro realizado com sucesso");
        history.push("/login");
      })
      .catch((err) => {
        toast.error(err.response.data.error);
        setCarregando(0);
      });
  }

  return (
    <>
      {useSelector((state) => state.usuarioLogado) > 0 ? (
        <Redirect to="/anotacoes" />
      ) : null}
      <div>
        <Toaster />
      </div>
      <div className="container__cadastro">
        <div className="div__cadastro">
          <div className="div__titulo">
            <h2>Cadastre-se</h2>
          </div>
          <div className="div__inputs">
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              className="form-control input"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className="form-control input"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              name="senha"
              className="form-control input"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          {/* {erro && (
            <Alert
              variant="danger"
              style={{ marginTop: "25px", marginBottom: "-20px" }}
            >
              {erro}
            </Alert>
          )} */}
          {carregando ? (
            <Spinner variant="primary" animation="border" role="status">
              <span className="visually-hidden">Carregando...</span>
            </Spinner>
          ) : (
            <button className="main__acessar" onClick={cadastrar}>
              Cadastrar
            </button>
          )}

          <span className="criar__conta">
            Já possui uma conta?{" "}
            <span className="criar__conta" style={{ color: "#2C7AED" }}>
              <b>
                <a href="/login">Faça o login agora</a>
              </b>
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;
