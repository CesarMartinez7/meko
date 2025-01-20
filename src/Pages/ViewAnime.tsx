import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Chapters } from "../Types/Chapter";

export default function ViewAnime() {
//   function formatToSlug(text: string) {
//     return text
//       .toLowerCase() // Convierte a minúsculas
//       .trim() // Elimina espacios en los extremos
//       .replace(/\s+/g, "-") // Reemplaza espacios por guiones
//       .replace(/[^\w\-]+/g, ""); // Elimina caracteres especiales
//   }
  const [data, setData] = useState<Array<Chapters>>([]);
  const [chapter, setChapter] = useState<number>(0);
  const { id, name } = useParams();


  useEffect(() => {
    const url = `https://api.jikan.moe/v4/anime/${id}/episodes`;
    fetch(url)
      .then((response) => response.json())
      .then((datae) => setData(datae.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="h-screen w-full grid grid-cols-1 md:grid-cols-2">
      <div className="bg-black w-full h-screen">
        <iframe
          className="w-full h-screen"
          src={`https://vidsrc.cc/v2/embed/anime/${id}/${chapter}/sub`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-12">
        <section>
          <h3 className="font-medium text-xl">{name?.toUpperCase().slice(1,name?.length)}</h3>
            <p>Episodio {chapter}</p>
        </section>
        <ul className="grid grid-cols-12 gap-2">
          {Array.from({ length: data.length }, (_, i) => (
            <li
              key={i}
              className="btn"
              onClick={() => {
                setChapter(i + 1);
              }}
            >
              {i + 1}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
