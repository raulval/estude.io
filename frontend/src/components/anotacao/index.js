import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { BsThreeDotsVertical } from "react-icons/bs";
import { useSelector } from "react-redux";
import ModalAnotacao from "../cadastrarAnotacao";
import "./anotacao.css";

var id;
const baseURL = "http://localhost:8080/api/anotacoes";

function Tarefa(props) {
  const usuarioToken = useSelector((state) => state.usuarioToken);
  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${usuarioToken}`,
  };
  function excluir(id) {
    if (id) {
      axios
        .delete(`${baseURL}/${id}`, {
          headers: headers,
        })
        .then((res) => {
          toast.success("Anotação deletada com sucesso");
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    }
  }

  id = props.item._id;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="card">
        <div className="card-body">
          <div className="title-btn">
            <h5
              className="card-title"
              style={{ fontWeight: "700", marginTop: 8 }}
            >
              {props.item.titulo}
            </h5>
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
          <p className="card-text">{props.item.descricao}</p>
        </div>
      </div>
      {show == true && (
        <ModalAnotacao
          item={props.item}
          close={handleClose}
          show={handleShow}
        />
      )}
    </>
  );
}

export default Tarefa;
