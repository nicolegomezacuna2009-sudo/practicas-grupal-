

import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [series, setSeries] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((respuesta) => respuesta.json())
      .then((datos) => {
        setSeries(datos.slice(0, 30));
        setCargando(false);
      })
      .catch((error) => {
        console.log("Error:", error);
        setCargando(false);
      });
  }, []);

  const seriesFiltradas = series.filter((serie) =>
    serie.name.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="contenedor">
      <header>
        <h1>🎬 SERIES ONLINE</h1>
        <p>Explora tus series favoritas</p>
      </header>

      <input
        type="text"
        placeholder="Buscar una serie..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {cargando ? (
        <h2>Cargando series...</h2>
      ) : (
        <div className="series">
          {seriesFiltradas.map((serie) => (
            <div className="tarjeta" key={serie.id}>
              {serie.image && (
                <img src={serie.image.medium} alt={serie.name} />
              )}

              <h3>{serie.name}</h3>
              <p>Idioma: {serie.language || "No disponible"}</p>
              <p>Estado: {serie.status}</p>
              <p>Género: {serie.genres.join(", ")}</p>
              <p>⭐ Calificación: {serie.rating.average || "Sin calificación"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
