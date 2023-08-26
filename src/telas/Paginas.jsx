import Pagina from "../templates/Pagina";
import error from "./img/erro404.jpg";
import TelaCadastroEscolas from "./TelaEscolas";
import "./styles/Tela404.css";
import TelaCadastroAlunos from "./TelaAlunos";

// PÁGINAS

function PaginaCadastroAluno(props) {
  const obj = { texto1: "Cadastro", texto2: "Aluno" };

  return (
    <Pagina obj={obj}>
      <TelaCadastroAlunos />
    </Pagina>
  );
}

function PaginaCadastroEscola(props) {
  const obj = { texto1: "Cadastro", texto2: "Escola" };

  return (
    <Pagina obj={obj}>
      <TelaCadastroEscolas />
    </Pagina>
  );
}

function Pagina404(props) {
  return (
    <Pagina>
      <div className="tela-erro">
        <img src={error} alt="Erro 404" />
        <h1>Página Não Encontrada</h1>
        <h2>A página que você está procurando não pôde ser encontrada</h2>
      </div>
    </Pagina>
  );
}

// TELAS

function PaginaInicial(props) {
  return (
    <Pagina>
      {
        // Exibe apenas o menu
      }
    </Pagina>
  );
}

export {
  Pagina404,
  PaginaInicial,
  PaginaCadastroAluno,
  PaginaCadastroEscola,
};
