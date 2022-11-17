import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import Anotacao from "../components/anotacao";
import CadastrarAnotacao from "../components/cadastrarAnotacao";
import NavBar from "../components/navbar-dashboard";
import "../styles/anotacoes.css";

function Anotacoes() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usuarioToken = useSelector((state) => state.usuarioToken);
  const [anotacoes, setAnotacoes] = useState([]);
  const baseURL = `${process.env.REACT_APP_BASE_URL}/api/anotacoes`;

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
        console.log(res.data.anotacoes);
        setAnotacoes(res.data.anotacoes);
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
        paginaSelecionada="anotacoes"
        btnTexto="Anotação"
        criar={handleShow}
      />
      <div className="tarefas-content">
        {anotacoes.map((item) => (
          <Anotacao item={item} />
        ))}
      </div>
      {show && <CadastrarAnotacao open={handleShow} close={handleClose} />}
    </>
  );
}

export default Anotacoes;
