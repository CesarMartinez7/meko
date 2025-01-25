import { useState } from "react";

interface Historial {
  name: string;
  id: number;
  capitulos: number;
}

export default function History() {
  const [logHistorial] = useState<Array<Historial>>(
    JSON.parse(localStorage.getItem("viendo") || "[]")
  );

  if (logHistorial.length === 0) {
    return (
      <h1>Tu historial esta vacio o no esta viendo nada cabeza de verga</h1>
    );
  }

  return (
    <main className="p-5">
      <h3 className="font-semibold">Estuviste viendo</h3>
      <ul className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4 ">
        {logHistorial.map((anime,index) => (
          <li key={index} className="p-4 bg-base-300">
            <h3>{anime.name}</h3>
            <h3>Capitulo: {anime.capitulos}</h3>
            <p>Identifacion: {anime.id}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
