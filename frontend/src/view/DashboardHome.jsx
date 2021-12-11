import React from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import NavBar from "../components/navbar-dashboard";
import "../styles/dashboard-home.css";

function DashboardHome() {
  const dispatch = useDispatch();

  function sair() {
    dispatch({ type: "LOGOUT" });
  }

  const usuarioNome = useSelector((state) => state.usuarioNome);
  return (
    <>
      {useSelector((state) => state.usuarioLogado) == 0 ? (
        <Redirect to="/" />
      ) : null}
      <div>
        <Toaster />
      </div>
      <NavBar paginaSelecionada="home" sair={sair} />
      <div className="home-content">
        {usuarioNome && <h2>Olá, seja bem-vindo {usuarioNome}</h2>}
      </div>
    </>
  );
}

export default DashboardHome;
