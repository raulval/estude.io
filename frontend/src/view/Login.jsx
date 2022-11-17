import axios from "axios";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import FacebookIcon from "../assets/facebook_icon.png";
import GoogleIcon from "../assets/google_icon.png";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const [carregando, setCarregando] = useState(0);
  const baseURL = `${process.env.REACT_APP_BASE_URL}/auth/login`;

  const dispatch = useDispatch();
  const history = useHistory();

  function auth() {
    setCarregando(1);

    const headers = {
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json; charset=UTF-8",
    };

    const dadosLogin = {
      email: email,
      senha: senha,
    };

    axios
      .post(baseURL, dadosLogin, {
        headers: headers,
      })
      .then((res) => {
        setCarregando(0);
        toast.success("Seja bem vindo!");
        dispatch({
          type: "LOGIN",
          usuarioId: res.data.user._id,
          usuarioNome: res.data.user.nome,
          usuarioToken: res.data.token,
        });
        history.push("/home");
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
      <div className="container__principal">
        <div className="div__login">
          <div className="div__titulo">
            <h2>Entrar</h2>
          </div>
          <div className="div__inputs">
            <h5>Email</h5>
            <input
              type="text"
              className="form-control input"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <h5>Senha</h5>
            <input
              type="password"
              className="form-control input"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <div className="esqueceu__senha">
            <p className="esqueceu__senha">Esqueceu sua senha?</p>
          </div>
          {carregando ? (
            <Spinner variant="primary" animation="border" role="status">
              <span className="visually-hidden">Carregando...</span>
            </Spinner>
          ) : (
            <a>
              <button className="main__acessar" onClick={auth}>
                Acessar
              </button>
            </a>
          )}

          <div className="div__social">
            <a>
              <button className="entrar__google">
                <img src={GoogleIcon} className="icone__social" /> Entrar com o{" "}
                <b>Google</b>
              </button>
            </a>
            <a>
              <button className="entrar__facebook">
                <img src={FacebookIcon} className="icone__social" /> Entrar com
                o <b>Facebook</b>
              </button>
            </a>
          </div>
          <span className="criar__conta">
            Não possui uma conta?{" "}
            <span className="criar__conta" style={{ color: "#2C7AED" }}>
              <b>
                <a href="/cadastrar">Crie uma conta agora</a>
              </b>
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;
