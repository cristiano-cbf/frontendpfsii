import { Container, Col, Form, Row } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import MenuFormulario from "../templates/MenuFormulario";
import Cabecalho2 from "../templates/Cabecalho2";
import { urlBase } from "../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";

export default function FormEscola({
  onEdit,
  setExibeTabela,
  setOnEdit,
  getEscolas,
}) {
  const [validated, setValidated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const escola = ref.current;
      escola.codigo.value = onEdit.codigo;
      escola.nome.value = onEdit.nome;
      escola.descricao.value = onEdit.descricao;
    }
  }, [onEdit]);

  const handleBackButton = () => {
    if (onEdit) setOnEdit(null);
    setExibeTabela(true);
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    const escola = ref.current;

    if (form.checkValidity()) {
      if (onEdit) {
        await axios
          .put(urlBase + "/escolas/", {
            codigo: escola.codigo.value,
            nome: escola.nome.value,
            descricao: escola.descricao.value,
          })
          .then(({ data }) => toast.info(data.mensagem))
          .catch(({ data }) => toast.error(data.mensagem));
      } else {
        await axios
          .post(urlBase + "/escolas/", {
            codigo: escola.codigo.value,
            nome: escola.nome.value,
            descricao: escola.descricao.value,
          })
          .then(({ data }) => toast.info(data.mensagem))
          .catch(({ data }) => toast.error(data.mensagem));
      }

      escola.codigo.value = "";
      escola.nome.value = "";
      escola.descricao.value = "";

      getEscolas();
    } else {
      setValidated(true);
    }
  };

  return (
    <div>
      <Cabecalho2 texto1={"Cadastro"} texto2={"Escola"} />
      <Container className="mt-3">
        <Form
          method="POST"
          action="#"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
          ref={ref}
        >
          <MenuFormulario acaoBtnVoltar={() => handleBackButton()} />
          <Row className="mb-3">
            <Col xs={6} sm={6} md={6} lg={6}>
              <Form.Group>
                <Form.Label>Código</Form.Label>
                <Form.Control
                  type="text"
                  name="codigo"
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  name="nome"
                  placeholder="Digite o nome do escola"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Nome do escola é obrigatório!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Descrição</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descricao"
                  placeholder="Digite uma descrição sobre o escola"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Descrição é obrigatória!
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
