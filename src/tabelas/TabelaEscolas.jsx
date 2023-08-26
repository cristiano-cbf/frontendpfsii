import { Table, Form, Row, Col } from "react-bootstrap";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { BotaoNovo } from "../templates/Botoes";
import Cabecalho2 from "../templates/Cabecalho2";
import { Container } from "react-bootstrap";
import { urlBase } from "../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";

export default function TabelaCadastroEscolas({
  escolas,
  setEscolas,
  filtro,
  aoMudarFiltro,
  setOnEdit,
  setExibeTabela,
}) {
  const linhas = [];

  const confirmOnDelete = (codigo) => {
    if (window.confirm(`Confirma a exclusão do item ${codigo}?`)) {
      handleDelete(codigo);
    }
  };

  const handleDelete = async (codigo) => {
    await axios
      .delete(`${urlBase}/escolas/${codigo}`)
      .then(({ data }) => {
        const newArray = escolas.filter((escola) => escola.codigo !== codigo);

        setEscolas(newArray);
        toast.info(data.mensagem);
      })
      .catch(({ response }) => toast.error(response.data.mensagem));

    setOnEdit(null);
  };

  const handleEdit = (item) => {
    setOnEdit(item);
    setExibeTabela(false);
  };

  escolas.forEach((escola, i) => {
    if (escola.nome.toLowerCase().indexOf(filtro.toLowerCase()) === -1) {
      return;
    }
    linhas.push(
      <LinhaEscola
        escola={escola}
        key={i}
        handleEdit={handleEdit}
        handleConfirm={confirmOnDelete}
      />
    );
  });

  return (
    <div>
      <Cabecalho2 texto1={"Consulta"} texto2={"Escolas"} />
      <Container className="mt-3">
        <div className="d-flex mb-3 justify-content-between">
          <BotaoNovo acaoBtnNovo={() => setExibeTabela(false)} />
          <Form>
            <Row>
              <Col>
                {" "}
                <Form.Control
                  type="text"
                  value={filtro}
                  placeholder="Pesquisar por nome..."
                  onChange={(e) => aoMudarFiltro(e.target.value)}
                  style={{ width: "300px" }}
                />
              </Col>
            </Row>
          </Form>
        </div>
        <Table hover style={{ fontSize: "14px" }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{linhas}</tbody>
        </Table>
      </Container>
    </div>
  );
}

function LinhaEscola({ escola, handleEdit, handleConfirm }) {
  return (
    <tr>
      <td>{escola.codigo}</td>
      <td>{escola.nome}</td>
      <td>{escola.descricao}</td>
      <td>
        <AiOutlineEdit size={20} onClick={() => handleEdit(escola)} />{" "}
        <AiOutlineDelete
          size={20}
          onClick={() => handleConfirm(escola.codigo)}
        />
      </td>
    </tr>
  );
}
