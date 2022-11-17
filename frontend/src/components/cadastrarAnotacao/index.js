import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";

function ModalAnotacao(props) {
  const usuarioToken = useSelector((state) => state.usuarioToken);
  const [show, setShow] = useState(true);

  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const baseURL = `${process.env.REACT_APP_BASE_URL}/api/anotacoes`;

  const headers = {
    "Content-Type": "application/json; charset=UTF-8",
    Authorization: `Bearer ${usuarioToken}`,
  };

  const dadosAnotacoes = {
    titulo: titulo,
    descricao: descricao,
  };

  function cadastrarAnotacao() {
    axios
      .post(baseURL, dadosAnotacoes, {
        headers: headers,
      })
      .then((res) => {
        toast.success("Anotação criada com sucesso");
        props.close();
      })
      .catch((err) => {
        toast.error(err.response.data.error);
      });
  }

  function atualizar(id) {
    if (id) {
      axios
        .put(`${baseURL}/${id}`, dadosAnotacoes, {
          headers: headers,
        })
        .then((res) => {
          toast.success("Anotação alterada com sucesso");
          props.close();
          window.location.reload();
        })
        .catch((err) => {
          toast.error(err.response.data.error);
        });
    }
  }

  useEffect(() => {
    props.item ? setTitulo(props.item.titulo) : setTitulo("");
    props.item ? setDescricao(props.item.descricao) : setDescricao("");
  }, []);

  return (
    <div className="modal">
      <div>
        <Toaster />
      </div>
      <Modal show={show} onHide={props.close}>
        <Modal.Header closeButton>
          {props.item ? (
            <Modal.Title>Alterar Anotação</Modal.Title>
          ) : (
            <Modal.Title>Criar Anotação</Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          <div className="my-2">
            Titulo da Anotação
            <input
              type="text"
              className="form-control"
              id="tituloAnotacao"
              onChange={(e) => setTitulo(e.target.value)}
              value={props.item && titulo}
            />
          </div>
          <div className="my-2">
            Conteúdo da Anotação
            <textarea
              className="form-control"
              id="textoAnotacao"
              onChange={(e) => setDescricao(e.target.value)}
              value={props.item && descricao}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.close}>
            Fechar
          </Button>
          <Button
            variant="primary"
            onClick={
              props.item
                ? () => {
                    atualizar(props.item._id);
                  }
                : cadastrarAnotacao
            }
          >
            Salvar alterações
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalAnotacao;
