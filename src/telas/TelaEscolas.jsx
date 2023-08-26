import { useState, useEffect } from "react";
import FormEscola from "../formularios/FormEscola";
import TabelaCadastroEscolas from "../tabelas/TabelaEscolas";
import { urlBase } from "../utils/definicoes";
import axios from "axios";
import { toast } from "react-toastify";

export default function TelaCadastroEscolas(props) {
  const [exibeTabela, setExibeTabela] = useState(true);
  const [onEdit, setOnEdit] = useState(null);
  const [escolas, setEscolas] = useState([]);
  const [filtro, setFiltro] = useState("");

  const getEscolas = async () => {
    try {
      const res = await axios.get(urlBase + "/escolas");
      setEscolas(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getEscolas();
  }, [setEscolas]);

  return exibeTabela ? (
    <TabelaCadastroEscolas
      escolas={escolas}
      setEscolas={setEscolas}
      setOnEdit={setOnEdit}
      filtro={filtro}
      aoMudarFiltro={setFiltro}
      setExibeTabela={setExibeTabela}
    />
  ) : (
    <FormEscola
      onEdit={onEdit}
      setOnEdit={setOnEdit}
      getEscolas={getEscolas}
      setExibeTabela={setExibeTabela}
    />
  );
}
