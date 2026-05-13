import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import CreateMovie from "./pages/CreateMovie";
import DeleteMovie from "./pages/DeleteMovie";
import Home from "./pages/Home";
import ReadMovie from "./pages/ReadMovie";
import UpdateMovie from "./pages/UpdateMovie";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <nav className="top-nav">
          <Link to="/" className="top-nav__brand">
            Filmes
          </Link>
          <div className="top-nav__links">
            <Link to="/">Inicio</Link>
            <Link to="/filmes/novo">Criar</Link>
            <Link to="/filmes/alterar">Alterar</Link>
            <Link to="/filmes/apagar">Apagar</Link>
          </div>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/filmes/novo" element={<CreateMovie />} />
            <Route path="/filmes/alterar" element={<UpdateMovie />} />
            <Route path="/filmes/apagar" element={<DeleteMovie />} />
            <Route path="/filmes/:id" element={<ReadMovie />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
