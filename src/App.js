import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Pagina404,
  PaginaInicial,
  PaginaCadastroEscola,
  PaginaCadastroAluno,
} from "./telas/Paginas";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<PaginaInicial />} />
          
          <Route
            exact
            path="cadastro-escola"
            element={<PaginaCadastroEscola />}
          />
          *<Route
            exact
            path="cadastro-aluno"
            element={<PaginaCadastroAluno />}
          />
          <Route path="*" element={<Pagina404 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
