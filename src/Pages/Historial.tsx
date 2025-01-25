import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Historial } from "../Types/Historial";

export default function History() {
  const navigate = useNavigate();
  const [logHistorial] = useState<Array<Historial>>(
    JSON.parse(localStorage.getItem("viendo") || "[]")
  );

  if (logHistorial.length === 0) {
    return (
      <h1>Tu historial esta vacio o no esta viendo nada cabeza de verga</h1>
    );
  }

  return (
    <main className="p-5 flex flex-col gap-3">
      <h3 className="font-semibold text-lg">Estuviste viendo</h3>
      <ul className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 ">
        {logHistorial.map((anime, index) => (
          <li
            key={index}
            title={`Ver ahora ${anime.name} Episodio ${anime.lastEpisodios}`}
            className="p-3 bg-base-300 rounded-t-xl cursor-pointer"
            onClick={() => {
              navigate(
                `/anime/${anime.id}/${anime.name}/${anime.fullEpisodios}/play`
              );
            }}
          >
            <h3 className="font-semibold">{anime.name}</h3>
            <div className="text-[12px]">
              <p>Identifacion: {anime.id}</p>
              <h3>Ultimo episodio visto: {anime.lastEpisodios}</h3>
              <h3>Episodios totales: {anime.fullEpisodios}</h3>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
