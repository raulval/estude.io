import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import ModalTarefa from "../cadastrarTarefa";
import "./tarefa.css";

var id;

const baseURL = "http://localhost:8080/api/tarefas";

function Tarefa(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const usuarioToken = useSelector((state) => state.usuarioToken);
  const [horaFormatada, setHoraFormatada] = useState("00:00");

  var data = new Date(props.item.dataHoraEntrega);
  id = props.item._id;

  function adicionaZero(numero) {
    if (numero <= 9) return "0" + numero;
    else return numero;
  }

  var rand = Math.floor(Math.random() * 360);
  function excluir(id) {
    if (id) {
      const headers = {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${usuarioToken}`,
      };

      axios
        .delete(`${baseURL}/${id}`, {
          headers: headers,
        })
        .then((res) => {
          toast.success("Tarefa deletada com sucesso");
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    }
  }
  useEffect(() => {
    props.item &&
      setHoraFormatada(
        adicionaZero(data.getHours()) + ":" + adicionaZero(data.getMinutes())
      );
  }, []);

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="card">
        <div className="card-body">
          <div className="title-btn">
            <h3
              className="card-title"
              style={{ fontWeight: "700", marginTop: 8 }}
            >
              {props.item.materia}
            </h3>
            <button
              className="btn btnDetalhes"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
            >
              <BsThreeDotsVertical />
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li className="dropdown-item" onClick={handleShow}>
                Alterar
              </li>
              <li
                className="dropdown-item"
                onClick={() => {
                  excluir(props.item._id);
                }}
              >
                Excluir
              </li>
            </ul>
          </div>

          <div
            className="div-marcacao"
            style={{ backgroundColor: "hsl(" + rand + ", 84%, 55%)" }}
          ></div>
          <h5
            className="card-title"
            style={{ fontWeight: "700", marginTop: -4 }}
          >
            {props.item.titulo}
          </h5>
          <p className="card-text">{props.item.descricao}</p>
        </div>
        <p className="data-hora">
          Data de entrega:{" "}
          <b>
            {data.toLocaleDateString()} às {horaFormatada}{" "}
          </b>
        </p>
      </div>
      {show == true && (
        <ModalTarefa item={props.item} close={handleClose} show={handleShow} />
      )}
    </>
  );
}

export default Tarefa;
