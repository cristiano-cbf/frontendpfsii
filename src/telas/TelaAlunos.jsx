import { useState, useEffect } from "react";
import FormAluno from "../formularios/FormAluno";
import TabelaCadastroAlunos from "../tabelas/TabelaAlunos";
import { urlBase } from "../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";


export default function TelaCadastroAlunos(props) {
  const [exibeTabela, setExibeTabela] = useState(true);
  const [onEdit, setOnEdit] = useState(null);
  const [alunos, setAlunos] = useState([]);
  const [filtro, setFiltro] = useState("");
  
  const [escolas, setEscolas] = useState([]);

  const getAlunos = async () => {
    try {
      const res = await axios.get(urlBase + "/alunos");
      setAlunos(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const getEscolas = async () => {
    try {
      const res = await axios.get(urlBase + "/escolas");
      setEscolas(res.data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAlunos();
    getEscolas();
  }, [setAlunos]);

  return exibeTabela ? (
    <TabelaCadastroAlunos
    alunos={alunos}
      setAlunos={setAlunos}
      setOnEdit={setOnEdit}
      filtro={filtro}
      aoMudarFiltro={setFiltro}
      setExibeTabela={setExibeTabela}
    />
  ) : (
    <FormAluno
      escolas={escolas}
      onEdit={onEdit}
      setOnEdit={setOnEdit}
      getAlunos={getAlunos}
      setExibeTabela={setExibeTabela}
    />
  );
}