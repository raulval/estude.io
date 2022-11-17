import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import CadastrarTarefa from "../components/cadastrarTarefa";
import NavBar from "../components/navbar-dashboard";
import Tarefa from "../components/tarefa";
import "../styles/tarefas.css";

const baseURL = `${process.env.REACT_APP_BASE_URL}/api/tarefas`;

function Tarefas() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usuarioToken = useSelector((state) => state.usuarioToken);
  const [tarefas, setTarefas] = useState([]);
  const listaTarefas = [];

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${usuarioToken}`,
    };

    axios
      .get(baseURL, {
        headers: headers,
      })
      .then((res) => {
        console.log(res.data.tarefas);
        setTarefas(res.data.tarefas);
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  }, [show]);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <NavBar
        paginaSelecionada="tarefas"
        btnTexto="Tarefa"
        criar={handleShow}
      />
      <div className="tarefas-content">
        {tarefas.map((item) => (
          <Tarefa item={item} />
        ))}
      </div>
      {show && <CadastrarTarefa open={handleShow} close={handleClose} />}
    </>
  );
}

export default Tarefas;
